import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useBearStore } from "@/store/Boardstore";
type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};
const idToColumnsText: {
  [key in TypedColumn]: string;
} = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

function Column({ id, todos, index }: Props) {
  const [searchstring] = useBearStore((state) => [state.searchString]);
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50 p-2 "
                }`}
              >
                <h2 className="flex justify-between font-bold text-xl">
                  {idToColumnsText[id]}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-2 text-sm font-normal">
                    {!searchstring
                      ? todos.length
                      : todos.filter((todo) =>
                          todo.title
                            .toLocaleLowerCase()
                            .includes(searchstring.toLocaleLowerCase())
                        ).length}
                  </span>
                </h2>
                <div className="space-y-2">
                  {todos.map((todo, index) => {
                    if (
                      searchstring &&
                      !todo.title
                        .toLocaleLowerCase()
                        .includes(searchstring.toLocaleLowerCase())
                    )
                      return null;
                    return (
                      <Draggable
                        key={todo.$id}
                        draggableId={todo.$id}
                        index={index}
                      >
                        {(provided) => (
                          <TodoCard
                            todo={todo}
                            index={index}
                            id={todo.$id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandlebleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  <div className="flex items-end justify-end p-2">
                    <button>
                      <PlusCircleIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
