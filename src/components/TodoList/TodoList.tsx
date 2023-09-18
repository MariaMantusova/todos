import React from 'react';
import "./TodoList.css";
import Todo from "../Todo/Todo";
import {useAppSelector} from "../../hook";

function TodoList() {
    const todos = useAppSelector(state => state.todos.list);

    return (
        <ul className="todo-list">
            {todos.map((todo, index) => (
                <Todo title={todo.title} id={todo.id} completed={todo.completed} key={index}/>
            ))}
            <Todo completed={true} id="43423" title="Какой-то текст"/>
            <Todo  completed={false} id="54" title="Какой-то текст 1"/>
            <Todo  completed={true} id="7685940" title="Какой-то текст 2"/>
        </ul>
    );
}

export default TodoList;
