
import { Link,  useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useFav from "../Hooks/useFav";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";


const Product = ({ products }) => {
    const {  image, price,   _id,name } = products || {};
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [fav, refetch] = useFav(); // Get all favorite items
    const [isFavorited, setIsFavorited] = useState(false); // To track if this product is favorited
     // Check if this product is already in the favorites list on mount
  useEffect(() => {
    if (fav.some(item => item.menuId === _id)) {
      setIsFavorited(true);
    }
  }, [fav, _id]);

  const handleAddToCart = () => {
    if (user && user.email) {
      if (isFavorited) {
        // Show alert if the product is already in the favorites
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'This product is already added to your favorites',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        // Add to favorites if it's not already in
        const cartItem = {
          menuId: _id,
          email: user.email,
          name,
          image,
          price,
         
        };
        axiosSecure.post('/favourites', cartItem)
          .then(res => {
            if (res.data.insertedId) {
              setIsFavorited(true); // Mark as favorited
              refetch(); // Refetch to update favorite list
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${name} added to your favorites`,
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
      }
    } else {
      // If user is not logged in, show login prompt
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to favorites",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="w-[85%] ml-[2rem] p-3 relative">
    <div className="relative">
      <img
        src={image}
        alt={name}
        className="w-full h-[250px] rounded object-cover mb-2"
      />
  
      {/* FaHeart button positioned at the top-right corner of the image */}
      <button
        className="absolute top-2 right-2  p-2 "
        onClick={handleAddToCart}
      >
        {isFavorited ? (
          <FaHeart size={25} className="text-red-500" />
        ) : (
          <FaRegHeart size={25} />
        )}
      </button>
    </div>
  
    <div className="p-4">
      <Link to={`/products/${_id}`}>
        <h2 className="flex justify-evenly items-center">
          <div className="text-lg">{name}</div>
          <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
            $ {price}
          </span>
        </h2>
      </Link>
    </div>
  </div>
    );
};

export default Product;