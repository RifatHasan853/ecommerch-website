import { useContext, useState } from "react";
import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineLogin,
    AiOutlineUserAdd,
    AiOutlineShoppingCart,
    AiOutlineHeart,
  } from "react-icons/ai";
  import { BsList } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import useCart from "../Hooks/useCart";
import useFav from "../Hooks/useFav";





const Navigation = () => {
  const [cart] = useCart();
  const [fav] = useFav();
  const [isAdmin] = useAdmin();
  const { user, logOut } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    
      const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };
   
    

    return (
        <div
        style={{ zIndex: 9999 }}
        className={`${
          showSidebar ? "hidden" : "flex"
        } xl:flex lg:flex md:hidden sm:hidden  flex-col justify-between p-4 text-white bg-[#0f0f0f] w-[4%] hover:w-[15%] sm:hover:w-[50%] h-[100vh]  fixed `}
        id="navigation-container"
      >
        <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
        </Link>
        <Link
          to="/allproducts"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
        </Link>
        <Link to="/cart" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mt-[3rem] mr-2 " size={26} />
            <div className="badge badge-secondary">+{cart.length}</div>
            <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
          </div>

        
        </Link>
        <Link to="/favourites" className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineHeart className="mt-[3rem] mr-1" size={26} />
            <div className="badge badge-secondary">+{fav.length}</div>
            <span className="hidden nav-item-name mt-[3rem]">
              Fav
            </span>{" "}
        
          
        </Link>
        <Link to="/paymentHistory" className="flex items-center transition-transform transform hover:translate-x-2">
            <BsList className="mt-[3rem] mr-1" size={26} />
          
            <span className="hidden nav-item-name mt-[3rem]">
              PaymentHistory
            </span>{" "}
        
          
        </Link>
        </div>
       

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
        { user ? (
            <span className="text-white">{user.displayName}</span>
          ) : (
            <></>
          )}
          {user && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && user && (
          <ul
            className={`absolute right-0 mt-0 mr-18 space-y-2 bg-white text-gray-600 ${
              isAdmin ? "-top-80" : "-top-20"
            } `}
          >
            {isAdmin && (
              <>
                <li>
                  <Link
                    to="/adminhome"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    AdminHome
                  </Link>
                </li>
                <li>
                  <Link
                    to="/manageitem"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    ManageItems
                  </Link>
                </li>
                <li>
                  <Link
                    to="/addproduct"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    AddProduct
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/userlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogOut}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
          {!user && ( 
            <ul>
            <li>
            <Link
                to="/login"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                <span className="hidden nav-item-name">LOGIN</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={26} />
                <span className="hidden nav-item-name">REGISTER</span>
              </Link>
            </li>

        </ul>
            )}
        
        </div>   
        </div>
    );
};

export default Navigation;