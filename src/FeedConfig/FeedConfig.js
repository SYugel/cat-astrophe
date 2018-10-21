import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setConfig } from '../redux/reducers/catfeed'

const styles = theme => ({
  layout: {
    width: '50%',
    display: 'block', // Fix IE 11 issue.
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  paper: {
    marginTop: 50,
    marginBottom: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit
  },
  buttonGroup: {
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center'
  },
  radioGroup: {
    margin: `${theme.spacing.unit}px 0`
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  radioContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

export class FeedConfig extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageSize: props.feedConfig.imageSize,
      imageType: props.feedConfig.imageType || 'gif'
    }

    this.handleCancel = this.handleCancel.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleCancel() {
    const { history } = this.props
    history.push('/feed')
  }

  handleSubmit(event) {
    const { setConfig, history } = this.props
    const { imageSize, imageType } = this.state
    event.preventDefault()
    setConfig({ imageSize: imageSize, imageType: imageType })
    history.push('./feed')
  }

  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Configure Feed
            </Typography>
            <form onSubmit={this.handleSubmit} className={classes.form}>
              <div className={classes.radioContainer}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Image Size</FormLabel>
                  <RadioGroup
                    aria-label="Image Size"
                    name="imageSize"
                    value={this.state.imageSize}
                    className={classes.radioGroup}
                    onChange={this.handleChange}>
                    <FormControlLabel
                      value="small"
                      control={<Radio color="default" />}
                      label="Small"
                    />
                    <FormControlLabel
                      value="med"
                      control={<Radio color="default" />}
                      label="Medium"
                    />
                    <FormControlLabel
                      value="full"
                      control={<Radio color="default" />}
                      label="Large"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Image Type</FormLabel>
                  <RadioGroup
                    aria-label="Image Type"
                    name="imageType"
                    value={this.state.imageType}
                    className={classes.radioGroup}
                    onChange={this.handleChange}>
                    <FormControlLabel value="gif" control={<Radio color="default" />} label="Gif" />
                    <FormControlLabel
                      value="jpg,png"
                      control={<Radio color="default" />}
                      label="Static Image"
                    />
                    <FormControlLabel
                      value="jpg,png,gif"
                      control={<Radio color="default" />}
                      label="Both"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className={classes.buttonGroup}>
                <Button
                  onClick={this.handleCancel}
                  type="button"
                  variant="contained"
                  color="default">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}>
                  Save
                </Button>
              </div>
            </form>
          </Paper>
        </main>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { feedConfig } = state.catfeed
  return {
    feedConfig
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setConfig
    },
    dispatch
  )

// export default withRouter(withStyles(styles)(FeedConfig))
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(FeedConfig))
)
