import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";

interface IForm {
    toDo: string;
}


function ToDoList() {
    const { register, handleSubmit, setValue } = useForm<IForm>();

    const handleValid = (data:IForm) => {
        console.log('add to do', data.toDo)
        setValue("toDo", "");
    }


    return(
        <div>
            <form onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo",{
                    required: "내용을 적으세요.",
                })} placeholder="할일을 적으시오." />
                <button>추가</button>    
            
            </form>        
        </div>

    );
}

export default ToDoList;