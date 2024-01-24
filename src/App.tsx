import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atom";

const Wrapper =styled.div `
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px 20px 10px ;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 5px;
  padding: 10px 10px;
  border-radius: 5px;
`;


function App() {
  const [ toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = ({draggableId, destination, source}:DropResult) => {
    //변경하지 않으면 원래대로
    if (!destination) return;

    setToDos(oldToDos => {
      const ToDosCopy = [...oldToDos];
      //기존것을 삭제   클릭한 지점 , 하나를 지운다
      ToDosCopy.splice(source.index, 1);
      //변경된것을 추가    변경할 위치, 지우지 않음 , 저장할 위치
      ToDosCopy.splice(destination?.index, 0, draggableId);
      return ToDosCopy;
    })
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <Wrapper>
      <Boards>
      <Droppable droppableId="one">
        {(magic) => 
        <Board ref={magic.innerRef} {...magic.droppableProps}>
          {toDos.map((toDo,index) => (
            //draggableId와 key의 값은 같아야 한다
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
          ))}
            {magic.placeholder}
        </Board>}
      </Droppable>
      </Boards>
    </Wrapper>
    </DragDropContext>
);
}
  
export default App;
