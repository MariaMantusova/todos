import React from 'react';
import "./Form.css";
import AddingInput from "../AddingInput/AddingInput";

function Form() {
    return (
        <form className="form">
            <AddingInput/>
            <button className="form__button">Добавить</button>
        </form>
    );
}

export default Form;
