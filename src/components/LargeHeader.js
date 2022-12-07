import React from "react";

function LargeHeader(props) {
  return (
    <>
      <div className="  bg-gray-200 p-5 justify-center ">
        <div id="largeHead">
          <div className="text-3xl">
            {props.props ? props.props.largeHead : 'Large Headline'}
          </div>
          {props.props?.buttonText?<button className="p-3 bg-black text-white"> {props.props.buttonText}</button>:
          <button className="p-3 bg-black text-white"> Click Here</button>}
        </div>
      </div>
    </>
  );
}

export default LargeHeader;
