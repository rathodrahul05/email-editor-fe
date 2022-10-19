import React, { useEffect, useState, PropTypes } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import RichTextEditor from "react-rte";
import Parser from "html-react-parser";

import { IconButton, StepContext, TextField } from "@mui/material";
import { Close, SettingsRemote } from "@mui/icons-material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "italic", "underline"],
    [{ align: "justify" }],
    ["clean"],
  ],
};

function TemporaryDrawer(props) {
  const {
    text,
    drawerState,
    setDrawerState,
    toggleDrawer,
    setText,
    id,
    contentsDropped,
    setContentsDropped,
    eState,
    tempContent,
    setTempContent,
    isEdit,
    setIsEdit,
    textHtml,
    setTextHtml,
    elemCount,
    setElemCount,
    img,
    setImg,
    obj,
    setObj,
    uuid,editor,setEditor
  } = props;
  const [editorValue, setEditorValue] = useState(() =>
    RichTextEditor.createEmptyValue()
  );
  const [text1, setText1] = useState(text);
  const [toggle, setToggle] = useState(false);

  const [footer, setFooter] = useState({});

  const [iconImg, setIconImg] = useState({
    link: "",
   width:""
  });

  const handleChange = (value) => {
    // setEditorValue(() => value);
    // document.getElementById(id).children[0].innerText=value
    let count = 0;
    ++count;

    console.log(uuid);
    eState.innerHTML = value;
    // if (id=='footer') {
    //   const temp={...footer,text: eState.innerHTML}
    //   console.log(temp)

    // }
    setObj({ ...obj, [uuid]: eState.innerHTML });

    var doc = new DOMParser().parseFromString(value, "text/html");
    // eState.innerHTML = doc.firstChild.innerHTML;

    setText(value.toString());
    setText1(value);
    setToggle(!toggle);
    setEditor(editor.concat(obj[uuid]))
    // setText(value.toString());
  };
  useEffect(() => {
    console.log(obj[uuid])
  }, [obj]);
  const divs = () => {
    let temp = [];
    for (let index = 0; index <= elemCount - 1; index++) {
      temp.push(
        !isEdit ? (
          <TextField
            multiline
            rows={4}
            sx={{ width: "85%" }}
            value={document.getElementById(id).children[index].innerText}
            onFocus={() => setIsEdit(true)}
          />
        ) : (
          <ReactQuill
            // defaultValue={document.getElementById(id).children[index].innerText}
            modules={modules}
            onChange={(value) => handleChange(value)}
            theme="snow"
          />
        )
      );
    }
    return temp;
  };
 
  const handleImgLink = (e) => {
    

    console.log(img);
    const temp = img;
    temp[e.target.name] = e.target.value;
    console.log(temp);
    // setObj({...obj,[uuid]:{...obj?.uuid,[e.target.name]:e.target.value}});
    setObj({ ...obj, [uuid]: temp });
    setImg({ ...img, [e.target.name]: e.target.value });
    setEditor(editor.concat(obj[uuid]))
  };
  console.log(tempContent);
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 500 }}
      role="presentation"
    >
      <div className="bg-gray-300 flex justify-between p-5">
        <span className="text-2xl">{id}</span>
        <IconButton onClick={toggleDrawer(anchor, false)}>
          <Close />
        </IconButton>
      </div>

      <div className="mx-5 my-2">
        {/* {divs().map((item)=>{
          return item
        })} */}
        {id == "img" && (
          <div>
            <TextField
              label="Image Url"
              sx={{ width: "85%", marginTop: "10px" }}
              name="link"
              value={img.link}
              onChange={handleImgLink}
            />
            <TextField
              label="width"
              sx={{ width: "85%", marginTop: "10px" }}
              name="width"
              value={img.width}
              onChange={handleImgLink}
            />

            <TextField
              label="height"
              sx={{ width: "85%", marginTop: "10px" }}
              name="height"
              value={img.height}
              onChange={handleImgLink}
            />
          </div>
        )}
        {id == "nav" && (
          <>
          <TextField
              label="Image Url"
              sx={{ width: "85%", marginTop: "10px" }}
              name="link"
              value={img.link}
              onChange={handleImgLink}
            />
          <TextField
            label="height"
            sx={{ width: "85%", marginTop: "10px" }}
            name="height"
            value={img.height}
            onChange={handleImgLink}
            />
            </>
        )}
        {/* {!isEdit && id == "footer" ? (
          <>
          <TextField
            label="Text"
            sx={{ width: "85%" }}
            value={text}
            onFocus={(e) => {
              setIsEdit(true);
            }}
          />
          <TextField
              label="Image Url"
              sx={{ width: "85%", marginTop: "10px" }}
              name="link1"
              value={iconImg.link1}
              onChange={handleImgLink}
              />
              </>


        ) : (
          id != "img" && (
            <ReactQuill
              defaultValue={textHtml}
              modules={modules}
              onChange={handleChange}
              theme="snow"
            />
          )
        )} */}
        {!isEdit && id != "img" &&id!='nav' ? (
          <TextField
            multiline
            rows={id == "img" ? 1 : 4}
            sx={{ width: "85%" }}
            value={id == "img" ? img : text}
            onFocus={(e) => {
              setIsEdit(true);
            }}
          />
        ) : (
          id != "img"&&id!='nav' && (
            <ReactQuill
              defaultValue={textHtml}
              modules={modules}
              onChange={handleChange}
              theme="snow"
            />
          )
        )}
      </div>
      <Divider />
      <List></List>
    </Box>
  );

  return (
    <div>
      {/* <Button onClick={toggleDrawer("right", true)}>right</Button> */}
      <Drawer
        anchor={"right"}
        open={drawerState["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
}

export default TemporaryDrawer;
