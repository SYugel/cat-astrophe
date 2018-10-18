import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper'
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import {withRouter, Redirect} from 'react-router-dom'
import {login, LOGIN_SUCCESS} from './redux/reducers/auth'
import {isAuthenticated} from './Routes'


const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`

const LoginDiv = styled.div`
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 500px;
  height: 450px;
  background-color: lightgrey;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
`

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 25,
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
      passwordError: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.isInputsValid = this.isInputsValid.bind(this)
  }
  
  handleChangeEmail(event) {
    this.setState({email: event.target.value})
  }
  
  handleChangePassword(event) {
    this.setState({password: event.target.value})
  }
  
  handleClick() {
    const {login, history} = this.props
    const {email, password} = this.state
    if (!this.isInputsValid(email, password)) {
      return;
    }
    
    login({email: this.state.email, password: this.state.password}).then(({type, payload}) => {
      if (type !== LOGIN_SUCCESS) {
        window.alert('Please enter a valid email/password combination.');
      }
      else {
        history.push('/feed')
      }
    })
  }
  
  isInputsValid(email, password) {
    if (email.trim() === '') {
      this.setState({emailError: 'You must enter an email address'})
    }
    if (password.trim() === '') {
      this.setState({passwordError: 'You must enter a password'})
    }
    
    return email.trim() !== '' || password.trim() !== ''
  }
  
  render() {
    const {classes} = this.props
    const {emailError, passwordError} = this.state
    
    if (isAuthenticated()) {
      return <Redirect to={'/'} />
    }

    return (
      <StyledDiv>
        <LoginDiv>
          <TextField helperText={emailError} error={emailError ? true : false} style={{marginTop: '15px'}} className={classes.textField} id="email" label="Email" onChange={this.handleChangeEmail}/>
          <TextField helperText={passwordError} error={passwordError ? true : false} className={classes.textField} id="passord" label="Password" onChange={this.handleChangePassword}/>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClick}>Login</Button>
        </LoginDiv>
      </StyledDiv>
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

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles)(Login)))