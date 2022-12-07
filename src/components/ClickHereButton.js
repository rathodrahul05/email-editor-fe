import React from "react";
import { Button } from "@mui/material";

function ClickHereButton(props) {
  return (
    <div id="Button" className="flex justify-start  p-5 mt-1 text-xl">
      <Button variant="contained"> {props.props ? (
        <div dangerouslySetInnerHTML={{ __html: props.props }}></div>
      ) : (
        'Click Here to know more'
      )}</Button>
    </div>
  );
}

export default ClickHereButton;
