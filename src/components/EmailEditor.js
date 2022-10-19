import React, { useEffect, useRef, useState } from "react";

import EmailEditor from "react-email-editor";
import { design } from "../design";
import withAuth from "./Auth/withAuth";
import { useNavigate } from "react-router-dom";
import { Button, Fade, Menu, MenuItem } from "@mui/material";
var fileDownload = require("js-file-download");

const EmailEditors = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const ref1 = useRef(null);

  const exportHtml = (ext) => {
    ref1.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml", html);
      fileDownload(html, `htmlfile.${ext}`);
    });
    handleClose();
  };
  //
  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    ref1.current?.editor.loadDesign(design);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="flex justify-between ">
        <Button
          variant="contained"
          size="small"
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
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
          <MenuItem onClick={() => exportHtml("txt")}>.TXT</MenuItem>
          <MenuItem onClick={() => exportHtml("pdf")}>.PDF</MenuItem>
          <MenuItem onClick={() => exportHtml("jpeg")}>.JPEG</MenuItem>
        </Menu>

        <button
          className=" bg-orange-300 text-white p-2 m-2"
          onClick={() => {
            localStorage.removeItem("authToken");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
<div className="w-3/6">

      <EmailEditor
        ref={ref1}
        projectId={1}
        onReady={() => onLoad()}
        style={{ width: "50%" }}
        minHeight="1000px"
        />
        </div>
    </>
  );
};

export default withAuth(EmailEditors);
