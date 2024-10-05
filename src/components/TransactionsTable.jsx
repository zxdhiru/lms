import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa'; // Importing icons

const TransactionsTable = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const transactionsRes = await axios.get('https://library-api-backend.onrender.com/api/v1/transactions');
                setTransactions(transactionsRes.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="shadow-lg rounded-lg bg-white min-w-full overflow-hidden mb-6">
            <div className="overflow-x-auto">
                <table className="border-collapse border border-gray-300 w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Transaction ID</th>
                            <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Book</th>
                            <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Student</th>
                            <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Transaction Type</th>
                            <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length > 0 ? (
                            transactions.map((transaction) => (
                                <tr key={transaction._id} className="hover:bg-gray-50 transition ease-in-out cursor-pointer border-b border-gray-200">
                                    <td className="px-4 py-4 text-gray-700">{transaction._id}</td>
                                    <td className="px-4 py-4 text-gray-700">{transaction.bookIds[0]?.title || 'N/A'}</td>
                                    <td className="px-4 py-4 text-gray-700">{transaction.studentId?.name || 'N/A'}</td>
                                    <td className="px-4 py-4 text-gray-700">
                                        {transaction.type === 'sent' ? (
                                            <span className="text-red-500 flex items-center">
                                                <FaArrowCircleUp className="mr-2" /> Sent
                                            </span>
                                        ) : (
                                            <span className="text-green-500 flex items-center">
                                                <FaArrowCircleDown className="mr-2" /> Received
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 text-gray-700">{new Date(transaction.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-4 text-center text-gray-700" colSpan="6">
                                    No transactions found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransactionsTable;

// <td className="px-4 py-4 text-gray-700">{new Date(transaction.createdAt).toLocaleDateString()}</td>