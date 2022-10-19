import React from "react";

function NavBar(props) {
  console.log(props);

  return (
    <div
      id={"nav"}
      className="flex justify-between p-5 bg-slate-600 text-white"
    >
      <img
        src={
          props?.props?.link
            ? props?.props?.link
            : "https://cdn.logo.com/hotlink-ok/logo-social.png"
        }
        width={50}
        height={30}
        alt="logo"
      />
      <ul className="flex space-x-5">
        <li>Home</li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>
    </div>
  );
}

export default NavBar;
