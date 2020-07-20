import React from 'react';
import { withStyles,useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import GParamsControl from "./GParamsControl"
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';



function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
});



class ParamsTab extends React.Component {  
    state = {
    value: 0,
  };


   handleChangeIndex  = ( event, newValue) => {
    this.setState({ newValue });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const theme = useTheme();

    return (

        <div width="100%"> 
            <AppBar position="static" >
            <Tabs 
            value={value} 
            onChange={this.handleChange}
            variant="fullWidth"
            aria-label="full width tabs"
            >


 
            </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={this.handleChangeIndex}
            >


            </SwipeableViews>

            
        </div>
    );
  }
}

export default withStyles(styles)(ParamsTab);
