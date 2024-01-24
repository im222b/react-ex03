import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";

interface IBoardProps {
    toDos : string[];
    boardId : string;
};


const Title = styled.h2`
    text-align  : center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;

const Wrapper = styled.div`
    padding: 20px 5px 20px 5px ;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
`;

interface IAreaProps {
    isDraggingFromThis : boolean;
    isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? "#dfe6e9" : 
    props.isDraggingFromThis ? "#b2bec3" :"#aaa69d" };
    flex-grow: 1;
    transition: background-color .3s ease-in-out;
    padding: 20px;
    border-radius: 5px;
`;

function Board({toDos, boardId}: IBoardProps){
    return (
    
    <Wrapper>
        <Title>{boardId}</Title>    
        <Droppable droppableId={boardId}>
            {(magic, info) => (
            <Area 
            isDraggingOver={info.isDraggingOver} 
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo,index) => (
                //draggableId와 key의 값은 같아야 한다
                <DragabbleCard key={toDo} index={index} toDo={toDo} />
                ))}
                {magic.placeholder}
            </Area>
            )}
        </Droppable>
    </Wrapper>
    );
}

export default Board;