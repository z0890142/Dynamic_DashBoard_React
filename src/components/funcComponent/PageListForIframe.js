/* eslint-disable no-console */

import React from "react";
import {withStyles} from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import motifyTarget from './../../reducers/motifyTarget';
const axios = require('axios');

var selectRow

const styles = theme => ({

    formControl: {
      minWidth: 200,
    },
  });


class PageListForIframe extends React.PureComponent {
    constructor() {
        super()
        this.state = { 
            rows: [],
            selectedValue:""
        }
      }

    componentWillMount() {
        axios({method: 'get', url: 'http://127.0.0.1:8088/v1/listPage'}).then((response) => { //不用箭頭的話會讀不到this.state     //handle success
            var tmpRows = []
            tmpRows.push(...response.data.ResultMessage)
            this.setState({rows: tmpRows})
        })
        .catch(function (response) { //handle error
            console.log(response);
        });
    }

    handleClick=(event) =>{//////////處理選擇哪個頁面
        this.setState({selectedValue:event.target.value})
        this.props.handleChange("linkPageId")(event)    
}

    render() {
        const {classes} = this.props;

        return (
            
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="pageList-select">連結頁面</InputLabel>
                    <Select
                        width="100%"
                        value={this.state.selectedValue}
                        onChange={this.handleClick}
                        // renderValue={value => this.props.motifyTarget.linkPageId}
                        inputProps={{
                            name: 'selectRow',
                            id: 'pageList-select',
                        }}
                        >

                        {this.state.rows.map((page,index)=>
                            <MenuItem key={"Item"+index} value={page.id}>{page.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </div>
            
        );
    }
}



export default withStyles(styles)(PageListForIframe);
