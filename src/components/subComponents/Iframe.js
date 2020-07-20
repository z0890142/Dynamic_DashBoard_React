import React from 'react';
import {Rnd} from "react-rnd";
import Helper from '../../helper/helper'
import Iframe from 'react-iframe'

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
        <h1 style={{ color: "rgb(103, 95, 95)"}}>Iframe</h1>
    </div>
    )
}

function deploy(data){
    console.log(data)
    let url
    if(data.embeddType==="link_page"){
        url="http://127.0.0.1:3000/deploy/"+data.linkPageId
    }else{
        url=data.embeddedUrl
    }
    console.log("iframe",data)
    return (                
        <Iframe url={url}
        width="100%"
        height="100%"
        key={data.componentId}
        className="myClassname"
        display="initial"
        position="relative"
        scrolling={data.isScrolling}
        />
)
}
class IframeComponent extends React.Component {

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
        var iframeTemplate
        if(this.props.isDesigner){ //根據design和deploy顯示有所不同
            iframeTemplate=design()
            rndStyle.borderColor="#CEABAB"
            rndStyle.borderStyle="dotted"
        }else{
            iframeTemplate=deploy(this.props.data)
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
                {iframeTemplate}
            </Rnd>

                      

        );
    }
}


export default IframeComponent;
