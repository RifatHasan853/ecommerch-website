import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

import SectionTitle from "../../components/SectionTitle";
import useMenu from "../../Hooks/useMenu";


const ManageItems = () => {
    const [menu, refetch] = useMenu();
    
    const handleDeleteItem = (product) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`https://ecommerch-server-vintnoryc-rifat-hasans-projects.vercel.app/products/${product._id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const resData = await response.json();
    
                    if (resData.deletedCount > 0) {
                        // refetch to update the UI
                        refetch();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${product.name} has been deleted`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                } catch (error) {
                    console.error("Error deleting product:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "There was a problem deleting the product."
                    });
                }
            }
        });
    };



  
    
    return (
        <div>
        <SectionTitle heading="Manage All Items" subHeading="Hurry up"></SectionTitle>
        <div>
            <div className="overflow-x-auto">
                <table className="w-full md:w-4/5 mx-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                
                            </th>
                            <th className="px-4 py-2 text-left">Item name</th>
                            <th className="px-4 py-2 text-left">brand</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Update</th>
                            <th className="px-4 py-2 text-left">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((product, index) => <tr key={product._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td className="px-4 py-2">
                                {product.name}
                                </td>
                                <td className="px-4 py-2">
                                {product.brand} 
                                </td>
                                <td className="px-4 py-2">${product.price}</td>
                                <td>
                                    <Link to={`/updateitem/${product._id}`}>
                                        <button
                                            className="btn btn-ghost btn-lg bg-orange-500">
                                            <FaEdit className="text-white 
                                    "></FaEdit>
                                        </button>
                                    </Link>
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleDeleteItem(product)}
                                        className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    </div>
    );
};

export default ManageItems;