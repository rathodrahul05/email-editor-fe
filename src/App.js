import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Content from "./components/Content";
import EmailEditors from "./components/EmailEditor";
import SideBar from "./components/SideBar";

import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import gjsplugin from 'grapesjs-preset-webpage';
import gjsform from 'grapesjs-plugin-forms';
import gjsNav from 'grapesjs-navbar';
import gjsExport from 'grapesjs-plugin-export'

function App() {
  const lists = [
    { id: 1, label: "name", type: "text", isSelected: false },
    { id: 2, label: "email", type: "email", isSelected: false },
    { id: 3, label: "phone", type: "number", isSelected: false },
    { id: 4, label: "image", type: "file", isSelected: false },
  ];

 const [editor,setEditor]=useState(null);
 
  const [comps, setComps] = useState(lists);
  const [contents, setContents] = useState([]);
  const handleDragEnd = (result) => {
    console.log(result);
    const { destination, source } = result;

    if (!destination) {
      return;
    }
    if (!source) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }

    let add;
    let list = comps;
    let content = contents;

    if (source.droppableId === "comp") {
      add = list[source.index];
    } else {
      add = content[source.index];
      content.splice(source.index, 1);
    }

    if (destination.droppableId === "comp") {
      list.splice(destination.index, 0, add);
    } else {
      // let a = contents.find((cont) => {
      //   return add.label == cont.label;
      // });

      // if (!a) {
      content.splice(destination.index, 0, add);
      // }
    }

    console.log(content);
    // setComps(list);
    setContents(content);
  };

  useEffect(()=>{
    const editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: '#editor',
      plugins: [gjsplugin,gjsform,gjsNav,gjsExport],
      pluginsOpts: {
        gjsplugin:{},
        gjsform:{},
        gjsNav:{},
        gjsExport:{}
      },
      
    });
    setEditor(editor)

  },[])
  
  return (
//     <div>
//       <div id="editor">
// <h1 >welcome</h1>
//       </div>

//     </div>
    <>
      <EmailEditors />
    </>
    // <div className="flex">
    //   <DragDropContext onDragEnd={handleDragEnd}>
    //     <SideBar comps={comps} setComps={setComps} />
    //     <Content contents={contents} setContents={setContents} />
    //   </DragDropContext>
    // </div>
   
  );
}

export default App;
