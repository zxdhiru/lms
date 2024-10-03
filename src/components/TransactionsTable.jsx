import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionsTable = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const transactionsRes = await axios.get('http://localhost:8000/api/v1/transactions');

                setTransactions(transactionsRes.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="mb-6">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Transaction ID</th>
                            <th className="px-4 py-2 border">Book</th>
                            <th className="px-4 py-2 border">Student</th>
                            <th className="px-4 py-2 border">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction._id}>
                                <td className="px-4 py-2 border">{transaction._id}</td>
                                <td className="px-4 py-2 border">{transaction.bookIds[0]?.title || 'N/A'}</td>
                                <td className="px-4 py-2 border">{transaction.studentId?.name || 'N/A'}</td>
                                <td className="px-4 py-2 border">{new Date(transaction.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransactionsTable;
