// @flow

import { TodoStore, PromptStore } from 'stores'

export const stores = {
  todoStore: new TodoStore(),
  promptStore: new PromptStore()
}
