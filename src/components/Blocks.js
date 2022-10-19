import { Box } from "@mui/material";
import React from "react";
import { useDrag } from "react-dnd";

function Blocks(props) {
  const { item, index } = props;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "block",
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return <Box ref={drag}>{item.component}</Box>;
}

export default Blocks;
