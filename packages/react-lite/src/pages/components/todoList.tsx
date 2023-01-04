import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { update, deleteTodo } from '~/store'
import type { Item } from '~/store/type'

export default function c() {
  const todoList: Item[] = useSelector((state: Item[]) => state)

  return (
    <div className='todo-list py-4 text-indigo'>
      {
        todoList.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))
      }
    </div>
  )
}


function Todo(props: {todo: Item}) {
  const { text, done } = props.todo
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(text)

  const handleUpdate = (newTodo: Item) => {
    dispatch(update({
      ...newTodo            
    }))
  }
    
  const handleSave = () => {
    handleUpdate({

      ...props.todo,
      text: inputValue
    })
    setIsEditing(false)
  }


  const handleDelete = () => {
    dispatch(deleteTodo({
      id: props.todo.id
    }))
  }
  return(
    <>
      {
        !isEditing ? 
          <div className='flex justify-between items-center py-2'>
            <div className=''>
              <span>{text}</span>
              <span>{done}</span>
            </div>
            <div>
              <button onClick={() => setIsEditing(true)} className='btn mr-2'>编辑</button>
              <button onClick={handleDelete} className='btn'>删除</button>
            </div>
          </div>
          : 
          <div className='flex justify-between items-center py-2'>
            <input
              value={inputValue}
              className='input h-32px'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value as string)} />
            <button onClick={handleSave} className='btn h-32px 1/5 px-3 ml-3'>
              保存
            </button>
          </div>
      }
    </>
  )
}