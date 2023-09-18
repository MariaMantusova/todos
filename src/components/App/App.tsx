import React, {useState} from 'react';
import { useAppDispatch } from "../../hook";
import {addTodo} from "../../store/todoSlice";
import Header from "../Header/Header";
import Form from "../Form/Form";
import TodoList from "../TodoList/TodoList";

function App() {
    const [text, setText] = useState("");
    const dispatch = useAppDispatch();

    function handleAction(event: any) {
        event.preventDefault();
        if (text.trim().length) {
            dispatch(addTodo(text));
            setText("");
        }
    }

    return (
        <>
            <Header/>
            <Form value={text} updateText={setText} handleAction={handleAction}/>
            <TodoList/>
        </>
    );
}

export default App;
