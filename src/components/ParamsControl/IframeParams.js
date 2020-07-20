import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles";
import classNames from 'classnames';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';

import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import PageListForIframe from '../funcComponent/PageListForIframe'



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

var selectRow

var sub_params


class IframeParams extends React.Component {
    constructor() {
        super();
    }
    state = {
        isLinkPage: "link_page",//目前顯示的連結模式
    };
    componentDidMount() {
        if( this.props.MotifyTarget==="customer_url"){
            sub_params=<TextField
            id="content-value"
            label="自訂連結"
            value={ this.props.MotifyTarget.embeddedUrl}
            onChange={this.props.handleChange('embeddedUrl')}
            margin="normal"/>
        }else{
            sub_params=<PageListForIframe handleChange={this.props.handleChange} key={"PageListForIframe"}/>

        }
    }

    //切換ifrmae連結模式
    handleEmbeddedTypeChange= event => {
        console.log("handleEmbeddedTypeChange")
        //變更component的embeddType屬性，並且根據所對應的type顯示不同的模組
        this.props.handleChange("embeddType")(event)
        console.log(this.props.MotifyTarget)
        if(event.target.value==="customer_url"){
            sub_params=<TextField
                        id="content-value"
                        label="自訂連結"
                        value={ this.props.MotifyTarget.embeddedUrl}
                        onChange={this.props.handleChange('embeddedUrl')}
                        margin="normal"/>
        }else{
            sub_params=<PageListForIframe handleChange={this.props.handleChange} key={"PageListForIframe"}/>
        }
        this.setState({ isLinkPage: event.target.value});

      };
      
    render() {
        const {classes} = this.props;

        return (
            <div>
                {/* 顯示的字 */}
                
                <ListItem>
                    <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item>卷軸</Grid>
                            <Grid item>
                                <Switch
                                    onChange={this.props.handleChange('isScrolling')}
                                    value={ this.props.MotifyTarget.isScrolling}
                                    color="primary"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />    
                            </Grid>
                    </Grid>    
                </ListItem>

                <ListItem>
                    <ListItemText primary="超連結" />
                </ListItem>

                <ListItem button>
                    <FormControl component="fieldset">
                    <RadioGroup
                    aria-label="position"
                    name="position"
                    value={this.state.isLinkPage}
                    onChange={this.handleEmbeddedTypeChange}
                    row
                    >
                    <FormControlLabel
                        key={"link_page_Radio"}
                        value="link_page"
                        control={<Radio color="primary" />}
                        label="連結頁面"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        key={"customer_url_Radio"}
                        value="customer_url"
                        control={<Radio color="primary" />}
                        label="自訂連結"
                        labelPlacement="top"
                    />
                
                    </RadioGroup>
                    </FormControl>
                </ListItem>
                <ListItem>
                    {sub_params}
                </ListItem>
            </div>
        );
    }
}

export default withStyles(styles)(IframeParams);
