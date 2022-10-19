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
    setImg,editor,setEditor,obj,setObj
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
      console.log(ref.current);
      uuidLcl.current = item?.uuid;

      console.log(item);
      console.log(event.target.innerHTML);
      // if(item?.id){

      //    setElemCount(document.getElementById(item.id).children.length)
      //   }
      if (!open) {
        // setImg(null)
        setIsEdit(false);
        setDrawerState({ ...drawerState, [anchor]: open });
        return;
      }
      setEState(event.target);
      const main = event.target.innerText;
      console.log(main);
      setText(main);
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

  // const obj = {
  // "abc-abc1-aas-smk-aks":{text:'',width:'',height:''}
  //   'asd-rer-sdsd-asdad-adad': <p>heder</p>,
  //   'fdf-dfd-dfdf-dfdfd-fdfd': <p>App bar</p>
  // }


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
