import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from '../../components/Loader';

const OrderList = () => {
    const axiosSecure = useAxiosSecure();
    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orderList');
            return res.data;
        }
    });

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="p-4 overflow-x-auto">
            <div className="flex justify-center my-4">
                <h1 className="text-2xl font-semibold mb-4">Order List</h1>
            </div>
            <div className="flex flex-col md:flex-row">
                <table className="w-full md:w-4/5 mx-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">User Name</th>
                            <th className="px-4 py-2 text-left">Transaction ID</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.transactionId}>
                                <td className="px-4 py-2">{order.userName}</td>
                                <td className="px-4 py-2">{order.transactionId}</td>
                                <td className="px-4 py-2">{order.email}</td>
                                <td className="px-4 py-2">${order.price.toFixed(2)}</td>
                                <td className="px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
