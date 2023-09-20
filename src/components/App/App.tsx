import React, {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hook";
import Header from "../Header/Header";
import Form from "../Form/Form";
import TodoList from "../TodoList/TodoList";
import {fetchTodos, addNewTodo} from "../../store/todoSlice";
import Loading from "../Loading/Loading";

function App() {
    const [text, setText] = useState("");
    const {loading, error} = useAppSelector(state => state.todos)
    const dispatch = useAppDispatch();

    function handleAction(event: any) {
        event.preventDefault();
        if (text.trim().length) {
            dispatch(addNewTodo(text));
            setText("");
        }
    }

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch])

    return (
        <>
            <Header/>
            <Form value={text} updateText={setText} handleAction={handleAction}/>
            {loading ?
                <Loading/> :
                error ?
                    <></> :
                    <TodoList/>}
        </>

    );
}

export default App;
