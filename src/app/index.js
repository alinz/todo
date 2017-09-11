// @flow

import React, { Component } from 'react'
import { Provider } from 'mobx-react/native'
import { useStrict } from 'mobx'

import { stores } from './stores'
import { TodoList } from './todo_list'

// make sure / enforce that only action methods can mutate observable
useStrict(true)

export class TodoApp extends Component {
  render() {
    return (
      <Provider {...stores}>
        <TodoList />
      </Provider>
    )
  }
}
