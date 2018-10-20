import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCats } from '../redux/reducers/catfeed'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Waypoint from 'react-waypoint'
import debounce from 'lodash/debounce'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    height: '100%'
  },
  gridList: {
    width: '90%',
    height: '100%'
  },
  gridListTile: {
    backgroundColor: theme.palette.background.paper
  },
  progress: {
    margin: 10
  },
  styledSpan: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingLeft: '25%'
  }
})

export class CatFeed extends Component {
  constructor(props) {
    super(props)
    this.loadMoreItems = this.loadMoreItems.bind(this)
    this.debounceLoadMoreItmes = debounce(e => {
      this.loadMoreItems()
    }, 250)
  }

  loadMoreItems() {
    const { fetchCats, cats, feedConfig } = this.props
    if (cats.length >= 200) {
      return
    }
    fetchCats(feedConfig)
  }

  render() {
    const { cats, isLoading, classes } = this.props
    return (
      <div className={classes.root}>
        <GridList cellHeight="auto" className={classes.gridList}>
          {cats.map((cat, idx) => (
            <GridListTile key={idx} className={classes.gridListTile}>
              <img src={cat.url} alt="Loading Cat" />
            </GridListTile>
          ))}
          {!isLoading && (
            <div style={{ width: '100%' }}>
              <Waypoint onEnter={this.debounceLoadMoreItmes} />
              {cats.length >= 200 && (
                <span className={classes.styledSpan}>
                  You reached the end, now get back to work!
                </span>
              )}
            </div>
          )}
          {isLoading && (
            <div>
              <CircularProgress className={classes.progress} />
              <span>Loading more cats for you</span>
            </div>
          )}
        </GridList>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { cats, feedConfig, isLoading } = state.catfeed
  return {
    cats,
    feedConfig,
    isLoading
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCats
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CatFeed))
