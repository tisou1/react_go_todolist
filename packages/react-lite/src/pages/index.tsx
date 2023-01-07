import React,{ useState, useEffect } from 'react'
import TodoList from './components/todoList'
import Search from './components/search'
import { addTodo, getList } from './components/api'

function Index() {
  const [list, setList] = useState([])
  // 列表的请求放在这里

  async function setTodoList() {
    const res = await getList()
    if(res.code) {
     setList(res.data.todoList || [])
    }
  }

  useEffect(() => {
    setTodoList()
  }, [])
  return (
    <section className='text-center w-1/2 mx-auto'>
      <Search setTodoList={setTodoList}/>
      <TodoList setTodoList={setTodoList} list={list}/>
    </section>
  )
}

export default Index