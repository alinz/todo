// @flow

import { observable, action } from 'mobx'

export class PromptStore {
  @observable title: string = ''
  @observable visible: boolean = false
  @observable inputValue: string = ''

  @action
  setVisible(visible: boolean) {
    this.visible = visible
  }

  @action
  setInputValue(value: string) {
    this.inputValue = value
  }

  @action
  setTitle(title: string) {
    this.title = title
  }
}
