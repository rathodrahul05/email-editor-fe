import React from "react";

function Header(props) {
  return (
    <div id="head" className="flex justify-center  bg-white  p-5  text-xl">
      {props.props ? (
        <div dangerouslySetInnerHTML={{ __html: props.props }}></div>
      ) : (
        "Header"
      )}
    </div>
  );
}

export default Header;
