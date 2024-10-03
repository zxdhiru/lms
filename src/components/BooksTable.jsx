import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BooksTable = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const booksRes = await axios.get('http://localhost:8000/api/v1/books');
                setBooks(Array.isArray(booksRes.data) ? booksRes.data : []); // Ensure it's an array
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
                            <th className="px-4 py-2 border">Image</th>
                            <th className="px-4 py-2 border">Book Id</th>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Author</th>
                            <th className="px-4 py-2 border">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book._id}>
                                <td className="px-4 py-2 border"><img className="h-20 w-full object-contain" src={book.images[0]} alt={book.title} /></td>
                                <td className="px-4 py-2 border">{book._id}</td>
                                <td className="px-4 py-2 border">{book.title}</td>
                                <td className="px-4 py-2 border">{book.author.name}</td>
                                <td className="px-4 py-2 border">{book.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BooksTable;
