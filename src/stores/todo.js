// @flow

import { observable, action } from 'mobx'

import { Task } from 'models'

export class TodoStore {
  @observable current: Task
  @observable active: Array<Task> = []
  @observable done: Array<Task> = []

  @action
  setCurrent(task: Task) {
    this.current = task
  }

  @action
  load(active: Array<Task> = [], done: Array<Task> = []) {
    this.active = active
    this.done = done
  }

  @action
  addTask(task: Task) {
    if (this.active.indexOf(task) === -1) {
      this.active.push(task)
    }
  }

  @action
  taskDone(task: Task) {
    const index = this.active.indexOf(task)
    if (index !== -1) {
      this.active.splice(index, 1)
      this.done.unshift(task)
      setTimeout(
        action(() => {
          task.done = true
        }),
        500
      )
    }
  }

  @action
  removeTask(task: Task) {
    const index = this.done.indexOf(task)
    if (index !== -1) {
      this.done.splice(index, 1)
    }
  }
}
