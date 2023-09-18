import React from 'react';
import "./TodoList.css";
import Todo from "../Todo/Todo";

function TodoList() {
    return (
        <ul className="todo-list">
            <Todo completed={true} id="43423" title="Какой-то текст"/>
            <Todo  completed={false} id="54" title="Какой-то текст 1"/>
            <Todo  completed={true} id="7685940" title="Какой-то текст 2"/>
        </ul>
    );
}

export default TodoList;
