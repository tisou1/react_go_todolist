import React,{ useState } from 'react'
import TodoList from './components/todoList'
import Search from './components/search'

function Index() {
  return (
    <section className='text-center w-1/2 mx-auto'>
      <Search />
      <TodoList />
    </section>
  )
}

export default Index