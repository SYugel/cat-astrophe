import 'babel-polyfill'
import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div className="catastrophe">
        <h1>This is the future home of Cat-astrophe</h1>
        <img src="http://placekitten.com/200/200" />
      </div>
    )
  }
}
