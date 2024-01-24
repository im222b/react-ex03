import { DragDropContext, DropResult, } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atom";
import Board from "./Components/Board";

const Wrapper =styled.div `
  display: flex;
  max-width: 650px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap:10px;
  grid-template-columns: repeat(3, 1fr);
`;






function App() {
  const [ toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = (info:DropResult) => {
    const {destination, draggableId, source} = info;
    if(!destination) return;
    if(destination?.droppableId === source.droppableId){
      //보드간에 변동이 없을떄
      setToDos((allBoards) => {
      const boardCopy = [...allBoards[source.droppableId]]
      //기존것을 삭제   클릭한 지점 , 하나를 지운다
      boardCopy.splice(source.index, 1);
      //변경된것을 추가    변경할 위치, 지우지 않음 , 저장할 위치
      boardCopy.splice(destination?.index, 0, draggableId);
      return {
        ...allBoards,
        [source.droppableId] : boardCopy
      };
    });
    }
    if(destination.droppableId !== source.droppableId){
      // 보드 간 움직임
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0 , draggableId);
        return {
          ...allBoards,
          [source.droppableId]:sourceBoard,
          [destination.droppableId]:destinationBoard,
        }
      })
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <Wrapper>
      <Boards>
        {Object.keys(toDos).map(boardId => 
        <Board  boardId={boardId} key={boardId} toDos={toDos[boardId]} />)}
      </Boards>
    </Wrapper>
    </DragDropContext>
);
}
  
export default App;
