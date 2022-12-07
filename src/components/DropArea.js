import { Box, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TemporaryDrawer from "./RightDrawer";

function DropArea(props) {
  const idIndex = ["nav", "largeHead", "head", "maincontent", "footer"];
  const {
    contentsDropped,
    setContentsDropped,
    contents,
    componentArray,
    setCompArr,
    tempContent,
    setTempContent,
    img,
    setImg,
    editor,
    setEditor,
    obj,
    setObj,
  } = props;
  console.log(contentsDropped);

  const [text, setText] = useState("");
  const [id, setId] = useState("");
  const [eState, setEState] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [textHtml, setTextHtml] = useState("");
  const [elemCount, setElemCount] = useState(0);
  const uuidLcl = useRef("");
  const ref = useRef();

  // const [obj, setObj] = useState({});

  const [drawerState, setDrawerState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor, open, item = null) =>
    (event) => {
      uuidLcl.current = item?.uuid;
      

     
      if (item?.id == "nav") {
        if (event.target.parentElement.nodeName == "UL") {
         
          let sibling = event.target.parentNode.firstChild;
          let siblings = [];
        

          while (sibling) {
            siblings.push(sibling.innerText);
            sibling = sibling.nextSibling;
          }
          setImg({
            ...img,
            link: event.target.parentNode.parentNode.children[0]?.src,
            width: event.target.parentNode.parentNode.children[0]?.width,
            height: event.target.parentNode.parentNode.children[0]?.height,
            text1: siblings[0],
            text2: siblings[1],
            text3: siblings[2],
          });
        } else if(event.target.nodeName=='IMG') {
          console.log(event.target);
          let sibling = event.target.parentNode.children[1].firstChild;
          console.log(sibling)
          let siblings = [];
        

          while (sibling) {
            siblings.push(sibling.innerText);
            sibling = sibling.nextSibling;
          }
          setImg({
            ...img,
            link: event.target.src,
            width: event.target.width,
            height: event.target.height,
            text1: siblings[0],
            text2: siblings[1],
            text3: siblings[2],
          });

        }
        else{
          console.log(event.target.children[1]);
          let sibling = event.target.children[1].firstChild;
          console.log(sibling)
          let siblings = [];
        

          while (sibling) {
            siblings.push(sibling.innerText);
            sibling = sibling.nextSibling;
          }
          setImg({
            ...img,
            link: event.target.children[0].src,
            width: event.target.children[0].width,
            height: event.target.children[0].height,
            text1: siblings[0],
            text2: siblings[1],
            text3: siblings[2],
          });
         
        }
      }

      if (!open) {
        setIsEdit(false);
        setDrawerState({ ...drawerState, [anchor]: open });
        return;
      }

      if (item?.id == "img") {
        if (event.target.hasChildNodes()) {
          console.log(event.target.children[0]?.src);
          console.log(event.target.children[0]?.width);
          setImg({
            ...img,
            link: event.target.children[0]?.src,
            width: event.target.children[0]?.width,
          });
        } else {
          console.log(event.target);
          setImg({ ...img, link: event.target.src, width: event.target.width });
        }
      }
      

     
      setEState(event.target);
      const main = event.target.innerText;
      console.log(main);

      setText(main);
      console.log(event.target.innerHTML);
      setTextHtml(event.target.innerHTML);
      setId(item?.id);

      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setDrawerState({ ...drawerState, [anchor]: open });
    };

  useEffect(() => {
    console.log(eState);
  }, [eState]);
  return (
    <>
      <Droppable droppableId="content">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="h-screen m-2  w-1/3 border-2"
          >
            {contentsDropped.length > 0 ? (
              contentsDropped.map((item, index) => {
                return (
                  <Draggable
                    key={index}
                    draggableId={index.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        // onClick={toggleDrawer("right", true,item)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          ref={ref}
                          className="hover:border-2 border-dashed border-black"
                          onClick={toggleDrawer("right", true, item)}
                        >
                          {item.component(obj[item.uuid])}
                        </div>
                        {provided.placeholder}
                      </Box>
                    )}
                  </Draggable>
                );
              })
            ) : (
              <div className="text-xl flex justify-center">
                Drop a block onto this surface to get started!
              </div>
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <TemporaryDrawer
        text={text}
        drawerState={drawerState}
        setDrawerState={setDrawerState}
        toggleDrawer={toggleDrawer}
        setText={setText}
        id={id}
        contentsDropped={contentsDropped}
        setContentsDropped={setContentsDropped}
        eState={eState}
        tempContent={tempContent}
        setTempContent={setTempContent}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        textHtml={textHtml}
        setTextHtml={setTextHtml}
        elemCount={elemCount}
        setElemCount={setElemCount}
        img={img}
        setImg={setImg}
        obj={obj}
        setObj={setObj}
        uuid={uuidLcl.current}
        editor={editor}
        setEditor={setEditor}
      />
    </>
  );
}

export default DropArea;
