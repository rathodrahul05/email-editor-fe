import React, { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

function Content(props) {
  const { contents, setContents } = props;

  const [toggle, setToggle] = useState(false);
  const [img, setImg] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleBlur = (e, id) => {
    setContents(
      contents.map((content) => {
        if (content.id == id) {
          return { ...content, isSelected: true };
        } else {
          return content;
        }
      })
    );
  };
  const handleFile = (e, id) => {
    setImg(URL.createObjectURL(e.target.files[0]));
  };
 console.log('contents',contents.length)

  return (
    <>
      <div>
        <Droppable droppableId="content1">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="mx-10 w-96 h-max border border-cyan-600"
            >
              {contents.length !== 0 ? (
                contents.map((content, index) => {
                  return (
                    <Draggable
                      key={content.id}
                      draggableId={content.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div key={index}>
                          {!content.isSelected ? (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-5  m-2 ${
                                content.type != "file"
                                  ? "border-dashed border-2"
                                  : ""
                              } border-red-400`}
                            >
                              {content.type == "file" && img ? (
                                <img src={img} alt="img" className="w-52" />
                              ) : (
                                <input
                                  type={content.type}
                                  className="border border-cyan-900"
                                  placeholder={content.type}
                                  name={content.label}
                                  onChange={(e) => {
                                    content.type != "file"
                                      ? handleChange(e)
                                      : handleFile(e, content.id);
                                  }}
                                  // onBlur={(e) =>
                                  //   content.type != "file" &&
                                  //   handleBlur(e, content.id)
                                  // }
                                />
                              )}
                              {/* {content.type == "file" && (
                                <img src={img} alt="file" width={150} />
                              )} */}
                            </div>
                          ) : (
                            <div
                              className="p-3 text-xl"
                              ref={provided.innerRef}
                            >
                              <span>{content.label}</span>:{" "}
                              {data[content.label]}
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  );
                })
              ) : (
                <div className="flex justify-center">
                  <span className=" text-xl my-40">
                    Drag and drop the components here
                  </span>
                </div>
              )}
              {provided.placeholder}

              {/* {contents.length > 0 && (
              <button
                className="bg-blue-500 p-2 m-2"
                onClick={() => {
                  console.log(data);
                  setToggle(true);
                }}
              >
                Submit
              </button>
            )} */}
            </div>
          )}
        </Droppable>
      </div>
      {toggle && (
        <div className="w-96 h-96 border border-cyan-500 flex flex-col">
          <span>Name:{data?.name} </span>
          <span>Email:{data?.email}</span>
          <span>Phone:{data?.phone}</span>
          <span>Image:{data?.image}</span>
        </div>
      )}
    </>
  );
}

export default Content;
