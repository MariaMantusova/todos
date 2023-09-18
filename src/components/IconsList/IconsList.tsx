import React from 'react';
import "./IconsList.css";
import {IPropsIconsList} from "../../interfaces/interfacesForProps";

function IconsList(props: IPropsIconsList) {
    return (
        <ul className="icons">
            <li className={`icon ${!props.completed ? "icon-done" : "icon-not-done"}`}
                onClick={props.onCompleteChange}></li>
            <li className="icon icon-change"></li>
            <li className="icon icon-delete" onClick={props.onDelete}></li>
        </ul>
    );
}

export default IconsList;
