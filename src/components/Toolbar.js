import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate';
import Collections from '@material-ui/icons/Collections';
import Save from '@material-ui/icons/Save';
import OpenInNew from '@material-ui/icons/OpenInNew';
import Map from '@material-ui/icons/Map';
import Dashboard from '@material-ui/icons/Dashboard';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import FontDownload from '@material-ui/icons/FontDownload';
import Divider from '@material-ui/core/Divider';
import ImageTabs from './funcComponent/upload/ImageTabs';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import {withStyles} from '@material-ui/core/styles';
import {ForLoadDialog} from "../containers/ToolbarContainers"

import LayoutPreview from '../layout/layoutPerview'

const axios = require('axios');

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2
    }
}))(MuiDialogContent);

class Toolbar extends React.Component {
    state = {
        selectedIndex: 1,
        Imageopen: false,
        Saveopen: false,
        Loadopen: false,
        SelectLayout:false,
        SavePageName: "",
        SavePageDescribe: "",
        SelectPage: null

    };
    handleSelectPage = (id) => {
        this.setState({SelectPage: id})
    }
    handleImageOpen = () => {
        this.setState({Imageopen: true});
    };

    handleImageClose = () => {
        this.setState({Imageopen: false});
    };
    handleLoadOpen = () => {
        this.setState({Loadopen: true});
    };

    handleLoadClose = () => {
        this.setState({Loadopen: false});
    };

    handleSelectLayoutClose=()=>{
        this.setState({SelectLayout: false});
    }

    handleSelectLayoutOpen=()=>{
        this.setState({SelectLayout: true});
    }
    handleSaveOpen = () => {
        this.setState({Saveopen: true});
    };
    handleSaveClose = () => {
        this.setState({Saveopen: false});
    };
    handleSaveChange = name => event => {
        this.setState({[name]: event.target.value})
    };

    CreateTable = (event, topic) => {
        this
            .props
            .addTable("test")
    };

    CreateTextLable = () => {
        var lable = {
            componentId: "TextLable_" + (this.props.TextLable).length + 1,
            item_name: "",
            value: "value",
            fontColor: "rgba(0, 0, 0,1)",
            background: "rgba(f, f, f,1)",
            height: "50",
            width: "50",
            divName: "div1",
            type: "textLables",
            fontSize: "20",
            x: 0,
            y: 0,
            zIndex: 0

        }
        return lable
    };

    CreateImage = () => {
        var image = {
            componentId: "Image_" + (this.props.Image).length + 1,
            item_name: "",
            value: "value",
            color: "#000000",
            height: "50",
            width: "50",
            divName: "div1",
            type: "images",
            imageUrl: "No_image_available.png",
            x: 0,
            y: 0,
            zIndex: 0
        }
        return image

    };
    CreateGis = () => {
        var gis = {
            componentId: "Gis_" + (this.props.Gis).length + 1,
            item_name: "",
            height: "50",
            value: "",
            width: "50",
            divName: "div1",
            type: "gis",
            x: 0,
            y: 0,
            zIndex: 0
        }
        return gis

    };
    SavePage(params) {
        var saveData = {
            name: this.state.SavePageName,
            describe: this.state.SavePageDescribe,
            layout: this.props.State.layout,
            payload: JSON.stringify(params)
        }
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8088/v1/savePage',
            data: saveData,
            config: {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }).then((response) => { //不用箭頭的話會讀不到this.state     //handle success
            this.setState({Saveopen: false});
        })
            .catch(function (response) { //handle error
            });

    }
    loadPage = () => {
        this
            .props
            .resetState()
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8088/v1/loadPage/' + this.state.SelectPage
        }).then((response) => { //不用箭頭的話會讀不到this.state     //handle success
            this
                .props
                .loadPage(response.data.ResultMessage.PageData)

        })
            .catch(function (response) { //handle error
            });
    }
    render() {

        return (
            <div>
                <ListItem
                    button
                    onClick={() => {
                    this
                        .props
                        .addTextLabel(this.CreateTextLable())
                }}>
                    <ListItemIcon>
                        <FontDownload/>
                    </ListItemIcon>
                    <ListItemText primary="新增文字"/>
                </ListItem>

                <ListItem
                    button
                    onClick={() => {
                    this
                        .props
                        .addImage(this.CreateImage())
                }}>
                    <ListItemIcon>
                        <AddPhotoAlternate/>
                    </ListItemIcon>
                    <ListItemText primary="新增圖片"/>
                </ListItem>

                <ListItem
                    button
                    onClick={() => {
                    this
                        .props
                        .addGis(this.CreateGis())
                }}>
                    <ListItemIcon>
                        <Map/>
                    </ListItemIcon>
                    <ListItemText primary="新增地圖"/>
                </ListItem>
                <ListItem
                    button
                    onClick={() => {
                    this.handleSelectLayoutOpen()
                }}>
                    <ListItemIcon>
                        <Dashboard/>
                    </ListItemIcon>
                    <ListItemText primary="版面切換"/>
                </ListItem>
                <ListItem
                    button
                    onClick={() => {
                    this.handleSaveOpen()
                }}>
                    <ListItemIcon>
                        <Save/>
                    </ListItemIcon>
                    <ListItemText primary="儲存頁面"/>
                </ListItem>
                <ListItem
                    button
                    onClick={() => {
                    this.handleLoadOpen()
                }}>
                    <ListItemIcon>
                        <OpenInNew/>
                    </ListItemIcon>
                    <ListItemText primary="開啟頁面"/>
                </ListItem>

                <Divider/>

                <ListItem button onClick={this.handleImageOpen}>
                    <ListItemIcon>
                        <Collections/>
                    </ListItemIcon>
                    <ListItemText primary="圖片管理"/>
                </ListItem>

                {/* 圖片管理的Dialog */}
                <Dialog
                    fullWidth={true}
                    maxWidth="lg"
                    onClose={this.handleImageClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.Imageopen}>

                    <DialogContent>
                        <ImageTabs/>
                    </DialogContent>
                </Dialog>

                {/* 版面選擇的Dialog */}
                <Dialog
                    fullWidth={true}
                    maxWidth="lg"
                    minHeight="700"
                    onClose={this.handleSelectLayoutClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.SelectLayout}>
                    <DialogContent>
                        <LayoutPreview handleClick={this.props.setLayout}/>                   

                    </DialogContent>
                    <DialogActions>

                        <Button variant="contained" color="primary" onClick={this.handleSelectLayoutClose}>
                            確定
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* 頁面載入的Dialog */}
                <Dialog
                    fullWidth={true}
                    maxWidth="lg"
                    minHeight="700"
                    onClose={this.handleLoadClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.Loadopen}>
                    <DialogContent>
                        <ForLoadDialog handleSelectPage={this.handleSelectPage}/>
                    </DialogContent>
                    <DialogActions>

                        <Button variant="contained" color="primary" onClick={this.loadPage}>
                            確定
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* 頁面儲存的Dialog */}
                <Dialog
                    open={this.state.Saveopen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Save Page</DialogTitle>
                    <DialogContent>
                        <TextField
                            onChange={this.handleSaveChange('SavePageName')}
                            margin="dense"
                            id="name"
                            label="Page Name"
                            value={this.state.SavePageName}
                            fullWidth/>
                        <TextField
                            onChange={this.handleSaveChange('SavePageDescribe')}
                            margin="dense"
                            id="name"
                            label="Page Describe"
                            value={this.state.SavePageDescribe}
                            fullWidth/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSaveClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.SavePage(this.props.State)} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Toolbar;
