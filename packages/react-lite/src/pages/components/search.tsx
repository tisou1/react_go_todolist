
import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { add } from '~/store'
import { addTodo } from '../components/api'

function Search(props: any) {
    const { setTodoList } = props
    const dispatch = useDispatch()
    const [value, setValue] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }
  
    const handleClick = async () => {
      if(value === '') return

      const param = {
        text: value,
        id: nanoid(),
        done: 0
      }

      // add
      const res = await addTodo(param)

      if(res.code) {
        setTodoList()
        setValue('')
      }


      // dispatch(add({
      //   text: value
      // }))
      // 清空输入框
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // keyCode 提示已弃用, 这里使用key
      if(e.key === 'Enter') {
        handleClick()
      }
    }

    return (
        <div className='flex items-center'>
        <input 
          value={value} 
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="输入todo"
          className="grow text-gray pa-2 rounded-1 border-2 border-indigo-500/75 outline-none placeholder:text-slate-400"
        />
        <button className='btn ml-2 h-36px px-5 w-1/5' onClick={handleClick}>添加</button>
      </div>
    )
}

export default Search