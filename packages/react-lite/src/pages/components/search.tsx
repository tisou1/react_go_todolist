
import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { add } from '~/store'

function Search() {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }
  
    const handleClick = () => {
      if(value === '') return

      const param = {
        text: value,
        id: nanoid(),
        done: 0
      }

      fetch('http://localhost:8080/todoAdd', {
        method: 'post',
        body: JSON.stringify(param)
      })

      // dispatch(add({
      //   text: value
      // }))
      // 清空输入框
      setValue('')
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