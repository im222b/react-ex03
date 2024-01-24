import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
    background-color: ${(props) => props.theme.cardColor};
    margin-bottom: 5px;
    padding: 10px 10px;
    border-radius: 5px;
`;

interface IDraggableCardProps {
    toDo: string;
    index: number;
}

function DragabbleCard({toDo, index}:IDraggableCardProps) {
    return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
        {(magic) => (
            <Card 
                ref={magic.innerRef} 
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}
                >
            {toDo}
        </Card>
        )}
    </Draggable>
    );
}
//React.memo = prop이 변하지 않으면 쓸데 없는 렌더링을 방지함 
export default React.memo(DragabbleCard);