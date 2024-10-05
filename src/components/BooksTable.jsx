import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BooksTable = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const booksRes = await axios.get('https://library-api-backend.onrender.com/api/v1/books');
                setBooks(Array.isArray(booksRes.data) ? booksRes.data : []); // Ensure it's an array
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
                            <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Image</th>
                            <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Book Id</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Author</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length > 0 ? (
                            books.map((book) => (
                                <tr key={book._id} className="hover:bg-gray-50 transition ease-in-out cursor-pointer border-b border-gray-200">
                                    <td className="px-4 py-4 text-gray-700">
                                        <img className="h-20 w-full object-contain" src={book.images[0]} alt={book.title} />
                                    </td>
                                    <td className="px-4 py-4 text-gray-700">{book._id}</td>
                                    <td className="px-6 py-4 text-gray-700">{book.title}</td>
                                    <td className="px-6 py-4 text-gray-700">{book.author?.name || 'N/A'}</td>
                                    <td className="px-6 py-4 text-gray-700">{book.stock}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-4 text-center text-gray-700" colSpan="5">
                                    No books found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BooksTable;
