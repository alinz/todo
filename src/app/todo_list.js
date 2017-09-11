// @flow

import React, { Component } from 'react'
import { View, Text, SectionList, TouchableHighlight, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react/native'
import Swipeable from 'react-native-swipeable'
import Icon from 'react-native-vector-icons/Entypo'

import { Prompt, Button } from 'components'
import { Task } from 'models'

import { AddTask } from './add_task'

const styles = StyleSheet.create({
  actionButton: {
    height: 60,
    justifyContent: 'center'
  }
})

@inject('promptStore', 'todoStore')
@observer
class TaskItem extends Component {
  ref: Swipeable

  onDelete = () => {
    const { todoStore, task } = this.props
    todoStore.removeTask(task)
    this.ref.recenter()
  }

  onEdit = () => {
    const { promptStore, todoStore, task } = this.props
    this.ref.recenter()
    setTimeout(() => {
      todoStore.setCurrent(task)
      promptStore.setTitle('Update Task')
      promptStore.setInputValue(task.value)
      promptStore.setVisible(true)
    }, 500)
  }

  onDone = () => {
    const { todoStore, task } = this.props
    todoStore.taskDone(task)
    this.ref.recenter()
  }

  render() {
    const { task } = this.props

    const rightButtons = task.done
      ? [
          <Button onClick={this.onDelete} style={[styles.actionButton, { backgroundColor: 'red' }]}>
            <Icon style={{ paddingLeft: 30 }} name="trash" size={20} color="white" />
          </Button>
        ]
      : [
          <Button onClick={this.onEdit} style={[styles.actionButton, { backgroundColor: 'yellow' }]}>
            <Icon style={{ paddingLeft: 30 }} name="edit" size={20} color="black" />
          </Button>,
          <Button onClick={this.onDone} style={[styles.actionButton, { backgroundColor: 'green' }]}>
            <Icon style={{ paddingLeft: 30 }} name="check" size={20} color="white" />
          </Button>
        ]

    return (
      <Swipeable ref={ref => (this.ref = ref)} rightButtons={rightButtons}>
        <View style={{ height: 60, paddingLeft: 10, backgroundColor: 'white', justifyContent: 'center' }}>
          <Text>{task.value}</Text>
        </View>
      </Swipeable>
    )
  }
}

@inject('promptStore', 'todoStore')
@observer
export class TodoList extends Component {
  onCancel = () => {
    const { promptStore } = this.props
    promptStore.setVisible(false)
  }

  onChangeText = (value: string) => {
    const { promptStore, todoStore } = this.props

    // if task is done, you can't modify the value
    if (!todoStore.current.done) {
      promptStore.setInputValue(value)
      todoStore.current.setValue(value)
    }
  }

  onOK = () => {
    const { promptStore, todoStore } = this.props

    todoStore.addTask(todoStore.current)

    promptStore.setVisible(false)
    promptStore.setInputValue('')
  }

  onAddNewTask = () => {
    const { promptStore, todoStore } = this.props
    todoStore.setCurrent(new Task())
    promptStore.setTitle('New Task')
    promptStore.setVisible(true)
  }

  renderHeader() {
    return (
      <View
        style={{
          paddingTop: 20,
          height: 65,
          backgroundColor: '#EFEEF2',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomColor: '#DDDDE2',
          borderBottomWidth: 1
        }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Todo List</Text>
        <View style={{ position: 'absolute', right: 0, paddingTop: 20 }}>
          <AddTask onClick={this.onAddNewTask} />
        </View>
      </View>
    )
  }

  renderBody() {
    const { todoStore } = this.props

    const sections = []

    if (todoStore.active.length > 0) {
      sections.push({
        data: todoStore.active.map(task => task),
        title: `Current Task${todoStore.active.length > 1 ? 's' : ''}`
      })
    }

    if (todoStore.done.length > 0) {
      sections.push({
        data: todoStore.done.map(task => task),
        title: `Task${todoStore.done.length > 1 ? 's' : ''} Done`,
        done: true
      })
    }

    return (
      <SectionList
        bounces={false}
        style={{
          backgroundColor: '#E9E8EF'
        }}
        keyExtractor={(item, index) => `item:${index}`}
        sections={sections}
        renderItem={({ item }) => <TaskItem task={item} />}
        renderSectionHeader={({ section }) => (
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
              justifyContent: 'center',
              backgroundColor: section.done ? '#4A8400' : '#F7F300'
            }}>
            <Text style={{ fontSize: 16 }}>{section.title}</Text>
          </View>
        )}
      />
    )
  }

  render() {
    const { promptStore } = this.props

    return (
      <View style={{ flex: 1 }}>
        {this.renderHeader()}
        {this.renderBody()}
        <Prompt
          title={promptStore.title}
          visible={promptStore.visible}
          value={promptStore.inputValue}
          onCancel={this.onCancel}
          onChangeText={this.onChangeText}
          onOK={this.onOK}
        />
      </View>
    )
  }
}
