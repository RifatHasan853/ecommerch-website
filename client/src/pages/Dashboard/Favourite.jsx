import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useFav from "../../Hooks/useFav";
import { Link } from "react-router-dom";
import {  FaTrashAlt } from "react-icons/fa";

const Favourite = () => {
    const [fav, refetch] = useFav();
    const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/favourites/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    return (
        <>
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 items-center justify-center">
                <h1 className="lg:ml-[20rem] mt-[10rem] text-[3rem] flex justify-center">Favourite <br /> Products</h1>

                <Link
                    to="/allproducts"
                    className="bg-pink-600 font-bold rounded-full py-2 px-10 lg:mr-[18rem] mt-[10rem] flex items-center justify-center"
                >
                    Shop
                </Link>
            </div>

            <div className="mt-8 lg:ml-[20rem] ml-6   ">
                {fav.length > 0 ? (
                    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {fav.map((products) => (
                            <div key={products._id} className="bg-gray-800 p-5 rounded-lg">
                                <img
                                    src={products.image}
                                    alt={products.name}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <h3 className="text-white text-xl mt-3">{products.name}</h3>
                               
                                <p className="text-pink-500 font-bold mt-2">${products.price}</p>

                                <div className="flex justify-between items-center mt-4">
                                    
                                    <button
                                        onClick={() => handleDelete(products._id)}
                                        className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>

                                    <Link
                                        to={`/products/${products._id}`}
                                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                                    >
                                        View Product
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400">No favorite products yet.</p>
                )}
            </div>
        </>
    );
};

export default Favourite;
