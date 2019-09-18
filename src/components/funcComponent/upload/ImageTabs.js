import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import UploadFile from './uploadFile'
import ImagePreview from './ImagePreview'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class ImageTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleClick = (filename)=>{
    console.log("on click ",filename)
  }
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" >
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="上傳圖片" />
            <Tab label="圖片瀏覽" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>


        {value === 0 && <TabContainer><UploadFile/></TabContainer>}
        {value === 1 && <TabContainer><ImagePreview handleClick={this.handleClick}></ImagePreview></TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
      </div>
    );
  }
}


export default withStyles(styles)(ImageTabs);
