import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";

/*function ToDoList() {
    const [toDo, setToDo] = useState("");
    const [toDoError, setToDoError] = useState("");
    const onChange = (event:React.FormEvent<HTMLInputElement>) => {
        const { currentTarget : { value } } = event;
        setToDoError("");
        setToDo(value);
    };
    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(toDo.length < 10) {
            return setToDoError ("10글자를 넘겨야 합니다");
        }
        console.log("submit"); 
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={toDo} placeholder="할일을 적으시오" />
                <button> 추가 </button>
                {toDoError !== "" ? toDoError : null};
            </form>
        </div>

    );
}*/

interface Ifrom {
    email:string;
    firstname:string;
    lastname:string;
    username:string;
    password:string;
    password1:string;
}

function ToDoList() {
    const { register,handleSubmit,formState:{errors} } = useForm<Ifrom>(
        {
            defaultValues: {
                email : "@naver.com",
            }
        }
    );
    const onValid = (data:any) => {
        console.log(data)
    }

    return(
        <div>
            <form 
            style={{display: "flex", flexDirection: "column"  }}
            onSubmit={handleSubmit(onValid)}>
                <input {...register("email",{ 
                    required:"메일 주소를 확인하세요.", 
                    pattern:{
                        value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                        message: "네이버 메일만 사용 가능합니다.",
                    } 
                    })} placeholder="이메일" />
                    <span>{errors?.email?.message as string}</span>
                <input {...register("firstname",{ required:"성을 입력하시오." })} placeholder="성" />
                <span>{errors?.firstname?.message as string}</span>
                <input {...register("lastname",{ required:"이름을 입력하시오." })} placeholder="이름" />
                <span>{errors?.lastname?.message as string}</span>
                <input {...register("usename",{ required:"닉네임을 입력하시오.", minLength: {
                    value :10, message: "10글자 이상이여야 합니다." }})} placeholder="닉네임" />
                <span>{errors?.usename?.message as string}</span>
                <input {...register("password",{ required:"비번을 입력하시오." })} placeholder="비번" />
                <span>{errors?.password?.message as string}</span>
                <input {...register("password1",{ required:"비번을 입력하시오", minLength: {
                    value : 5, message: "비밀번호가 5글자 이상이여야 합니다.",
                } })} placeholder="비번1" />
                <span>{errors?.password1?.message as string}</span>
                <button> 추가 </button>
            </form>
        </div>

    );
}

export default ToDoList;