"use client";

import { useBearStore } from "@/store/Boardstore";
import { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
function Board() {
  const [board, getBoard, setBoardState, updatTodoInDB] = useBearStore(
    (state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updatTodoInDB,
    ]
  );
  useEffect(() => {
    getBoard();
  }, [getBoard]);
  // console.log(board);
  const handleOnDrageEnd = (result: DropResult) => {
    console.log(result);

    const { destination, source, type } = result;

    if (!destination) {
      return null;
    }

    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const reArangedColumnIs = new Map(entries);
      setBoardState({ ...board, columns: reArangedColumnIs });
    }
    //this step is need a number not id from dnd
    const columns = Array.from(board.columns);
    const startcolumnindex = columns[Number(source.droppableId)];
    const finishcolumnindex = columns[Number(destination.droppableId)];

    const startColumn: Column = {
      id: startcolumnindex[0],
      todos: startcolumnindex[1].todos,
    };
    const finishColumn: Column = {
      id: finishcolumnindex[0],
      todos: finishcolumnindex[1].todos,
    };
    // console.log(startColumn, finishColumn);
    if (!startColumn || !finishColumn) return;
    if (startColumn === finishColumn && source.index === destination.index)
      return;
    const newTodos = startColumn.todos;
    const [movedTodos] = newTodos.splice(source.index, 1);
    if (startColumn.id === finishColumn.id) {
      // from the column to the same column
      newTodos.splice(destination.index, 0, movedTodos);
      const newCol = {
        id: startColumn.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startColumn.id, newCol);
      setBoardState({ ...board, columns: newColumns });
    } else {
      // from the column to the other column
      const finishTodos = Array.from(finishColumn.todos);

      finishTodos.splice(destination.index, 0, movedTodos);
      const newCol = {
        id: startColumn.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startColumn.id, newCol);
      newColumns.set(finishColumn.id, {
        id: finishColumn.id,
        todos: finishTodos,
      });
      //update the db
      updatTodoInDB(movedTodos, finishColumn.id);

      setBoardState({ ...board, columns: newColumns });
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDrageEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
