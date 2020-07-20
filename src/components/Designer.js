import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import GParamsControl from './ParamsControl/GParamsControl';
import ParamsTab from './ParamsControl/ParamsTab';


import {ToolbarContainers} from "../containers/ToolbarContainers"


import {ForLayout1,ForLayout2} from '../containers/LayoutContainers';


const drawerWidth = 240;
// const drawerWidth = 540;

const styles = theme => ({
    main: {
        display: 'flex',
        alignContent: 'flex-end'
    },
    root: {
        display: 'flex'
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        width: `calc(100% - ${drawerWidth}px)`,
        marginRight: drawerWidth,
        transition: theme
            .transitions
            .create([
                'width', 'margin'
            ], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - 2*${drawerWidth}px)`,
        transition: theme
            .transitions
            .create([
                'width', 'margin'
            ], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    menuButtonHidden: {
        display: 'none'
    },
    title: {
        flexGrow: 1
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme
            .transitions
            .create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme
            .transitions
            .create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
        width: theme.spacing.unit * 7,
        [
            theme
                .breakpoints
                .up('sm')
        ]: {
            width: theme.spacing.unit * 9
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 1,
        height: `100vh`,
        overflow: 'auto'
    },
    chartContainer: {
        marginLeft: -22
    },
    tableContainer: {

        height: 320,
        borderStyle: 'double'
    },
    h5: {
        marginBottom: theme.spacing.unit * 2
    },
    draggable: {
        height: 120,
        borderStyle: 'double'
    }
});

class Designer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            open: false
        };
        this.props.setIsDesigner(true)

    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };
    handleDrawerClose = () => {
        this.setState({open: false});
    };


    /////////////Keyboard event/////////
    deleteHandler = (event) => {
        if(event.keyCode===46&&this.props.MotifyTarget.length>0){
            this.props.deleteModifyTarget(this.props.MotifyTarget[0])
        }
    };        



    render() {
        const {classes} = this.props; // classes這個常數 == props.classes
        let dashboard_layout
        if(this.props.layout==="layout1"){
            dashboard_layout=<ForLayout1 isDesigner={true}/>
        }else if(this.props.layout==="layout2"){
            dashboard_layout=<ForLayout2  isDesigner={true}/>
        }
        return (
            <div className={classes.root} onKeyDown ={this.deleteHandler} tabIndex="0" >
                <CssBaseline/>
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, this.state.open && classes.menuButtonHidden,)}>
                            <MenuIcon/>
                        </IconButton>

                        <Typography
                            component="h6"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}>
                            Dashboard
                        </Typography>

                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                    paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
                }}
                    open={this.state.open}>
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    {/* <ComponentsItem addTable={this.addTable} addTextLabel={this.addTextLabel} addImage={this.addImage}></ComponentsItem> */}
                    <ToolbarContainers setLayout={this.props.setLayout}/>
                </Drawer>

                <main className={classes.content} id="main">
                    <div className={classes.appBarSpacer}/>
                    {dashboard_layout }



                </main>

                <Drawer
                    className={classes.drawer}
                    variant="permanent" 
                    classes={{
                    paper: classes.drawerPaper
                }}
                    anchor="right">
                    <div className={classes.toolbar}/>
                    <Divider/>

                    <List>
                        {this
                            .props
                            .MotifyTarget
                            .map((item, index) => (
                                // <ParamsTab modifyParams={this.props.modifyParams} MotifyTarget={item} deleteModifyTarget={this.props.deleteModifyTarget}></ParamsTab>

                                <GParamsControl modifyParams={this.props.modifyParams} MotifyTarget={item} deleteModifyTarget={this.props.deleteModifyTarget}></GParamsControl>
                            ))
}
                    </List>
                </Drawer>
            </div>
        );
    }
}
Designer.propTypes = {
    classes: PropTypes.object.isRequired
};



export default withStyles(styles)(Designer);