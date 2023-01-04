import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Item } from '../type'

const todolistSlice = createSlice({
  name: 'counter',
  initialState: [] as Item[],
  reducers: {
    add: (state, action: PayloadAction<Item>) => {
      state.push({
        ...action.payload,
        // 生成唯一的id
        id: nanoid(),
        done: false
      })
    },
    update: (state, action) => {
      const { id, text, done } = action.payload
      // 从列表中找到
      const curTodo = state.find(v => v.id === id)
      if(curTodo) {
        curTodo.text = text
        curTodo.done = done
      }
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload
      const index = state.findIndex(v => v.id === id)
      state.splice(index, 1)
    },
  }
})


export default todolistSlice