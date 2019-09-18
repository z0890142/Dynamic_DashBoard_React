import React from 'react';
import {Rnd} from "react-rnd";
import Helper from '../../helper/helper'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

const position = [25.085, 121.55];

var cloneDeep = require('lodash.clonedeep');
const rndStyle={
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(152, 140, 140,0.31)",
    zIndex:"0",
    borderColor:"", 
    borderStyle:"",
    borderWidth:"thin"
}

function design(){
    return(
    <div >
        <h1 style={{ color: "rgb(103, 95, 95)"}}>G I S</h1>
    </div>
    )
}

function deploy(){
    return (                
    <Map center={position} zoom={13} style={{ height: "100%", width:"100%"}}>
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
            <Popup>
                <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
            </Popup>
        </Marker>
    </Map>
)
}
class Gis extends React.Component {

    constructor(props) {
        super(props);
        this.state = Helper.setComponentSize(this.props.data.width,this.props.data.height,
            this.props.div_size.width,this.props.div_size.height)
            
        rndStyle.zIndex=this.props.data.zIndex

    }



    componentWillReceiveProps(nextProps) {
        
        this.setState(Helper.setComponentSize(nextProps.data.width,nextProps.data.height,
            nextProps.div_size.width,nextProps.div_size.height))
        rndStyle.zIndex=nextProps.data.zIndex

    } 
    
    render() {
        var gitTemplate
        if(this.props.isDesigner){ //根據design和deploy顯示有所不同
            gitTemplate=design()
            rndStyle.borderColor="#CEABAB"
            rndStyle.borderStyle="dotted"
        }else{
            gitTemplate=deploy()
        }
        return (
            <Rnd
                style={rndStyle}
                size={{ width: this.state.width,  height: this.state.height }}
                position={{ x: this.props.div_size.width*this.props.data.x, y: this.props.div_size.height*this.props.data.y }}
                disableDragging={!this.props.isDesigner}
                enableResizing={ {top:this.props.isDesigner, right:this.props.isDesigner, bottom:this.props.isDesigner, 
                    left:this.props.isDesigner, topRight:this.props.isDesigner, bottomRight:this.props.isDesigner
                    , bottomLeft:this.props.isDesigner, topLeft:this.props.isDesigner} }
                onDragStop={(e, d) => {
                    this.props.setModifyTarget(this.props.data)
                    this.props.getDivName(this.props.data,e.srcElement.id)
                    var data=Helper.PositionPercentageToNum(this.props.data,d,this.props.div_size.width,this.props.div_size.height)
                    this.props.modifyParams(data)
                }}
                onResize={(e, direction, ref, delta, position) => {
                    var data=Helper.percentageToNum(cloneDeep(this.props.data),ref.style.width,ref.style.height
                    ,this.props.div_size.width,this.props.div_size.height)
                    this.props.modifyParams(data)
                }}
                bounds="parent">
                {gitTemplate}
            </Rnd>

                      

        );
    }
}


export default Gis;
