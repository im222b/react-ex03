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
    padding: 20px 10px 20px 10px ;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
`;

function Board({toDos, boardId}: IBoardProps){
    return (
    
    <Wrapper>
        <Title>{boardId}</Title>    
        <Droppable droppableId={boardId}>
            {(magic) => (
            <div ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo,index) => (
                //draggableId와 key의 값은 같아야 한다
                <DragabbleCard key={toDo} index={index} toDo={toDo} />
                ))}
                {magic.placeholder}
            </div>
            )}
        </Droppable>
    </Wrapper>
    );
}

export default Board;