import React from 'react';
import TransactionsTable from './TransactionsTable';
import AuthorsTable from './AuthorsTable';
import StudentsTable from './StudentsTable';
import BooksTable from './BooksTable';

const Dashboard = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Transactions</h2>
                <TransactionsTable />
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Authors</h2>
                <AuthorsTable />
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Students</h2>
                <StudentsTable />
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Books</h2>
                <BooksTable />
            </section>
        </div>
    );
};

export default Dashboard;
