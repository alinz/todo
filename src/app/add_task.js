// @flow

import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Entypo'

import { Button } from 'components'

export class AddTask extends Component {
  render() {
    return (
      <Button onClick={this.props.onClick} style={{ marginRight: 10 }}>
        <Icon name="add-to-list" size={20} color="#900" />
      </Button>
    )
  }
}
