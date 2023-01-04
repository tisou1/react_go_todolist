import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { add } from '~/store'
import TodoList from './components/todoList'

function Index() {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClick = () => {
    dispatch(add({
      text: value
    }))
    // 清空输入框
    setValue('')
  }

  return (
    <section className='text-center w-full'>
      <div className='flex justify-center items-center'>
        <input 
          value={value} 
          onChange={handleChange}
          className="pa-2 rounded-1 border-none focus:border-none active:border-none"
        />
        <button className='btn ml-2 h-36px' onClick={handleClick}>添加</button>
      </div>

      <TodoList />
    </section>
  )
}

export default Index