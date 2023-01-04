import { configureStore } from '@reduxjs/toolkit'
import todolistSlice from './reducers/todoList'

export const { add, update, deleteTodo } = todolistSlice.actions

const store = configureStore({
  reducer: todolistSlice.reducer
})

export default store