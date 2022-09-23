import React from "react";
import { Draggable } from "react-beautiful-dnd";

function ListComp(props) {
  const { list, index } = props;
  return (
    <Draggable key={list.id} draggableId={list.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          className="p-5  m-2 border border-cyan-400"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {list.label}
        </div>
      )}
    </Draggable>
  );
}

export default ListComp;
