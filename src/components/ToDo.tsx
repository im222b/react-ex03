import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

const food = [ "pizza", "mango", "kimchi", " kimbab"] 
const front = ["pizza"]
const back = [ "kimchi", " kimbab"] 
const finalPart = [...front, "감", ...back]

function ToDo({text, category , id  }:IToDo){
    const setToDos = useSetRecoilState(toDoState);
    const onClick = ( event :React.MouseEvent<HTMLButtonElement> ) => {
        const {
            currentTarget : { name },
        } = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = { text, id, category: name as any };
            return [
                ...oldToDos.slice(0,targetIndex),
                newToDo ,
                ...oldToDos.slice(targetIndex +1),
            ];
        });
    };
    return (
    <li >
        <span>{text}</span> 
            {category !== "TO_DO" &&(<button name="TO_DO"
            onClick={onClick}>할일</button>)}
            
            {category !== "DOING" &&(<button name="DOING"
            onClick={onClick}>하는중...</button>)}
            
            {category !== "DONE" && (<button name="DONE"
            onClick={onClick}>완료</button>)}
    </li>
    );
}

export default ToDo;