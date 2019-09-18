import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Image from '@material-ui/icons/Image';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 1000,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});



class ImagesList extends React.Component {
  state = {
    dense: false,
    secondary: false,
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
            <div className={classes.demo}>
              <List dense={true}>
                  <ListItem>
                    <ListItemIcon>
                      <Image />
                    </ListItemIcon>
                    <ListItemText
                      primary={this.props.filename}
                      secondary={this.props.filesize}
                    />
                  </ListItem>
              </List>
            </div>

      </div>
    );
  }
}

ImagesList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImagesList);