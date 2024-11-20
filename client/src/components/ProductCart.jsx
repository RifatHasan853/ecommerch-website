import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from './../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import useFav from '../Hooks/useFav';

const ProductCart = ({ products }) => {
  const { category, image, price, description, _id, name, brand } = products || {};
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

        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'This product is already added to your favorites',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        const cartItem = {
          menuId: _id,
          email: user.email,
          name,
          image,
          price,
          category,
          brand,
          description
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
    <div className="max-w-sm relative bg-[#1A1A1A] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <section className="relative">
        <div className='flex items-center justify-end'>
          <span className='absolute px-3 py-1 mt-6 text-[12px] text-blue-800 uppercase bg-white rounded-full '>
            {category}
          </span>
        </div>
        <Link to={`/products/${_id}`}>
          <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
            {brand}
          </span>
          <img
            className="cursor-pointer w-full"
            src={image}
            alt={name}
            style={{ height: "170px", objectFit: "cover" }}
          />
        </Link>
      </section>

      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl text-white dark:text-white">{name}</h5>
          <p className="text-black font-semibold text-pink-500">
            {price}
          </p>
        </div>

        <p className="mb-3 font-normal text-[#CFCFCF]">
          {description?.substring(0, 60)} ...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/products/${_id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2 rounded-full"
            onClick={handleAddToCart}
          >
            {isFavorited ? <FaHeart size={25} className="text-red-500" /> : <FaRegHeart size={25} />}
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCart;
