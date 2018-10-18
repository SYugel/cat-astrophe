import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar'
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const styles = {
  root: {
    flexGrow: 1,
  }
}

class HeaderBar extends Component {
  render() {
    const {classes} = this.props
    return(
      <div className={classes.root}>
        <AppBar position="absolute" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Cat-astrophe
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(HeaderBar)