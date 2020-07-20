import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles";
import classNames from 'classnames';
import {ChromePicker } from 'react-color'
import InputAdornment from '@material-ui/core/InputAdornment';

import RadioGroup from '@material-ui/core/RadioGroup';

import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
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
    }
});

class GParamsControl extends React.Component {
    constructor() {
        super();
        this.handleColorTargetChange=this.handleColorTargetChange.bind(this)
        

    }
    state = {
        selectedIndex: 1,
        data:{},
        arrayIndex:0,
        color:"rgba(0, 0, 0,1)",//色彩選擇器上所顯示的顏色
        ColorTarget:'fontColor'
    };
    ///////////////利用helper傳值////////////// 
    componentWillReceiveProps(nextProps) {
        //切換更改顏色的目標以及設定顯示現在該目標的顏色
        if(this.state.ColorTarget==='fontColor'){
            this.setState({color:nextProps.MotifyTarget.fontColor})
            // return {color:nextProps.MotifyTarget.fontColor}
        }else{
            this.setState({color:nextProps.MotifyTarget.background})
            // return {color:nextProps.MotifyTarget.background}
        }
    } 

    //切換更改字體或是背景顏色
    handleColorTargetChange= event => {
        if(event.target.value==='fontColor'){
            this.setState({ ColorTarget: event.target.value,color:this.props.MotifyTarget.fontColor });
        }else{
            this.setState({ ColorTarget: event.target.value,color:this.props.MotifyTarget.background });
        }
      };

    render() {
        const {classes} = this.props;

        return (
            <div>
                {/* 顯示的字 */}
                <ListItem button>
                    <TextField
                        className={classNames(classes.margin, classes.textField)}
                        id="content-value"
                        label="Value"
                        value={ this.props.MotifyTarget.value}
                        onChange={this.props.handleChange('value')}
                        margin="normal"/>
                </ListItem>

                <ListItem button>
                    <TextField
                        className={classNames(classes.margin, classes.textField)}
                        id="content-value"
                        label="字體大小"
                        value={ this.props.MotifyTarget.fontSize}
                        onChange={this.props.handleChange('fontSize')}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">px</InputAdornment>,
                          }}
                        margin="normal"/>
                </ListItem>

                <ListItem button>
                    <FormControl component="fieldset">
                    <RadioGroup
                    aria-label="position"
                    name="position"
                    value={this.state.ColorTarget}
                    onChange={this.handleColorTargetChange}
                    row
                    >
                    <FormControlLabel
                        value="fontColor"
                        control={<Radio color="primary" />}
                        label="字體顏色"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="background"
                        control={<Radio color="primary" />}
                        label="背景顏色"
                        labelPlacement="top"
                    />
                    

                    </RadioGroup>
                </FormControl>
                </ListItem>

                <ListItem button>

                    <ChromePicker 
                    color={ this.state.color }
                    onChange={this.props.handleChange(this.state.ColorTarget)}
                    />
                </ListItem>

                {/* <ListItem button>
                    <ListItemText primary="背景顏色"/>

                </ListItem>

                <ListItem button>

                    <ChromePicker 
                    color={ this.props.MotifyTarget.background }
                    onChange={this.props.handleChange('background')}
                    />
                </ListItem> */}
            </div>
        );
    }
}

export default withStyles(styles)(GParamsControl);
