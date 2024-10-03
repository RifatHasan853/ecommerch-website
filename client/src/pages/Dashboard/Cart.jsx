import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Cart = () => {
    const [cart, refetch] = useCart();
    const axiosSecure = useAxiosSecure();

    // Calculate total price for all cart items (price * quantity)
    const totalPrice = cart.reduce((total, products) => total + products.price * products.quantity, 0);

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
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };

    return (
        <div>
            <div className="grid lg:grid-cols-3 grid-cols-1 justify-evenly lg:ml-20 ml-10 mb-8">
                <h2 className="text-4xl">Items: {cart.length}</h2>
                <h2 className="text-4xl">Total Price: ${totalPrice.toFixed(2)}</h2>
                {cart.length ? (
                    <Link to="/payments">
                        <button className="btn w-20 rounded bg-pink-600">Pay</button>
                    </Link>
                ) : (
                    <button disabled className="btn btn-primary">Pay</button>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full md:w-4/5 mx-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left"></th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Brand</th>
                            <th className="px-4 py-2 text-left">Quantity</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((products, index) => (
                            <tr key={products._id}>
                                <th>{index + 1}</th>
                                <td className="px-4 py-2">{products.name}</td>
                                <td className="px-4 py-2">{products.brand}</td>
                                <td className="px-4 py-2">{products.quantity}</td> {/* Display quantity */}
                                <td className="px-4 py-2">${(products.price * products.quantity).toFixed(2)}</td> {/* Price multiplied by quantity */}
                                <th className="px-4 ">
                                    <button
                                        onClick={() => handleDelete(products._id)}
                                        className="btn btn-ghost btn-lg mr-4"
                                    >
                                        <FaTrashAlt className="text-red-600" />
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;
