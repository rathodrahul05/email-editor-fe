import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import uuid from "react-uuid";
import SideBar from "./SideBar";

import Template from "./Template";
import DropArea from "./DropArea";

import compArray from "./ComponentArray";

import Header from "./Header";
import { Button } from "@mui/material";

import ClickHereButton from "./ClickHereButton";
import ImageContainer from "./ImageContainer";
import withAuth from "./Auth/withAuth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [img, setImg] = useState({
    link: "",
    width: "",
    height: "",
  });

  const lists = [
    {
      id: "head",
      label: "Header",
      component: (props) => <Header id="head" props={props} />,
      type: "text",
      isSelected: false,
    },

    {
      id: "img",
      label: "image",
      component: (propss) => (
        <ImageContainer
          img={img}
          setImg={setImg}
          type={"file"}
          propss={propss}
        />
      ),
      type: "file",
      isSelected: false,
    },
    {
      id: "Button",
      label: "button",
      component: (props) => <ClickHereButton />,
      type: "submit",
      isSelected: false,
    },
  ];

  const [editor, setEditor] = useState("");
  const [idx, setIdx] = useState("");

  const [comps, setComps] = useState(lists);
  const [componentArray, setCompArray] = useState(compArray);

  const [contentsDropped, setContentsDropped] = useState([]);
  const [tempContent, setTempContent] = useState(contentsDropped);
  const [obj, setObj] = useState({});
  const [contents, setContents] = useState([]);

  const handleDragEnd1 = (result) => {
    console.log(result);
    const { destination, source } = result;
    console.log(componentArray[source.index].component());
    setIdx(source.index);

    if (!destination) {
      console.log("new");
      return;
    }
    if (!source) {
      console.log("new");
      return;
    }
    if (source.droppableId == "content" && destination.droppableId == "comp1") {
      console.log("new");

      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      source.droppableId == "comp"
    ) {
      console.log("new");
      return;
    }
    if (
      destination.droppableId == source.droppableId &&
      source.droppableId == "content"
    ) {
      console.log("new");
      console.log(tempContent);
      // setContentsDropped(tempContent)
      // return
    }
    let add = "";

    let list = componentArray;
    let list1 = comps;

    let content = contentsDropped;

    if (source.droppableId === "comp") {
      add = list[source.index];
      add = { ...add, uuid: uuid() };
    } else if (source.droppableId !== "comp1") {
      add = content[source.index];

      content.splice(source.index, 1); //removing items from drop area
    }

    if (destination.droppableId === "comp") {
      // list.splice(destination.index, 0, add); //reverse from drop area to template area
    } else if (add) {
      console.log(contentsDropped);
      content.splice(destination.index, 0, add); //from template to drop area
    }
    if (
      source.droppableId == "comp1" &&
      destination.droppableId === "content"
    ) {
      add = list1[source.index];
      add = { ...add, uuid: uuid() };
      content.splice(destination.index, 0, add);
    }

    // else if (source.droppableId=='content' && destination.droppableId=='comp1') {

    // }
    console.log(content);
    setCompArray(list);
    setContentsDropped(content);
    setTempContent(content);
    // setObj({ ...obj });

    // setContents(content1);
    // setComps(list1);
  };

  const genHTML = () => {
    console.log(contentsDropped[0].component());

    const temp = "";
    let a = "";
    for (let index = 0; index < contentsDropped.length; index++) {
      const element = contentsDropped[index].id;
      console.log(element);
      console.log(
        contentsDropped[index].component(obj[contentsDropped[index].uuid])
      );
      let style = contentsDropped[index].component(
        obj[contentsDropped[index].uuid]
      ).props.style;

      // console.log(contentsDropped[index].component(obj[contentsDropped[index].uuid]).type(obj[contentsDropped[index].uuid]));
      if (
        contentsDropped[index].component(obj[contentsDropped[index].uuid]).props
          .children
      ) {
        const temp1 = `<div style=${style} className={
        ${
          contentsDropped[index].component(obj[contentsDropped[index].uuid])
            .props.className
        }
      }
     
    >${
      contentsDropped[index].component(obj[contentsDropped[index].uuid]).props
        .children.props.dangerouslySetInnerHTML.__html
    }</div>`;
        console.log(temp1);
      } else {
        const temp = `<div className=''>${contentsDropped[index].component(obj[contentsDropped[index].uuid])}</div>`;

        console.log(temp);
      }

      // console.log(document.getElementById(element.id).outerHTML)
    }
  };
  return (
    <>
      <div className="flex justify-between m-2">
        <Button variant="contained" onClick={() => genHTML()}>
          Generate HTML
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            localStorage.removeItem("authToken");
            navigate("/");
          }}
        >
          Logout
        </Button>
      </div>
      <div className="flex ">
        {/* <Login /> */}
        <DragDropContext onDragEnd={handleDragEnd1}>
          <Template
            componentArray={componentArray}
            setCompArray={setCompArray}
          />

          <DropArea
            contentsDropped={contentsDropped}
            setContentsDropped={setContentsDropped}
            contents={contents}
            componentArray={componentArray}
            setCompArray={setCompArray}
            tempContent={tempContent}
            setTempContent={setTempContent}
            img={img}
            setImg={setImg}
            editor={editor}
            setEditor={setEditor}
            obj={obj}
            setObj={setObj}
          />

          <SideBar comps={comps} setComps={setComps} />
        </DragDropContext>
      </div>
    </>
  );
}

export default withAuth(Dashboard);
