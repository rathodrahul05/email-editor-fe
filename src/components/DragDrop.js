import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDrag, useDrop } from "react-dnd";
import Blocks from "./Blocks";

function DragDrop(props) {
  const { componentArray, setCompArray } = props;

  
  return (
    <div className="bg-red-200" style={{ width: "30%", margin: "10px" }}>
      {componentArray.map((item, index) => {
        return <Blocks item={item} index={index}/>;
      })}
    </div>
  );
}

export default DragDrop;
