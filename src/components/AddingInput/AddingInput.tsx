import React from 'react';
import "./AddingInput.css";
import {IPropsAddingInput} from "../../interfaces/interfacesForProps";

function AddingInput(props: IPropsAddingInput) {
    return (
        <input className="adding-input" placeholder="Введите ваше задание" type="text" value={props.value}
               onChange={(e) => props.updateText(e.target.value)}/>
    );
}

export default AddingInput;
