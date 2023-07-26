"use client";

import { XCircleIcon } from "@heroicons/react/24/solid";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

type props = {
  todo: Todo;
  index: number;
  id: string;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandlebleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({
  todo,
  index,
  id,
  innerRef,
  dragHandlebleProps,
  draggableProps,
}: props) {
  return (
    <div
      {...dragHandlebleProps}
      {...draggableProps}
      className="bg-white rounded-md "
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button className="text-red-500 hover:text-red-600">
          <XCircleIcon className="h-6 w-6 ml-5" />
        </button>
      </div>
    </div>
  );
}

export default TodoCard;
