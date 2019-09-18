import React from 'react';
import { withStyles } from '@material-ui/core/styles';
const axios = require('axios');


const styles = theme => ({
  root: {
    position: "relative",
    float: "left",
    width:"95px",
    height:"135px",
    backgroundRepeat:"no-repeat",
    backgroundSize:"100%",
    fontSize:"10px",
    margin:"10px",
    padding:"10px",
    borderStyle: 'dashed',
    border:"1px",
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
    color:"#605D5D"

  },
  filesize:{
    position: "relative",
    float: "left",
    bottom: "0px",
    height: "12%",
    width: "100%",
    fontSize: "10px",
    textAlign: "center"
  }
});


class ImageItem extends React.Component {

  constructor() {
    super()
    this.state = {
      value: 0,
      images:[],
      borderRadius:"0px"
    }
}
  componentWillMount() {

    axios({
      method: 'get',
      url: 'http://127.0.0.1:8088/v1/imagesList',
      config: {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }
  })
  .then((response) => {  //不用箭頭的話會讀不到this.state     //handle success     
    this.setState({images:response.data.ResultMessage})
  }) 
  .catch(function (response) {     //handle error     
    console.log(response); 
  }); 

  }

  handleHover = () => {
    this.setState({borderRadius:"5px"})
  }
  handleLeave = () => {
    this.setState({borderRadius:"0px"})
  }
  test(){
     this.props.handleClick(this.props.item.FileName)
  }
  render() {
    const { classes } = this.props;
    return (

          <div className={classes.root}  onClick={()=>this.props.handleClick(this.props.item.FileName)} onMouseOver={this.handleHover} onMouseOut={this.handleLeave} style={{borderRadius:this.state.borderRadius}}>
            <img className={classes.image}  src={require('../../../static/'+this.props.item.FileName)} alt={require('../../../static/'+this.props.item.FileName)}></img>
            <span className={classes.filename}>{this.props.item.FileName}</span>
            <span className={classes.filesize}>{this.props.item.FileSize}</span>
          </div>


    );
  }
}




export default withStyles(styles)(ImageItem);
