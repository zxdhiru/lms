import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
    const { id } = useParams(); // Get the book ID from the URL
    const [issuer, setIssuer] = useState([]); // Initialize as an array
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state for book

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const bookResponse = await axios.get(`https://library-api-backend.onrender.com/api/v1/books/${id}`);
                setBook(bookResponse.data); // Set the book data
            } catch (err) {
                setError('Failed to fetch book details');
            }
        };

        const fetchIssuerTransactions = async () => {
            try {
                const issuerResponse = await axios.get(`https://library-api-backend.onrender.com/api/v1/transactions/${id}`);
                setIssuer(issuerResponse.data); // Set the issuer/transaction data
            } catch (err) {
                setError('Failed to fetch transaction details');
            }
        };

        const fetchData = async () => {
            await Promise.all([fetchBookDetails(), fetchIssuerTransactions()]); // Fetch both data
            setLoading(false); // Set loading to false after both fetches
        };

        fetchData(); // Fetch book and issuer transactions
    }, [id]); // Dependency on the book ID

    if (loading) {
        return <div className="text-center py-10">Loading...</div>; // Show loading state
    }

    return (
        <div>
            {book && (
                <div className="container mx-auto p-6">
                    <div className="flex flex-col md:flex-row items-start mb-8">
                        <img
                            src={book.images && book.images.length > 0 ? book.images[0] : 'placeholder.jpg'}
                            alt={book.title}
                            className="w-32 h-full object-cover object-top rounded-lg shadow-md mb-6 md:mb-0 md:mr-6"
                        />
                        <div className="text-left">
                            <p className="text-lg font-semibold"><strong>Title:</strong> {book.title}</p>
                            <p className="text-lg font-semibold"><strong>Author:</strong> {typeof book.author === 'string' ? book.author : book.author?.name}</p>
                            <p className="text-lg font-semibold"><strong>Description:</strong> {book.description}</p>
                            <p className="text-lg font-semibold"><strong>Stock:</strong> {book.stock}</p>
                            <p className="text-lg font-semibold"><strong>Price:</strong> ₹{book.originalPrice}</p>
                            <p className="text-lg font-semibold"><strong>Added on:</strong> {new Date(book.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    {issuer && issuer.length > 0 ? (
                        <div className="shadow-lg rounded-lg bg-white min-w-full overflow-hidden">
                            <table className="border-collapse border border-gray-300 w-full">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">#</th>
                                        <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700 hidden md:table-cell">Transaction ID</th>
                                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 sm:table-cell">Name</th>
                                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 hidden md:table-cell">Phone</th>
                                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 hidden md:table-cell">Issued On</th>
                                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {issuer.map((issuer, index) => (
                                        <tr key={issuer.transactionId} className={`hover:bg-gray-50 transition ease-in-out cursor-pointer border-b border-gray-200`}>
                                            <td className="px-4 py-4 text-gray-700">{index + 1}</td>
                                            <td className="px-4 py-4 text-gray-700 hidden md:table-cell">{issuer.transactionId}</td>
                                            <td className="px-6 py-4 text-gray-700 sm:table-cell">{issuer.student}</td>
                                            <td className="px-6 py-4 text-gray-700 hidden md:table-cell">{issuer.phone || "N/A"}</td>
                                            <td className="px-6 py-4 text-gray-700 hidden md:table-cell">
                                                {issuer.issueDate ? new Date(issuer.issueDate).toLocaleDateString() : "N/A"}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                <Link to={`/students/${issuer.studentId}`} className="text-white p-2 bg-blue-400 rounded-md hover:bg-blue-500">View</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className='text-red-500'>No transactions found for this book.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default BookDetails;
