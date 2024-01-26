import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{isDragging : boolean}>`
    background-color: ${(props) => props.isDragging ? "#e77f679e" :  props.theme.cardColor};
    box-shadow: ${prop => 
    prop.isDragging ? "0px 5px 5px rgba(0,0,0,0.4)" : "none"};
    margin-bottom: 5px;
    padding: 10px 10px;
    border-radius: 5px;
`;

interface IDraggableCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
}

function DragabbleCard({toDoId, toDoText, index}:IDraggableCardProps) {
    return (
    <Draggable draggableId={toDoId + ""} index={index}>
        {(magic, snapshot) => (
            <Card 
            isDragging={snapshot.isDragging}
                ref={magic.innerRef} 
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}
                >
            {toDoText}
        </Card>
        )}
    </Draggable>
    );
}
//React.memo = prop이 변하지 않으면 쓸데 없는 렌더링을 방지함 
export default React.memo(DragabbleCard);