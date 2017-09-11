// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

type TaskItemProps = {
  title: string
}

export class TaskItem extends Component {
  props: TaskItemProps

  render() {
    const { title } = this.props

    return (
      <View>
        <Text>{title}</Text>
      </View>
    )
  }
}
