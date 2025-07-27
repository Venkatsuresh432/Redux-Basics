import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slice/todo-slice'



const store  = configureStore({
    reducer:{
        todo: todoReducer
    }
});


export default store;