import React from 'react';
import "./Todo.css";
import IconsList from "../IconsList/IconsList";
import {IPropsTodo} from "../../interfaces/interfacesForProps";
import {useAppDispatch} from "../../hook";
import {toggleStatus, deleteTodo} from "../../store/todoSlice";

function Todo(props: IPropsTodo) {
    const dispatch = useAppDispatch();

    function handleCompleteTodo() {
        dispatch(toggleStatus(props.id))
    }

    function handleRemoveTodo() {
        dispatch(deleteTodo(props.id))
    }

    return (
        <li className="todo">
            <h2 className={`todo__title ${props.completed && "todo__title_completed"}`}>{props.title}</h2>
            <IconsList onCompleteChange={handleCompleteTodo} onDelete={handleRemoveTodo} completed={props.completed}/>
        </li>
    );
}

export default Todo;
