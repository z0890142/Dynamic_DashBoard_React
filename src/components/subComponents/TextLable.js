import React from 'react';
import {Rnd} from "react-rnd";
import Typography from '@material-ui/core/Typography';
import Helper from '../../helper/helper'
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
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
});
const onKeyDown = e => {
    if (e.keyCode === 8) {
      // do stuff
      alert("you have pressed backspace");
    }
  };
 class TextLable extends React.Component {
    constructor(props) {
        super(props);
        var newState=Helper.setComponentSize(this.props.data.width,this.props.data.height,
            this.props.div_size.width,this.props.div_size.height)

        this.state = {
            width:newState.width,
            height:newState.height,
            fontSize:this.props.data.fontSize+"px",
            fontColor:this.props.data.fontColor,
            background:"rgba(f, f, f,1)"
        };

        rndStyle.background=this.props.data.background
        rndStyle.zIndex=this.props.data.zIndex

    }
    componentWillReceiveProps(nextProps) {
        var newState=Helper.setComponentSize(nextProps.data.width,nextProps.data.height,
            nextProps.div_size.width,nextProps.div_size.height)
        newState.fontSize=nextProps.data.fontSize+"px"
        newState.fontColor= nextProps.data.fontColor
        this.setState(newState)

        rndStyle.background=nextProps.data.background
        rndStyle.zIndex=nextProps.data.zIndex
        } 
    
    render() {
        if(this.props.isDesigner){ //根據design和deploy顯示有所不同
            rndStyle.borderColor="#CEABAB"
            rndStyle.borderStyle="dotted"
        }
        return (
            <Rnd
                style={rndStyle}
                position={{ x: this.props.div_size.width*this.props.data.x, y: this.props.div_size.height*this.props.data.y}}

                disableDragging={!this.props.isDesigner}
                enableResizing={ {top:this.props.isDesigner, right:this.props.isDesigner, bottom:this.props.isDesigner, 
                    left:this.props.isDesigner, topRight:this.props.isDesigner, bottomRight:this.props.isDesigner
                    , bottomLeft:this.props.isDesigner, topLeft:this.props.isDesigner} }
                size={{ width: this.state.width,  height: this.state.height }}

                onDragStop={(e, d) => {
                    this.props.setModifyTarget(cloneDeep(this.props.data)) //為了讓系統了解要修改的是哪個元件
                    this.props.getDivName(this.props.data,e.srcElement.id)
                    var data=Helper.PositionPercentageToNum(this.props.data,d,this.props.div_size.width,this.props.div_size.height)//取得拖拉後的位置
                    this.props.modifyParams(data)//紀錄拖拉後的元件位置

                }}

                onResize={(e, direction, ref, delta, position) => {
                    var data=Helper.percentageToNum(cloneDeep(this.props.data),ref.style.width,ref.style.height
                    ,this.props.div_size.width,this.props.div_size.height)//取得拖拉後的長寬
                    this.props.modifyParams(data)//使得元件可以透過拖拉的方式修改元件大小
                }}

                bounds="parent">
                <Typography component="h6" variant="h6" noWrap style={{fontSize:this.state.fontSize,color:this.state.fontColor}}>
                    {this.props.data.value}
                </Typography>
            </Rnd>
        );
    }
}
export default withStyles(styles)(TextLable);
