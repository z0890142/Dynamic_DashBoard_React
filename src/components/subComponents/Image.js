import React from 'react';
import {Rnd} from "react-rnd";
import Helper from '../../helper/helper'
import CardMedia from '@material-ui/core/CardMedia';
import {withStyles} from '@material-ui/core/styles';
 
var cloneDeep = require('lodash.clonedeep');
const rndStyle={
    
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(f, f, f,1)",
    zIndex:"0",
    borderColor:"", 
    borderStyle:"",
    borderWidth:"thin"
    
}
const styles = theme => ({
    card: {
      maxWidth: 400,
    },
    media: { 
        position:"absolute",
        top:"0",
        left:"0",
    }

  });

class Image extends React.Component {
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
        const { classes } = this.props;
        if(this.props.isDesigner){ //根據design和deploy顯示有所不同
            rndStyle.borderColor="#CEABAB"
            rndStyle.borderStyle="dotted"
        }
        return (
            <Rnd
                style={rndStyle}
                position={{ x: this.props.div_size.width*this.props.data.x, y: this.props.div_size.height*this.props.data.y }}
                disableDragging={!this.props.isDesigner}
                enableResizing={ {top:this.props.isDesigner, right:this.props.isDesigner, bottom:this.props.isDesigner, 
                    left:this.props.isDesigner, topRight:this.props.isDesigner, bottomRight:this.props.isDesigner
                    , bottomLeft:this.props.isDesigner, topLeft:this.props.isDesigner} }
                    
                size={{ width: this.state.width,  height: this.state.height }}
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
                <div>
                    <img src={this.props.data.imageUrl==="No_image_available.png"?require('../../static/icons/'+this.props.data.imageUrl):require('../../static/'+this.props.data.imageUrl)} className = {classes.media} style={{height: this.state.height,width:this.state.width}}></img>


                    <CardMedia 
                        className = {classes.media}
                        style={{height: this.state.height,width:this.state.width}}
                        image={require('../../static/icons/0b46f21fbe096b63d30f4b590d338744ebf8aca0.jpg')}
                    />

                </div>

            </Rnd>
        );
    }
}


export default withStyles(styles)(Image);
