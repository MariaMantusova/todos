import React from "react";

export interface IPropsTodo {
    title: string,
    id: string,
    completed: boolean
}

export interface IPropsIconsList {
    onCompleteChange: () => void,
    onDelete: () => void,
    completed: boolean
}

export interface IPropsAddingInput {
    value: string,
    updateText: (str: string) => void,
}

export interface IPropsForm {
    value: string,
    updateText: (str: string) => void,
    handleAction: (event: any) => void
}
