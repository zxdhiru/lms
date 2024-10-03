import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [books, setBooks] = useState([]);
    const [students, setStudents] = useState([]);
    const [authors, setAuthors] = useState([]);

    const [transactionsLimit, setTransactionsLimit] = useState(10);
    const [booksLimit, setBooksLimit] = useState(10);
    const [studentsLimit, setStudentsLimit] = useState(10);
    const [authorsLimit, setAuthorsLimit] = useState(10);

    useEffect(() => {
        // Fetch all the required data using Axios
        const fetchData = async () => {
            try {
                const transactionsRes = await axios.get('/api/transactions');
                const booksRes = await axios.get('/api/books');
                const studentsRes = await axios.get('/api/students');
                const authorsRes = await axios.get('/api/authors');

                setTransactions(transactionsRes.data);
                setBooks(booksRes.data);
                setStudents(studentsRes.data);
                setAuthors(authorsRes.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    const loadMoreTransactions = () => setTransactionsLimit(transactionsLimit + 10);
    const loadMoreBooks = () => setBooksLimit(booksLimit + 10);
    const loadMoreStudents = () => setStudentsLimit(studentsLimit + 10);
    const loadMoreAuthors = () => setAuthorsLimit(authorsLimit + 10);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            {/* Recent Transactions */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
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
                            {transactions.slice(0, transactionsLimit).map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className="px-4 py-2 border">{transaction.id}</td>
                                    <td className="px-4 py-2 border">{transaction.book}</td>
                                    <td className="px-4 py-2 border">{transaction.student}</td>
                                    <td className="px-4 py-2 border">{transaction.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {transactionsLimit < transactions.length && (
                    <button
                        onClick={loadMoreTransactions}
                        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Load More
                    </button>
                )}
            </div>

            {/* Books Table */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Books</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Book ID</th>
                                <th className="px-4 py-2 border">Title</th>
                                <th className="px-4 py-2 border">Author</th>
                                <th className="px-4 py-2 border">Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.slice(0, booksLimit).map((book) => (
                                <tr key={book.id}>
                                    <td className="px-4 py-2 border">{book.id}</td>
                                    <td className="px-4 py-2 border">{book.title}</td>
                                    <td className="px-4 py-2 border">{book.author}</td>
                                    <td className="px-4 py-2 border">{book.isAvailable ? 'Available' : 'Checked Out'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {booksLimit < books.length && (
                    <button
                        onClick={loadMoreBooks}
                        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Load More
                    </button>
                )}
            </div>

            {/* Students Table */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Students</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Student ID</th>
                                <th className="px-4 py-2 border">Name</th>
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border">Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.slice(0, studentsLimit).map((student) => (
                                <tr key={student.id}>
                                    <td className="px-4 py-2 border">{student.id}</td>
                                    <td className="px-4 py-2 border">{student.name}</td>
                                    <td className="px-4 py-2 border">{student.email}</td>
                                    <td className="px-4 py-2 border">{student.department}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {studentsLimit < students.length && (
                    <button
                        onClick={loadMoreStudents}
                        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Load More
                    </button>
                )}
            </div>

            {/* Authors Table */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Authors</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Author ID</th>
                                <th className="px-4 py-2 border">Name</th>
                                <th className="px-4 py-2 border">Books Written</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authors.slice(0, authorsLimit).map((author) => (
                                <tr key={author.id}>
                                    <td className="px-4 py-2 border">{author.id}</td>
                                    <td className="px-4 py-2 border">{author.name}</td>
                                    <td className="px-4 py-2 border">{author.booksWritten}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {authorsLimit < authors.length && (
                    <button
                        onClick={loadMoreAuthors}
                        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Load More
                    </button>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
