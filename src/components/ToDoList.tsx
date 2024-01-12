import {useForm} from "react-hook-form";
import { atom, useRecoilState, useRecoilValue } from "recoil";

interface IForm {
    toDo: string;
}


interface IToDo {
    text: string;
    id: number;
    category:"TO_DO"| "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});


function ToDoList() {
    const [toDos, setToDos] = useRecoilState(toDoState); 
    const {register, handleSubmit, setValue} = useForm<IForm>();

    const handleValid = ({toDo} : IForm) => {
        setToDos(oldToDos => [{text: toDo, id:Date.now(), category:"TO_DO"},...oldToDos])
        setValue("toDo", "");
    }

    return (<div> 
        <h1>To DOs</h1>
        <hr />
        < form onSubmit = {
        handleSubmit(handleValid)
    } > <input {
        ...register("toDo", {required: "내용을 적으세요."})
    }
    placeholder = "할일을 적으시오." /> <button> 추가</button></form>
    <ul>
        {toDos.map(toDO => 
        <li key={toDO.id}>{toDO.text}</li>)}
    </ul>
    </div>);
}

export default ToDoList;