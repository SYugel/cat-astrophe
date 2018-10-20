import 'babel-polyfill'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Routes from './Routes'
import HeaderBar from './Layout/HeaderBar'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import SideBar from './Layout/SideBar'
import { logout } from './redux/reducers/auth'

const Wrap = styled.div`
  height: 100%;
  padding-top: 64px;
`

const Content = styled.div`
  height: 100%;
  width: 100%;
`

const MainDiv = styled.div`
  height: calc(100% - 64px);
  width: 100%;
  overflow: hidden;
  position: absolute;
  margin-top: 64px;
  background-color: lightgrey;
`

export class App extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    const { logout } = this.props
    logout()
  }

  render() {
    const { isAuthenticated } = this.props
    return (
      <div>
        <HeaderBar />
        <MainDiv>
          {isAuthenticated && <SideBar onLogout={this.handleLogout} />}
          <Content
            style={{
              paddingLeft: isAuthenticated ? '240px' : '0',
              width: isAuthenticated ? 'calc(100% - 240px)' : '100%'
            }}>
            <Routes />
          </Content>
        </MainDiv>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.auth
  return {
    isAuthenticated
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout
    },
    dispatch
  )

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
