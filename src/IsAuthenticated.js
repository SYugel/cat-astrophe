import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isAuthenticated } from './Routes'
import { setUser } from './redux/reducers/auth'

export class IsAuthenticated extends Component {
  constructor(props) {
    super(props)
    this.setUser = this.setUser.bind(this)
  }
  componentWillMount() {
    this.setUser()
  }

  componentDidMount() {
    this.setUser()
  }

  componentDidUpdate() {
    this.setUser()
  }

  setUser() {
    const { isAuthenticated, setUser } = this.props
    if (!isAuthenticated) {
      setUser()
    }
  }

  render() {
    return null
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUser
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IsAuthenticated)
