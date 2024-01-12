import { useRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({text, category , id}:IToDo){
    const setToDos = useRecoilState(toDoState);
    const onClick = ( event :React.MouseEvent<HTMLButtonElement> ) => {
        const {
            currentTarget : { name },
        } = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id)
            return oldToDos;
        });
    };
    return (
    <li >
        <span>{text}</span> 
            {category !== "DOING" &&<button name="DOING"
            onClick={onClick}>할일</button>}
            
            {category !== "TO_DO" &&<button name="TO_DO"
            onClick={onClick}>하는중...</button>}
            
            {category !== "DONE" && <button name="DONE"
            onClick={onClick}>완료</button>}
    </li>
    );
}

export default ToDo;