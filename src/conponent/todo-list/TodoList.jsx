import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, fetchTodos, updateTodo } from '../../store/slice/todo-slice';

const TodoList = () => {
    const [currentTodo, setCurrentTodo]  = useState('');
    const [editedId, setEditedId] = useState(null);


    const dispatch = useDispatch();
    const {todoList, todolistFromApi, isLoading} = useSelector(state => state.todo);


    const handleAddTodo = ()=>{
        dispatch(addTodo(currentTodo));
        setCurrentTodo('')
    }

    const handleEditTodo =()=>{
        dispatch(updateTodo({
            editedId,
            currentTodo
        }))
         setCurrentTodo('')
    }

    const handleDeleteTodo =(id)=>{
        dispatch(deleteTodo(id));
    }

    const handleUpdateTodo = (item)=>{
        setEditedId(item.id)
        setCurrentTodo(item.title)
    }

    const fetchTodosFromApi = () =>{
        dispatch(fetchTodos())
    }

    useEffect(()=>{
        dispatch(fetchTodos())
    },[])

   if(isLoading) return <p>Fetch todo from store ....</p> 
  return (
    <div>
        <input type="text" value={currentTodo} onChange={(e)=>setCurrentTodo(e.target.value)} className="text" name='todo' placeholder='enter your todo' />
        <button disabled={currentTodo === '' } onClick={editedId !== null ? handleEditTodo : handleAddTodo}>{editedId !== null ? "EditTodo" : "AddTodo"}</button>
        <div>
         <ul>
            {
                todoList && todoList.map(item => {
                    return(
                            <li key={item.id}>
                            <p >{item.title}</p>
                            <button onClick={()=>handleDeleteTodo(item.id)}>delete</button>
                            <button onClick={()=>handleUpdateTodo(item)}>update</button>
                            </li>
                    )
                    
                })
            }
            </ul>
        </div>

        <div >
            <h2>Fetch List From Todo</h2>
            <button onClick={fetchTodosFromApi}>fetch</button>
            <ul>
                {
                    todolistFromApi && todolistFromApi.length > 0 ? 
                     todolistFromApi.map(item => <li key={item.id}>{item.todo}</li>):<p>Not found</p>
                }
            </ul>
        </div>
    </div>
  )
}

export default TodoList