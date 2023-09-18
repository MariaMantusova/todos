import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Todo} from "../interfaces/mainInterfaces";
import {TodosState} from "../types/mainTypes";

const initialState:TodosState = {
    list: [],
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.list.push({
                id: new Date().toISOString(),
                title: action.payload,
                completed: false,
            })
        },
        toggleComplete(state, action: PayloadAction<string>) {
            const toggledTodo = state.list.find(todo => todo.id === action.payload)
            if (toggledTodo) {
                toggledTodo.completed = !toggledTodo.completed
            }
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.list = state.list.filter(todo => todo.id !== action.payload)
        }
    }
})

export const {addTodo, toggleComplete, removeTodo} = todoSlice.actions;
export default todoSlice.reducer;
