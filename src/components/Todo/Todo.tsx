import React from 'react';
import "./Todo.css";
import IconsList from "../IconsList/IconsList";

function Todo() {
    return (
        <li className="todo">
            <h2 className="todo__title">Какой-то заголовок</h2>
            <IconsList/>
        </li>
    );
}

export default Todo;
