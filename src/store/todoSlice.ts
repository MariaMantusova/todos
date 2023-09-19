import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {TodosState} from "../types/mainTypes";
import {Todo} from "../interfaces/mainInterfaces";

export const fetchTodos = createAsyncThunk<Todo[], undefined, {rejectValue: string}>(
    "todos/fetchTodos",
    async function (_, {rejectWithValue}) {

        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=15");

        if (!response.ok) {
            return rejectWithValue("Server Error!")
        }

        return await response.json();
    }
)

export const addNewTodo = createAsyncThunk<Todo, string, {rejectValue: string}>(
    "todos/addNewTodo",
    async function (text, {rejectWithValue}) {
        const todo = {
            title: text,
            userId: 1,
            completed: false
        }

        const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        });

        if (!response.ok) {
            return rejectWithValue("Не получается добавить задание.")
        }

        return (await response.json()) as Todo;
    }
)

export const toggleStatus = createAsyncThunk<Todo, string, {rejectValue: string, state: {todos: TodosState}}>(
    "todos/toggleStatus",
    async function (id, {rejectWithValue, getState}) {
        const todo = getState().todos.list.find(todo => todo.id === id);

        if (todo) {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    completed: !todo.completed,
                })
            })

            if (!response.ok) {
                return rejectWithValue("Не получается выполнить задание.")
            }

            return (await response.json()) as Todo;
        }

        return rejectWithValue("Нет такого задания.")
    }
)

const initialState:TodosState = {
    list: [],
    loading: false,
    error: null
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        // addTodo(state, action: PayloadAction<string>) {
        //     state.list.push({
        //         id: new Date().toISOString(),
        //         title: action.payload,
        //         completed: false,
        //     })
        // },
        // toggleComplete(state, action: PayloadAction<string>) {
        //     const toggledTodo = state.list.find(todo => todo.id === action.payload)
        //     if (toggledTodo) {
        //         toggledTodo.completed = !toggledTodo.completed
        //     }
        // },
        // removeTodo(state, action: PayloadAction<string>) {
        //     state.list = state.list.filter(todo => todo.id !== action.payload)
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(addNewTodo.pending, (state) => {
                state.error = null;
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(toggleStatus.pending, (state) => {
                state.error = null;
            })
            .addCase(toggleStatus.fulfilled, (state, action) => {
                const toggledTodo = state.list.find(todo => todo.id === action.payload.id)

                if (toggledTodo) {
                    toggledTodo.completed = !toggledTodo.completed
                }
            })
    }
})

// export const {addTodo, toggleComplete, removeTodo} = todoSlice.actions;
export default todoSlice.reducer;
