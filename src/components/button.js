// @flow

import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

type ButtonProps = {
  onClick?: () => void,
  children?: any,
  style?: any
}

export class Button extends Component {
  render() {
    const { onClick, children, style } = this.props
    return (
      <TouchableOpacity style={style} onPress={onClick}>
        {children}
      </TouchableOpacity>
    )
  }
}
