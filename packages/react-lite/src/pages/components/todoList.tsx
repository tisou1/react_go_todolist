import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { update, deleteTodo } from '~/store'
import type { Item } from '~/store/type'
import {updateTodo, deleteToto} from '../components/api'

export default function TodoList(props: any) {
  const { setTodoList, list } = props
  console.log(list)
  const todoList: Item[] = useSelector((state: Item[]) => state)

  return (
    <div className='todo-list py-4 text-indigo'>
      {
        list.map(todo  => (
          <Todo key={todo.id} todo={todo} getList={setTodoList}/>
        ))
      }
    </div>
  )
}


function Todo(props: {todo: Item, getList: () => void}) {
  const { text, done } = props.todo
  const setTodoList = props.getList
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(text)

  const handleUpdate = (newTodo: Item) => {
    dispatch(update({
      ...newTodo            
    }))
  }
    
  const handleSave = async () => {
    // handleUpdate({

    //   ...props.todo,
    //   text: inputValue
    // })

    // 后端

    const params = {
      ...props.todo,
      text: inputValue
    }

    const res = await updateTodo(params)
    if(res.code) {
      setTodoList()
      setIsEditing(false)
    }
  }


  const handleDelete = async () => {
    let id = props.todo.id
    // delete

    const res = await deleteToto(id as string)
    if(res.code) {
      setTodoList()
    }
    // dispatch(deleteTodo({
    //   id: props.todo.id
    // }))
  }
  return(
    <>
      {
        !isEditing ? 
          <div className='flex justify-between items-center py-2'>
            <div className=''>
              <span className='mr-2'>{text}</span>
              <span>{done ? '完成' : '未完成'}</span>
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