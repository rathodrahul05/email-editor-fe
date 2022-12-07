import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";

import Footer from "./Footer";
import Header from "./Header";
import LargeHeader from "./LargeHeader";
import NavBar from "./NavBar";
import { SiFacebook, SiInstagram, SiTwitter } from "react-icons/si";

const compArray = [
  {
    id: "nav",
    component: (props = null) => (
      <NavBar props={props} />
      // <AppBar id="nav" position="static">
      //   <Toolbar>
      //     <IconButton
      //       size="large"
      //       edge="start"
      //       color="inherit"
      //       aria-label="menu"
      //       sx={{ mr: 2 }}
      //     >
      //       <MenuIcon />
      //     </IconButton>
      //     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      //     {props?  <div dangerouslySetInnerHTML={{ __html: props }}></div>:'News'}
      //     </Typography>
      //     <Button color="inherit">{props?  <div dangerouslySetInnerHTML={{ __html: props }}></div>:'Login'}</Button>
      //   </Toolbar>
      // </AppBar>
    ),
  },
  {
    id: "largeHead",
    component: (props = null) => <LargeHeader props={props} />,
  },

  {
    id: "head",
    component: (props = null) => {
      return (
        
          <Header props={props} />
       
      );
    },
    // {

    //   return (
    //     <div id="head" className="flex justify-center  bg-white  p-5  text-xl">
    //       {props ? (
    //         <div dangerouslySetInnerHTML={{ __html: props }}></div>
    //       ) : (
    //        <div>Header</div>
    //       )}
    //     </div>
    //   );
    // },
  },

  {
    id: "maincontent",

    component: (props = null) => (
      <div
        id="maincontent"
        className="bg-gray-200"
        style={{
          padding: "20px 5px 20px 5px",
        }}
      >
        {props ? (
          <div dangerouslySetInnerHTML={{ __html: props }}></div>
        ) : (
          "Main content Lorem ipsum dolor sit amet, consectetur adipiscing elit Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available"
        )}
      </div>
    ),
  },
  {
    id: "footer",
    component: (props = null) => <Footer props={props} />,
    
  },
];
export default compArray;
