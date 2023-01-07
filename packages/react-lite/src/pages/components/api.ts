import { Item } from "~/store/type"

const getList = async () => {
  try {
    const res = await fetch('http://localhost:8080/todoList')
    const data = await res.json()

    return {
        code: 1,
        data
    }
  } catch(e) {
    return {
        code: 0,
        err: e
    }
  }
}

const updateTodo = async (params: Item) => {
   try {
    const res = await fetch(`http://localhost:8080/todoUpdate`, {
        method: 'put',
        body: JSON.stringify(params)
      })
    const data = await res.json()
    return {
        code: 1,
        data
    }
   } catch(e) {
    return {
        code: 0,
        err: e
    }
   }
}

const deleteToto = async (id: string) => {
    try {
        const res = await fetch(`http://localhost:8080/todoDelete/${id}`, {
            method: 'delete',
          })
        const data = await res.json()
        return {
            code: 1,
            data
        }
       } catch(e) {
        return {
            code: 0,
            err: e
        }
       }
}

const addTodo = async (params: Item) => {
    try {
        const res = await fetch('http://localhost:8080/todoAdd', {
            method: 'post',
            body: JSON.stringify(params)
          })
        const data = await res.json()
        return {
            code: 1,
            data
        }
       } catch(e) {
        return {
            code: 0,
            err: e
        }
       }
  
}



export {
    getList,
    updateTodo,
    deleteToto,
    addTodo
}