import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase.utils";
import { SiMicrosoftoutlook } from "react-icons/si";
import { useMsal } from "@azure/msal-react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required("name is required"),

    email: yup
      .string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  })
  .required();

function Signup() {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      let response = await axios.post("http://localhost:9000/sign-up", data);

      if (response) {
        navigate("/");
        toast.success("User signed up Successfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
          transition: Slide,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Some error happened", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
        transition: Slide,
      });
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    const UserCredentialImpl = await signInWithPopup(auth, provider);

    const { accessToken, displayName, email } = UserCredentialImpl?.user;
    const userData = {
      name: displayName,
      email,
      password: email,
    };

    try {
      let response = await axios.post(
        "http://localhost:9000/social-sign-up",
        userData
      );

      if (response) {
        localStorage.setItem("authToken", JSON.stringify(accessToken));
        // navigate('/')
        toast.success("User signed up Successfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
          transition: Slide,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
        transition: Slide,
      });
    }
    navigate("/dashboard");
  };
  const handleOutLook = async () => {
    const userInfo = await instance.loginPopup({ prompt: "select_account" });
    const { accessToken } = userInfo;
    const userData = {
      name: userInfo?.account.username,
      email: userInfo?.account.username,
      password: userInfo?.account.username,
    };

    try {
      let response = await axios.post(
        "http://localhost:9000/social-sign-up",
        userData
      );

      if (response) {
        localStorage.setItem("authToken", JSON.stringify(accessToken));
        // navigate('/')
        toast.success("User signed up Successfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
          transition: Slide,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
        transition: Slide,
      });
    }
  };
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Register Yourself
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to={"/"}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Already Registered? Login
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                {...register('name')}
                type="text"
                autoComplete="name"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Name"
              />
              <small className="text-red-500">{errors.name?.message}</small>
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                {...register('email')}
                type="email"
                autoComplete="email"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
              <small className="text-red-500">{errors.email?.message}</small>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                {...register('password')}
                type="password"
                autoComplete="current-password"
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
              <small className="text-red-500">{errors.password?.message}</small>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign Up
            </button>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center  mx-4 mb-0">Or continue with</p>
            </div>
            <div className="flex  justify-center space-x-5 ">
              <Button
                variant="outlined"
                color="inherit"
                sx={{ width: "135px", height: "40px", color: "gray" }}
                onClick={googleSignIn}
              >
                {/* Google */}
                <svg
                  className="h-6 w-6 "
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokelinecapcap="round"
                  strokelinecapjoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M17.788 5.108A9 9 0 1021 12h-8" />
                </svg>
                &nbsp;Google
              </Button>

              <Button
                variant="outlined"
                color="inherit"
                onClick={handleOutLook}
                sx={{ width: "135px", height: "40px", color: "gray" }}
              >
                {/* <!-- Twitter --> */}
                <SiMicrosoftoutlook /> &nbsp; Outlook
              </Button>

              <Button
                variant="outlined"
                color="inherit"
                sx={{ width: "135px", height: "40px", color: "gray" }}
              >
                {/* <!-- Linkedin --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-4 h-4"
                >
                  {/* <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                  <path
                    fill="currentColor"
                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
