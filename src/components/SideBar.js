import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import ListComp from "./ListComp";
import nextId from "react-id-generator";

function SideBar(props) {
  const { comps, setComps } = props;
  const [tempCompArr, setTemp] = useState(
    comps.map((item) => {
      return { ...item, randomId: nextId() };
    })
  );
  console.log(comps);
  return (
    <div className="w-1/3 bg-slate-200">
      <Droppable droppableId="comp1">
        {(provided) => (
          <div
            className="p-5 flex"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tempCompArr.map((list, index) => {
              return <ListComp key={list.id} list={list} index={index} />
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default SideBar;
