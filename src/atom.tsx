import { atom, selector } from "recoil";

interface IToDoState {
    [key:string]: string[];
}


export const toDoState = atom<IToDoState>({
    key : "toDo",
    default :  {
        "해야 할일🤔" : ["a","b","c",],
        "하고 있는 중...✍️" : ["d","e",],
        "다 했다!😎" : ["f"],
    },
});