import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";


const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    console.log("Authenticated user:", user);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/payments?email=${user.email}`)
                .then(res => {
                    setPayments(res.data);
                })
                .catch(error => {
                    console.error('Error fetching payment history:', error);
                });
        }
    }, [user, axiosSecure]);

    return (
        <div className="w-full px-5 py-10 overflow-x-auto">
            <h2 className="text-2xl font-bold text-center mb-5">Payment History</h2>
            <table className="w-full md:w-4/5 mx-auto">
                <thead>
                    <tr >
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Transaction ID</th>
                        <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.transactionId} className="border-t">
                            <td className="px-4 py-2">{new Date(payment.date).toLocaleDateString()}</td>
                            <td className="px-4 py-2">${payment.price.toFixed(2)}</td>
                            <td className="px-4 py-2">{payment.transactionId}</td>
                            <td className="px-4 py-2">{payment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
