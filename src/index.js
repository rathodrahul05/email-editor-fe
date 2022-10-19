import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import { msalInstance } from "../src/services/msal";
import { MsalProvider } from "@azure/msal-react";

import EmailEditors from "./components/EmailEditor";
import Dashboard from "./components/Dashboard";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ToastContainer />
    <BrowserRouter>
   
    <MsalProvider instance={msalInstance}>
        <Routes>
          <Route  path="/" element={<App/>} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </MsalProvider>
     
      
    </BrowserRouter>
  
  </>
);

//

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
