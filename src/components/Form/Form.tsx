import React from 'react';
import "./Form.css";
import AddingInput from "../AddingInput/AddingInput";
import {IPropsForm} from "../../interfaces/interfacesForProps";

function Form(props: IPropsForm) {
    return (
        <form className="form">
            <AddingInput value={props.value} updateText={props.updateText}/>
            <button className="form__button" onClick={props.handleAction}>Добавить</button>
        </form>
    );
}

export default Form;
