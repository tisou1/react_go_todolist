import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { update, deleteTodo } from '~/store'
import type { Item } from '~/store/type'
import axios from 'axios'

export default function c() {
  const todoList: Item[] = useSelector((state: Item[]) => state)
  const [list, setList] = useState<Item[]>([])


  const getList = () => {
    fetch('http://localhost:8080/todoList')
    .then(res => res.json())
    .then(data => {
      setList(data.todoList || [])
    })
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <div className='todo-list py-4 text-indigo'>
      {
        list.map(todo => (
          <Todo key={todo.id} todo={todo} getList={getList}/>
        ))
      }
    </div>
  )
}


function Todo(props: {todo: Item, getList: () => void}) {
  const { text, done } = props.todo
  const getList = props.getList
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
    let id = props.todo.id
    // delete
    fetch(`http://localhost:8080/todoDelete/${id}`, {
      method: 'delete',
    }).then(res => res.json())
    .then(data => {
      // 获取新的列表
      getList()
    })

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