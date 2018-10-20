import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ViewList from '@material-ui/icons/ViewList'
import Settings from '@material-ui/icons/Settings'
import ExitToApp from '@material-ui/icons/ExitToApp'
import { withRouter } from 'react-router-dom'

const drawerWidth = 240

const styles = theme => ({
  drawerPaper: {
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    height: '100%'
  }
})

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(navPath) {
    const { history } = this.props
    history.push(navPath)
  }

  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          open={true}>
          <List>
            <ListItem
              button
              onClick={() => {
                this.handleClick('/feed')
              }}>
              <ListItemIcon>
                <ViewList />
              </ListItemIcon>
              <ListItemText primary="Cat-Feed" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                this.handleClick('/config')
              }}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Feed Settings" />
            </ListItem>
            <ListItem button onClick={this.props.onLogout}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
      </Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(SideBar))
