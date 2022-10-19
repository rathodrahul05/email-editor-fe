import React from "react";

function LargeHeader(props) {
  return (
    <>
      <div className="  bg-gray-200 p-5 justify-center ">
        <div id="largeHead">
          <div className="text-3xl">
            {props.props ? <div dangerouslySetInnerHTML={{ __html: props.props }}></div> : 'Large Headline'}
          </div>
          <button className="p-3 bg-black text-white">Click Here</button>
        </div>
      </div>
    </>
  );
}

export default LargeHeader;
