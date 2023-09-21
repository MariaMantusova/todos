import {Todo} from "../interfaces/mainInterfaces";

export type TodosState = {
    list: Todo[],
    loading: boolean,
    error: string | null,
}

export type TChangeTodo = {
    id: string,
    title: string
}
