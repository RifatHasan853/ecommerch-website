import { ToastContainer } from "react-toastify";
import Navigation from "../Auth/Navigation";
//import { Outlet } from "react-router";

import { Outlet } from "react-router-dom";
const Main = () => {
    return (
        <>
        <ToastContainer />
        <Navigation />
        <main className="py-3">
          <Outlet />
        </main>
      </>
    );
};

export default Main;