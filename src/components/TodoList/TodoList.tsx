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
        </ul>
    );
}

export default TodoList;
