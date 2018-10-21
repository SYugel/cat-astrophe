import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import RemoveRedEye from '@material-ui/icons/RemoveRedEye'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter, Redirect } from 'react-router-dom'
import { login, LOGIN_SUCCESS } from '../redux/reducers/auth'
import { isAuthenticated } from '../Routes'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'grey'
  },
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 25
  },
  login: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: 550,
    height: 400,
    backgroundColor: 'lightgrey',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
})

export class Login extends Component {
  constructor(props) {
    super(props)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.state = {
      email: '',
      emailError: null,
      password: '',
      passwordError: null,
      maskPassword: true
    }
    this.handleClick = this.handleClick.bind(this)
    this.isInputsValid = this.isInputsValid.bind(this)
    this.toggleShowPassword = this.toggleShowPassword.bind(this)
  }

  toggleShowPassword() {
    const { maskPassword } = this.state
    this.setState({ maskPassword: !maskPassword })
  }

  handleChangeEmail(event) {
    const { password } = this.state
    const {
      target: { value }
    } = event
    this.setState({ email: event.target.value })
    this.isInputsValid(value, 'valid')
  }

  handleChangePassword(event) {
    const { email } = this.state
    const {
      target: { value }
    } = event
    this.setState({ password: event.target.value })
    this.isInputsValid('valid', value)
  }

  handleClick() {
    const { login, history } = this.props
    const { email, password } = this.state
    if (!this.isInputsValid(email, password)) {
      return
    }

    login({ email: this.state.email, password: this.state.password }).then(({ type, payload }) => {
      if (type !== LOGIN_SUCCESS) {
        window.alert('Please enter a valid email/password combination.')
      } else {
        history.push('/feed')
      }
    })
  }

  isInputsValid(email, password) {
    if (email.trim() === '') {
      this.setState({ emailError: 'You must enter an email address' })
    }
    if (password.trim() === '') {
      this.setState({ passwordError: 'You must enter a password' })
    }

    return email.trim() !== '' || password.trim() !== ''
  }

  render() {
    const { classes } = this.props
    const { emailError, passwordError, maskPassword } = this.state

    if (isAuthenticated()) {
      return <Redirect to={'/'} />
    }

    return (
      <div className={classes.root}>
        <div className={classes.login}>
          <Typography component="h1" align="center" variant="h4">
            Login
          </Typography>
          <TextField
            helperText={emailError}
            error={emailError ? true : false}
            style={{ marginTop: '15px' }}
            className={classes.textField}
            id="email"
            label="Email"
            onChange={this.handleChangeEmail}
          />
          <TextField
            helperText={passwordError}
            error={passwordError ? true : false}
            type={maskPassword ? 'password' : 'text'}
            className={classes.textField}
            id="passord"
            label="Password"
            onChange={this.handleChangePassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <RemoveRedEye onClick={this.toggleShowPassword} />
                </InputAdornment>
              )
            }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleClick}>
            Login
          </Button>
        </div>
      </div>
    )
  }
}

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  )

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(withStyles(styles)(Login))
)
