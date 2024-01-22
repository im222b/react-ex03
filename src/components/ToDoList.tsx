import { selector, useRecoilState, useRecoilValue} from "recoil";
import CreateToDo from "./CreateToDo";
import { categoryState, toDoSelector, toDoState } from "../atoms";
import ToDo from "./ToDo";
import React from "react";


function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCatgory] = useRecoilState(categoryState)
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        setCatgory(event.currentTarget.value);
    };

    return (<div> 
        <h1>To Dos</h1>
        <hr />
        <select value={category} onInput={onInput}>
            <option value="TO_DO" >할 일</option>
            <option value="DOING" >하 는 중</option>
            <option value="DONE" >완 료</option>
        </select>
        <CreateToDo />    
        {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
        ))}
        
        </div>
        
        );
    }

export default ToDoList;