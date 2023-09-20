import {createSlice, createAsyncThunk, AnyAction, PayloadAction} from "@reduxjs/toolkit";
import {TChangeTodo, TodosState} from "../types/mainTypes";
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
            completed: false,
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

export const changeTodo = createAsyncThunk<Todo, TChangeTodo, {rejectValue: string, state: {todos: TodosState}, }>(
    "todos/changeTodo",
    async function ({id, title}, {rejectWithValue, getState}) {
            const todo = getState().todos.list.find(todo => todo.id === id);

            if (todo) {
                const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: title,

                    })
                })

                if (!response.ok) {
                    return rejectWithValue("Не получается изменить задание.")
                }

                return (await response.json()) as Todo;
            }

            return rejectWithValue("Нет такого задания.")
        }
)

export const deleteTodo = createAsyncThunk<string, string, {rejectValue: string}>(
    "todos/deleteTodo",
    async function (id, {rejectWithValue}) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            return rejectWithValue("Не получается выполнить задание.")
        }

        return id;
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
    reducers: {},
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
            .addCase(deleteTodo.pending, (state) => {
                state.error = null;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.list = state.list.filter(todo => todo.id !== action.payload)
            })
            .addCase(changeTodo.pending, (state) => {
                state.error = null;
            })
            .addCase(changeTodo.fulfilled, (state, action) => {
                const changedTodo = state.list.find(todo => todo.id === action.payload.id)

                if (changedTodo) {
                    changedTodo.title = action.payload.title;
                }
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
})

export default todoSlice.reducer;

function isError(action: AnyAction) {
    return action.type.endsWith("rejected")
}
