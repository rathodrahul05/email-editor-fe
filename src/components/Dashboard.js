import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import uuid from "react-uuid";
import SideBar from "./SideBar";

import Template from "./Template";
import DropArea from "./DropArea";

import compArray from "./ComponentArray";

import Header from "./Header";
import { Button, Fade, Menu, MenuItem } from "@mui/material";

import ClickHereButton from "./ClickHereButton";
import ImageContainer from "./ImageContainer";
import withAuth from "./Auth/withAuth";
import { useNavigate } from "react-router-dom";
import fileDownload from "js-file-download";

function Dashboard() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [img, setImg] = useState({
    link: "",
    width: "",
    height: "",
    text1: "",
    text2: "",
    text3: "",
    file: "",
    largeHead:"",
    buttonText:""
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
      component: (props) => <ClickHereButton props={props} />,
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

  const genHTML = (ext) => {
    console.log(contentsDropped[0].component());

    let finalTemp = "";
    console.log(contentsDropped)

    for (let index = 0; index < contentsDropped.length; index++) {
      const element = contentsDropped[index].id;
      const pointer = contentsDropped[index].component(
        obj[contentsDropped[index].uuid]
      );
console.log(pointer)
      let style = contentsDropped[index].component(
        obj[contentsDropped[index].uuid]
      ).props.style;

      if (pointer.props.children) {
        const temp1 = `<div style=${style} className='
        ${pointer.props.className}'>${pointer.props.children.props.dangerouslySetInnerHTML.__html}</div>`;
        console.log(temp1);
        finalTemp = finalTemp.concat(temp1);
      } else {
        if (element == "nav") {
          console.log(pointer);
          const temp = ` <div
          id={"nav"}
          className="flex justify-between p-5 bg-slate-600 text-white"
        >
          <img
            src='${pointer.props.props.link}'
            width={50}
            height={30}
            alt="logo"
          />
          <ul className="flex space-x-5">
            <li>${
              pointer.props.props.text1 ? pointer.props.props.text1 : "Home"
            }</li>
            <li>${
              pointer.props.props.text2 ? pointer.props.props.text2 : "About Us"
            }</li>
            <li>${
              pointer.props.props.text3 ? pointer.props.props.text3 : "Contact"
            }</li>
          </ul>
        </div>`;
          finalTemp = finalTemp.concat(temp);
        }
        if (element == "head") {
          const temp = `<div className="flex justify-center  bg-white  p-5  text-xl">${
            pointer.props.props ? pointer.props.props : "Header"
          }</div>`;

          console.log(temp);
          finalTemp = finalTemp.concat(temp);
        }
        if (element == "footer") {
          const temp = `<div id="footer" className="  bg-gray-500 p-5 mt-0 ">
          <div className="flex justify-center text-xl ">
          ${pointer.props.props}
          </div>
          <div className="flex justify-center space-x-5 mt-5">
            <div className="flex justify-center">
            <SiFacebook size={"25px"} />
            </div>
             
            <div className="flex justify-center">
              <SiInstagram size={"25px"} />
            </div>
            <div className="flex justify-center">
              <SiTwitter size={"25px"} />
            </div>
          </div>
        </div>`;
          console.log(temp);
          finalTemp = finalTemp.concat(temp);
        }
        if (element == "img") {
          console.log(pointer);
          const temp = `<img
          id="img"
            src=${
              pointer.props.propss.link
                ? pointer.props.propss.link
                : pointer.props.propss.file
            }
            width=${pointer.props.propss.width}
            height=${pointer.props.propss.height}
            alt="img"
          />`;
          finalTemp = finalTemp.concat(temp);
        }
      }

      // console.log(document.getElementById(element.id).outerHTML)
      console.log(finalTemp);
    }

    console.log(finalTemp);
    fileDownload(finalTemp, `htmlfile.${ext}`);
  };

  return (
    <>
      <div className="flex justify-between m-2">
        <Button variant="contained" onClick={handleClick}>
          Generate HTML
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={() => genHTML("txt")}>.TXT</MenuItem>
          <MenuItem onClick={() => genHTML("pdf")}>.PDF</MenuItem>
          <MenuItem onClick={() => genHTML("jpeg")}>.JPEG</MenuItem>
        </Menu>
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
