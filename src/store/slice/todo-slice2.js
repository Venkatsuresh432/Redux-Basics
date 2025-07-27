import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const  fetchTodos = createAsyncThunk('thukTodo', async()=>{
    // api class;s /...createAsyncThunk.apply.apply.
})


const initialState = []

const todoReducer = createSlice({
        name:'todo',
        initialState,
        reducers:{
            addpath(state,action){},
        },
        extraReducers: (builder)=>{
            
            builder.addCase(fetchTodos.pending)
            builder.addCase(fetchTodos.fulfilled)
            builder.addCase(fetchTodos.rejected)

        }
});


export default { addpath } = todoReducer.actions;


export default todoReducer.reducer;