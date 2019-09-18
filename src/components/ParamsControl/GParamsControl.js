import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles";
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import ImageParams from "./ImageParams"
import TextLableParam from "./TextLableParam"

import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    margin: {
        margin: theme.spacing.unit
    },
    textField: {
        flexBasis: 200
    },
    textFieldSmall: {
        flexBasis: 100
    }
});

class GParamsControl extends React.Component {

    state = {
        selectedIndex: 1,
        data:{},
        arrayIndex:0
    };
    ///////////////利用helper傳值////////////// 
    componentDidMount() {
    }


    ////////////TextField value變動處理///////////////
    handleZindexChange = (action ) => {
    if(action==="add"){
        this.props.MotifyTarget.zIndex+=1
    }else{
        this.props.MotifyTarget.zIndex-=1
    }
    
    this.props.modifyParams(this.props.MotifyTarget)
    };

    ////////////TextField value變動處理///////////////
    handleChange = (colume_name )=> event => {
        var data=this.props.MotifyTarget
        if(colume_name==="fontColor"||colume_name==="background"){
            // data[colume_name]=event.hex
            data[colume_name]="rgba("+event.rgb.r+","+event.rgb.g+","+event.rgb.b+","+event.rgb.a+")"
        }else{
            data[colume_name]=event.target.value
        }

        this.props.modifyParams(data)
    };

    ////////////Image value變動處理///////////////
    handleImageChange = (colume_name ) => {
        var data=this.props.MotifyTarget
    
        data["imageUrl"]=colume_name
    
        this.props.modifyParams(data)
    };

    render() {
        const {classes} = this.props;
        const {type} = this.props.MotifyTarget
        let sub_params
        if (this.props.MotifyTarget.type==="images") {
            sub_params=<ImageParams handleImageChange={this.handleImageChange}></ImageParams>
        }else if(this.props.MotifyTarget.type==="textLables"){
            sub_params=<TextLableParam handleChange={this.handleChange} MotifyTarget={this.props.MotifyTarget}></TextLableParam>

        }
        return (
            <div>
                <ListItem button>
                    <TextField
                        className={classNames(classes.margin, classes.textField)}
                        id="content-value"
                        label="元件名稱"
                        value={ this.props.MotifyTarget.item_name}
                        onChange={this.handleChange('item_name')}
                        margin="normal"/>
                </ListItem>
                <ListItem button>
                    <TextField
                        className={classNames(classes.margin, classes.textField)}
                        id="height-value"
                        label="Height"
                        value={ this.props.MotifyTarget.height}
                        onChange={this.handleChange('height')}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                          }}
                        margin="normal"/>
                    <TextField
                        className={classNames(classes.margin, classes.textField)}
                        id="width-value"
                        label="width"
                        value={ this.props.MotifyTarget.width}
                        onChange={this.handleChange('width')}
                        margin="normal"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                          }}
                        />
                </ListItem>


                <ListItem >
                    <TextField
                        className={classNames(classes.margin, classes.textFieldSmall)}
                        id="content-value"
                        label="元件圖層高度"
                        value={ this.props.MotifyTarget.zIndex}
                        onChange={this.handleChange('zIndex')}
                        margin="normal"/>
                    <IconButton color="primary" className={classes.button} onClick={()=>this.handleZindexChange("add")} component="span">
                        <Add />
                    </IconButton>
                    <IconButton color="primary" className={classes.button}onClick={()=>this.handleZindexChange("sub")} component="span">
                        <Remove />
                    </IconButton>
                </ListItem>

                
                {sub_params}


            </div>
        );
    }
}

export default withStyles(styles)(GParamsControl);
