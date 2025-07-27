// name initialstate reducers

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk('fetchTodos', async()=>{
    const response = await fetch('https://dummyjson.com/todos')
    const result = await response.json();
    return result;

})


const initialState={
    todoList:[],
    isLoading:false,
    todolistFromApi:[],
    isError:false
}

const todoReducer = createSlice({
    name:'todo',
    initialState,
    reducers:{
        // combine all the actions that you need
        addTodo(state, action){
        const newlyCreatedTodo = {
            id: state.todoList.length === 0 ? 1 : state.todoList.length + 1,
            title: action.payload
        }
        state.todoList.push(newlyCreatedTodo);
        return state;
        },
        deleteTodo(state, action){
            state.todoList = state.todoList.filter(f => f.id !== action.payload);
           return state;
        },
        updateTodo(state,action){
            let getTodos = state.todoList;
            const getCurrentTodo = getTodos.findIndex(item => item.id === action.payload.editedId);
            getTodos[getCurrentTodo] = {
                ...getTodos[getCurrentTodo],
                title:action.payload.currentTodo
            }            
            return state;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchTodos.pending, (state, action)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchTodos.fulfilled, (state, action)=>{
            console.log(action.payload)
            state.isLoading =false;
            state.todolistFromApi = action.payload.todos
        })
        builder.addCase(fetchTodos.rejected, (state, action)=>{
            state.isLoading=false;
            state.isError=true;
        })
    }
});

export const { addTodo, deleteTodo, updateTodo }  = todoReducer.actions;

export default todoReducer.reducer;

