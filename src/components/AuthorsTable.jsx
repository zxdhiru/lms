import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthorsTable = () => {
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authorsRes = await axios.get('https://library-api-backend.onrender.com/api/v1/authors');
                setAuthors(authorsRes.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    // Function to handle view author details
    const handleView = (authorId) => {
        navigate(`/authors/${authorId}`); // Adjust the route according to your setup
    };

    // Function to handle edit author details
    const handleEdit = (authorId) => {
        navigate(`/edit-author/${authorId}`); // Adjust the route according to your setup
    };

    return (
        <div className="shadow-lg rounded-lg bg-white min-w-full overflow-hidden mb-6">
            <div className="overflow-x-auto">
                <table className="border-collapse border border-gray-300 w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Image</th>
                            <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Author ID</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Books</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Date</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.length > 0 ? (
                            authors.map((author) => (
                                <tr key={author._id} className="hover:bg-gray-50 transition ease-in-out cursor-pointer border-b border-gray-200">
                                    <td className="px-4 py-4 text-gray-700">
                                        <img className="h-20 w-full object-contain" src={author.image} alt={author.name} />
                                    </td>
                                    <td className="px-4 py-4 text-gray-700">{author._id}</td>
                                    <td className="px-6 py-4 text-gray-700">{author.name || 'N/A'}</td>
                                    <td className="px-6 py-4 text-gray-700">{author.books.length || 'N/A'}</td>
                                    <td className="px-6 py-4 text-gray-700">{new Date(author.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-gray-700">
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                                            onClick={() => handleView(author._id)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                            onClick={() => handleEdit(author._id)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-4 text-center text-gray-700" colSpan="6">
                                    No authors found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AuthorsTable;
