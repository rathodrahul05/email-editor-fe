import React, { useEffect } from "react";
import Editor from "dnd-email-editor";
import EmailEditor from "react-email-editor";
import { design } from "../design";

function EmailEditors() {
  const ref = React.useRef(null);
  const ref1 = React.useRef(null);

  // useEffect(()=>{
   
  //   ref.current.editor.loadDesign(design);

  // },[design])
  const exportHtml = () => {
    ref.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml", html);
    });
  };
  // const exportHtml = () => {
  //   if (ref.current) {
  //     const html = ref.current.getHtml();
  //     const json = ref.current.getJson();
  //     console.log(html, json);
  //   }
  // };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    ref.current.editor.loadDesign(design);
    // ref1.current.editor.loadDesign(design);
  };
  const onLoad1= () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // ref.current.editor.loadDesign(design);
    ref1.current.editor.loadDesign(design);
  };

  const onReady = () => {
    // editor is ready
    console.log("onReady");
  };

  return (
    <>
      <button
        className="bg-neutral-500 text-blue-200 p-2 m-2"
        onClick={() => exportHtml()}
      >
        Genearte HTML
      </button>
      {/* <Editor ref={ref}/> */}
      <EmailEditor
        ref={ref}
        minHeight="1000px"
        onLoad={onLoad}
      
        // tools={{
        //   form: {
        //     enabled: true,
        //   },
        // }}
      />

<EmailEditor
        ref={ref1}
        minHeight="1000px"
        onLoad={onLoad1}
      
        // tools={{
        //   form: {
        //     enabled: true,
        //   },
        // }}
      />
    </>
  );
}

export default EmailEditors;
