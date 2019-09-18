import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import ImagePreview from '../funcComponent/upload/ImagePreview'

const styles = theme => ({
    root: {
      position: "relative",
      float: "left",
      width:"95px",
      height:"135px",
      backgroundSize:"100%",
      fontSize:"14px",
      color:"#605D5D"
    },
    filename:{
      position: "relative",
      float: "left",
      width:"100%",
      height:"15%",
      textAlign:"center",
      color:"#666363"
    },
    image:{
      position: "relative",
      float: "left",
      verticalAlign: "middle",
      height: "70%",
      width: "100%",
      backgroundColor:"#59a8ee"

    },
    filesize:{
      position: "relative",
      float: "left",
      bottom: "0px",
      height: "12%",
      width: "100%",
      fontSize: "10px",
      textAlign: "center"
    },
    val:{

    }
  });


  const DialogContent = withStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing.unit * 2,
    },
  }))(MuiDialogContent);

class ImageParams extends React.Component {
  handleHover = () => {
    this.setState({borderRadius:"5px"})
  }
  handleLeave = () => {
    this.setState({borderRadius:"0px"})
  }

  handleClick = () => {
    console.log("mouse click");
    this.setState({Imageopen:true}) 
  }
  handleImageClose = () => {
    this.setState({Imageopen: false});
};

testClick = (tt) => {
  console.log(tt);
}
    state = {
        filePath:require("../../static/icons/noimagefound.png") ,
        borderRadius:"0px",
        Imageopen:false
    };
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <ListItem button>
                  <ListItemText primary="圖片預覽"/>
                </ListItem>
                <ListItem>
                <div className={classes.root} key={"ImageSelect"} onClick={this.handleClick} onMouseOver={this.handleHover} onMouseOut={this.handleLeave} style={{borderRadius:this.state.borderRadius}}>

                  <input type="image" className={classes.image} src={this.state.filePath} style={{borderRadius:this.state.borderRadius}} alt={""}></input>


                </div>
                </ListItem>
                <Dialog
                    fullWidth={true}
                    maxWidth="lg"
                    onClose={this.handleImageClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.Imageopen}>
                    <DialogContent>

                    <ImagePreview handleClick={this.props.handleImageChange}></ImagePreview>
                        
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(ImageParams);
