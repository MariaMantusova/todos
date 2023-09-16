import React from 'react';
import "./TodoList.css";
import Todo from "../Todo/Todo";

function TodoList() {
    return (
        <ul className="todo-list">
            <Todo/>
            <Todo/>
            <Todo/>
        </ul>
    );
}

export default TodoList;
