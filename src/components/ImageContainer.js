import React, { useEffect, useState } from "react";

function ImageContainer(props) {
  const { img, setImg, type, propss } = props;
  console.log(propss);

  return (
    <div className="p-5">
      {propss ? (
        <img
        id="img"
          src={propss.link}
          width={propss.width}
          height={propss.height}
          alt="img"
        />
      ) : (
        <div>image component</div>
      )}
    </div>
  );
}

export default ImageContainer;
