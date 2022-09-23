import React from "react";
import { Droppable } from "react-beautiful-dnd";
import ListComp from "./ListComp";

function SideBar(props) {
 const {comps}=props
  return (
    <div className="w-60 bg-slate-200">
      <Droppable droppableId="comp">
        {(provided) => (
          <div
            className="p-5"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {comps.map((list, index) => {
              return <ListComp key={list.id} list={list} index={index} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default SideBar;
