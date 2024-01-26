import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";
import { IToDo, toDoState } from "../atom";
import { useSetRecoilState } from "recoil";

interface IBoardProps {
    toDos : IToDo[];
    boardId : string;
};


const Title = styled.h3`
    text-align  : center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
    color: #dfe6e9;
    text-shadow: -1px 0 #000, 1px 0 #000, 1px 0 #000, -1px 0 #000,;
`;

const Wrapper = styled.div`
    padding: 20px 0px 0px 0px ;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
`;

interface IAreaProps {
    isDraggingFromThis : boolean;
    isDraggingOver: boolean;
}

const Form = styled.form`
    width  : 100%;
    input {
        width: 100%;
        border-top: none;
        border-left: none;
        border-right: none;
        background-color:#aaa69d;
        outline:none;
        margin-top: 15px;
        
    }
`;

const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? "#dfe6e9" : 
    props.isDraggingFromThis ? "#69121245" :"#aaa69d" };
    flex-grow: 1;
    transition: background-color .3s ease-in-out;
    padding: 20px;
    border-radius: 5px;
`;

interface IForm {
    toDo : string;
}

function Board({toDos, boardId}: IBoardProps){
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onvalid = ({toDo}:IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo,
        };
        setToDos((allBoards) => {
            return {
            ...allBoards,
            [boardId]: [newToDo, ...allBoards[boardId]],
            };
        });
        setValue("toDo", "");
    };

    return (
    <Wrapper>
        <Title>{boardId}</Title>
        <Form onSubmit={handleSubmit(onvalid)}>
            <input
            {...register("toDo", {required: true })}
            type="text"
            placeholder={` ${boardId}을(를) 추가하세요`} />
        </Form>
        <Droppable droppableId={boardId}>
            {(magic, info) => (
            <Area 
            isDraggingOver={info.isDraggingOver} 
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo,index) => (
                //draggableId와 key의 값은 같아야 한다
                <DragabbleCard 
                    key={toDo.id} 
                    index={index} 
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                />
                ))}
                {magic.placeholder}
            </Area>
            )}
        </Droppable>
    </Wrapper>
    );
}

export default Board;