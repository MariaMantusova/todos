import React, {useEffect, useState} from 'react';
import "./Todo.css";
import IconsList from "../IconsList/IconsList";
import {IPropsTodo} from "../../interfaces/interfacesForProps";
import {useAppDispatch} from "../../hook";
import {toggleStatus, deleteTodo, changeTodo} from "../../store/todoSlice";

function Todo(props: IPropsTodo) {
    const [value, setValue] = useState(props.title);
    const [isDisabled, setIsDisabled] = useState(true);
    const [todoChangeObj, setTodoChangeObj] = useState({
        id: props.id,
        title: value,
    })

    useEffect(() => (
        setTodoChangeObj({
            id: props.id,
            title: value
        })
    ),[props.id, value])

    const dispatch = useAppDispatch();

    function handleCompleteTodo() {
        dispatch(toggleStatus(props.id))
    }

    function handleRemoveTodo() {
        dispatch(deleteTodo(props.id))
    }

    function onChangeTodoClick() {
        setIsDisabled(false)
    }

    function handleChange(evt: any) {
        setValue(evt.target.value)
    }

    function onFormSubmit(evt: any) {
        evt.preventDefault();
        dispatch(changeTodo(todoChangeObj));
        setIsDisabled(true);
    }

    return (
        <li className="todo">
            <form className="todo__form" onSubmit={onFormSubmit}>
                <input className={`todo__title ${props.completed && "todo__title_completed"}`}
                       value={value} onChange={handleChange} disabled={isDisabled}/>
            </form>
            <IconsList onCompleteChange={handleCompleteTodo} onChangeClick={onChangeTodoClick}
                       onDelete={handleRemoveTodo} completed={props.completed}/>
        </li>
    );
}

export default Todo;
