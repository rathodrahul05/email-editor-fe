import { fontFamily } from "@mui/system";
import React from "react";
import { SiFacebook, SiInstagram, SiTwitter } from "react-icons/si";

function Footer(props) {
  console.log(props)
  return (
    <div id="footer" className="  bg-gray-500 p-5 mt-0 ">
      <div className="flex justify-center text-xl ">
      {props.props? (
        <div dangerouslySetInnerHTML={{ __html: props.props}}></div>
      ) : (
       'Follow us on'
      )}
      </div>
      <div className="flex justify-center space-x-5 mt-5">
        <div className="flex justify-center">
        <SiFacebook size={"25px"} />
        </div>
         
        <div className="flex justify-center">
          <SiInstagram size={"25px"} />
        </div>
        <div className="flex justify-center">
          <SiTwitter size={"25px"} />
        </div>
      </div>
    </div>
  );
}

export default Footer;
