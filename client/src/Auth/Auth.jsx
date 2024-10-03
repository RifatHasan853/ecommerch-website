import { useState } from "react";
import Login from "./Login";
import Register from "./REgister";


export const Auth = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-gray-200 to-blue-200">
      <div
        className={`relative bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-[900px] min-h-[550px] transition-all duration-700 ease-in-out transform ${
          isActive ? "" : ""
        }`}
      >
        {/* Sign In Form */}
        <div
          className={`absolute top-0 h-full w-full md:w-1/2 transition-all duration-700 ease-in-out transform ${
            isActive ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
          }`}
        >
          <Login />
        </div>

        {/* Sign Up Form */}
        <div
          className={`absolute top-0 h-full w-full md:w-1/2 transition-all duration-700 ease-in-out transform ${
            isActive ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <Register />
        </div>

        {/* Overlay Section */}
        <div
          className={`absolute top-0 left-0 w-full h-full bg-red-500 text-white transition-all duration-700 ease-in-out transform ${
            isActive ? "translate-x-0" : "translate-x-1/2"
          }`}
        >
          <div className="flex flex-col justify-center items-center h-full text-center px-10">
            <h1 className="text-3xl font-bold">
              {isActive ? "Welcome Back!" : "Hello, Friend!"}
            </h1>
            <p className="mt-5 text-sm md:text-base">
              {isActive
                ? "Enter your personal details to continue your journey with us."
                : "Register with your personal details and start your journey with us."}
            </p>
            <button
              className="mt-10 py-2 px-6 bg-white text-red-500 font-semibold rounded-md shadow-md"
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
