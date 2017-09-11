// @flow

import { observable, action } from 'mobx'

export class Task {
  @observable value: string
  @observable done: boolan

  constructor(value: string = '', done: boolean = false) {
    this.value = value
    this.done = done
  }

  @action
  setValue(value: string) {
    this.value = value
  }

  @action
  setDone() {
    this.done = true
  }
}
