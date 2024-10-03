import { FaBox, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import Loader from "../components/Loader";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useCart from "../Hooks/useCart";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";



const ProductDetail = () => {
 
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();
    const [qty, setQty] = useState(1);
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const handleAddToCart = () => {
      if (user && user.email) {
          //send cart item to the database
          const cartItem = {
            menuId: products._id,
            email: user.email,
            name: products.name,
            image: products.image,
            price: products.price * qty,
            category: products.category,
            brand: products.brand,
            description: products.description,
            quantity: qty,

          }
          axiosSecure.post('/carts', cartItem)
              .then(res => {
                  console.log(res.data)
                  if (res.data.insertedId) {
                      Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: `${name} added to your cart`,
                          showConfirmButton: false,
                          timer: 1500
                      });
                      // refetch cart to update the cart items count
                      refetch();
                  }

              })
      }
      else {
          Swal.fire({
              title: "You are not Logged In",
              text: "Please login to add to the cart?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, login!"
          }).then((result) => {
              if (result.isConfirmed) {
                  //   send the user to the login page
                  navigate('/login', { state: { from: location } })
              }
          });
      }
  }
      
  // State to hold related products and toggle related products section
  const [relatedProducts, setRelatedProducts] = useState([4]);
  const [showRelated, setShowRelated] = useState(false);

  
  const { data: products = {}, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`products/${id}`);
      return data;
    },
  });

  const fetchRelatedProducts = async () => {
    const { data } = await axiosPublic.get(
      `products/related/${products.category}`
    );
    setRelatedProducts(data);
    setShowRelated(true);
  };

  if (isLoading || !products.name) return <Loader />;
  console.log(products)
  const totalPrice = products.price * qty;
    return (
      <>
      <div>
        <Link to="/" className="text-white font-semibold hover:underline ml-[10rem]">
          Go Back
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 relative justify-between mt-[2rem] lg:ml-[10rem] ml-10 items-center   ">
        <div>
          <img
            src={products.image}
            alt={products.name}
            className=" xl:w-[40rem] lg:w-[35rem] md:w-[24rem] w-[15rem] lg:mr-[2rem]"
          />
        </div>

        <div>
          <div className="flex flex-col justify-between">
            <h2 className="text-2xl font-semibold">{products.name}</h2>
            <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] w-[15rem] text-[#B0B0B0]">
              {products.description}
            </p>

            {/* Display dynamic total price */}
            <p className="text-5xl my-4 font-extrabold">
              $ {totalPrice.toFixed(2)} {/* Use toFixed to format the price */}
            </p>

            <div className="flex items-center justify-between w-[20rem]">
              <div className="one">
                <h1 className="flex items-center mb-6">
                  <FaStore className="mr-2 text-white" /> Brand: {products.brand}
                </h1>
                <h1 className="flex items-center mb-6">
                  <FaStar className="mr-2 text-white" /> Reviews:
                </h1>
              </div>

              <div className="two">
                <div className="flex gap-1">
                <h1 className="flex items-center mb-6">
                  <FaShoppingCart className="mr-2 text-white" /> Quantity: {products.quantity}
                </h1>
                <div className="flex justify-between flex-wrap">
              {products.countInStock > 0 && (
                <div>
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))} // Convert string to number
                    className=" w-[6rem] rounded-lg text-white"
                  >
                    {[...Array(products.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            </div>
                <h1 className="flex items-center mb-6 w-[10rem]">
                  <FaBox className="mr-2 text-white" /> In Stock: {products.countInStock}
                </h1>
              </div>
            </div>

          

            <div className="btn-container">
              <button
                onClick={handleAddToCart}
                className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="related-products mt-8 flex justify-center">
          <button
            onClick={fetchRelatedProducts}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Show Related Products
          </button>
        </div>

        {showRelated && relatedProducts.length > 0 && (
          <div className="related-products-list mt-4 grid justify-center ">
            <h2 className="text-xl font-semibold mb-4">Related Products</h2>
            <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct._id}
                  className="related-product-card p-4 border rounded-lg"
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-[200px] object-cover mb-2"
                  />
                  <h3 className="text-lg font-semibold">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-gray-500">${relatedProduct.price.toFixed(2)}</p>
                  <Link
                    to={`/products/${relatedProduct._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
    );
};

export default ProductDetail;