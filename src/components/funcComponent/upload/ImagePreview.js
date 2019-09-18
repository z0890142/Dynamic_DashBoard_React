import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ImageItem from './ImageItem'

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


class ImagePreview extends React.Component {

  constructor() {
    super()
    this.state = {
      value: 0,
      images:[]
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
    this.setState({value:123})
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
  render() {
    return (
      <div>
        {this.state
          .images
          .map((item, index) => (    
            <ImageItem key={"ImageItem_"+index} item={item} handleClick={this.props.handleClick}></ImageItem>
          ))
        }
      </div>


    );
  }
}




export default withStyles(styles)(ImagePreview);
