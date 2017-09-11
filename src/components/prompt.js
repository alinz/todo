// @flow

import React, { Component } from 'react'
import { View, Modal, StyleSheet, TextInput, TouchableWithoutFeedback, Text } from 'react-native'

import { Button } from 'components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  content: {
    elevation: 5,
    marginTop: 150,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden'
  },
  title: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  input: {
    height: 50,
    paddingHorizontal: 15
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#5B5C5B',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

type PromptProps = {
  title: string,
  value: string,
  visible: boolean,
  onCancel?: () => void,
  onOK?: () => void,
  onChangeText: (value: string) => void
}

export class Prompt extends Component {
  props: PromptProps

  static defaultProps = {
    title: 'title',
    visible: false,
    value: ''
  }

  render() {
    const { onCancel, visible, value, onOK, title, onChangeText } = this.props

    return (
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.container} key="prompt">
          <TouchableWithoutFeedback onPress={onCancel}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <View style={styles.content}>
            <View style={styles.title}>
              <Text>{title}</Text>
            </View>
            <View style={styles.dialogBody}>
              <TextInput
                value={value}
                style={[styles.input]}
                autoFocus={true}
                onChangeText={onChangeText}
                underlineColorAndroid="white"
              />
            </View>
            <View style={styles.footer}>
              <Button onClick={onCancel} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Cancel</Text>
              </Button>
              <View style={{ backgroundColor: '#5B5C5B', width: 1, height: 30 }} />
              <Button onClick={onOK} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>OK</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
