import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist';

export interface IToDo {
    id : number;
    text : string;
}

interface IToDoState {
    [key:string]: IToDo[];
}
const { persistAtom } = recoilPersist({
    key: "localStorage", // 고유한 key 값
    storage: localStorage,
})



export const toDoState = atom<IToDoState>({
    key : "toDo",
    default :  {
        "해야 할일🤔" : [],
        "하고 있는 중...✍️" : [],
        "다 했다!😎" : [],
        
    },
    effects_UNSTABLE: [persistAtom]
});

export const delState = atom<IToDoState>({
    key : "del",
    default :  {
        "🗑️" :[]
        
    },
});