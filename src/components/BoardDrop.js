import React, { useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDrop } from "react-dnd";

function BoardDrop(props) {
  const { contentsDropped, setContentsDropped,componentArray } = props;
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "block",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    
  }));

  const addImageToBoard = (id) => {
    let content=contentsDropped
    console.log(id)
    const pictureList = componentArray.filter((picture) => id === picture.id);
    content.splice(pictureList.id-1, 0, pictureList[0])
    console.log(pictureList)
    setContentsDropped(content);
  };

  return (
    <div  className="h-screen m-2 border-2 w-1/3" ref={drop}>
      {contentsDropped.map((item, index) => {
        return <div>{item.component}</div>
      })}
    </div>
  );
}

export default BoardDrop;
