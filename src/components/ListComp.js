import React from "react";
import { Draggable } from "react-beautiful-dnd";

function ListComp(props) {
  const { list, index } = props;
  return (
    <Draggable key={list.id} draggableId={list.randomId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          className="p-5 w-24 h-20 flex  m-2 border border-cyan-400"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {list.label}
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}

export default ListComp;
