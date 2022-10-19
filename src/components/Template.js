import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Draggable, Droppable } from "react-beautiful-dnd";
// import { useDrop } from "react-dnd";

import nextId from "react-id-generator";

function Template(props) {
  const { componentArray, setCompArray } = props;
  const [tempCompArr, setTemp] = useState(
    componentArray.map((item) => {
      return { ...item, randomId: nextId() };
    })
  );
console.log(tempCompArr)
  return (
    <div className="bg-red-200" style={{ width: "30%", margin: "10px" }}>
      <Droppable droppableId="comp">
        {(provided) => (
          <div
            className="p-5"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tempCompArr.map((item, index) => {
              return (
                <Draggable draggableId={item.randomId} key={index} index={index}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                     
                    >
                    {item.component()}
                      {provided.placeholder}
                    </Box>
                  )}
                </Draggable>
              );
            })}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Template;
