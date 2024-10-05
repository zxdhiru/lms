import React, { useState, useEffect } from 'react';
import TransactionsTable from './TransactionsTable';
import AuthorsTable from './AuthorsTable';
import StudentsTable from './StudentsTable';
import BooksTable from './BooksTable';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);

    // Simulate data fetching with a timeout
    useEffect(() => {
        const fetchData = () => {
            setTimeout(() => {
                setLoading(false); // Data has been "fetched"
            }, 2000); // Simulates a 2-second fetch delay
        };
        fetchData();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Transactions</h2>
                {loading ? (
                    <div className="text-gray-500">Loading transactions...</div>
                ) : (
                    <TransactionsTable />
                )}
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Authors</h2>
                {loading ? (
                    <div className="text-gray-500">Loading authors...</div>
                ) : (
                    <AuthorsTable />
                )}
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Students</h2>
                {loading ? (
                    <div className="text-gray-500">Loading students...</div>
                ) : (
                    <StudentsTable />
                )}
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Books</h2>
                {loading ? (
                    <div className="text-gray-500">Loading books...</div>
                ) : (
                    <BooksTable />
                )}
            </section>
        </div>
    );
};

export default Dashboard;
