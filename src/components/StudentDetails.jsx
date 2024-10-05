import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const StudentDetails = () => {
    const { id } = useParams(); // Get the student ID from the URL
    const [student, setStudent] = useState(null); // State to store student details
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchStudentDetail = async () => {
            try {
                const response = await axios.get(`https://library-api-backend.onrender.com/api/v1/students/${id}`);
                setStudent(response.data); // Set the book data
                console.log(response);

                setLoading(false); // Set loading to false
            } catch (err) {
                setError('Failed to fetch book details');
                setLoading(false);
            }
        };

        fetchStudentDetail();
    }, [id]); // Dependency on the book ID

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-10">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            {student && (
                <>
                    <div className="flex flex-col md:flex-row items-start mb-8">
                        <img
                            src={student.image}
                            alt={student.name}
                            className="w-32 h-full object-cover object-top rounded-lg shadow-md mb-6 md:mb-0 md:mr-6"
                        />
                        <div className="text-left">
                            <p className="text-lg font-semibold"><strong>Name:</strong> {student.name}</p>
                            <p className="text-lg font-semibold"><strong>Student Id:</strong>{student._id}</p>
                            <p className="text-lg font-semibold"><strong>Email:</strong>{student.email}</p>
                            <p className="text-lg font-semibold"><strong>Phone:</strong> {student.phone}</p>
                            <p className="text-lg font-semibold"><strong>Department:</strong>{student.department ? student.department : 'NA'}</p>
                            <p className="text-lg font-semibold"><strong>Batch:</strong>{student.batch}</p>
                        </div>
                    </div>

                    {student.booksIssued.length > 0 &&
                        <div className="shadow-lg rounded-lg bg-white min-w-full overflow-hidden">
                            <table className="border-collapse border border-gray-300 w-full">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">#</th>
                                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Image</th>
                                        <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700 hidden md:table-cell">Book ID</th>
                                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 hidden md:table-cell">Name</th>
                                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 hidden md:table-cell">Stock</th>
                                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 hidden md:table-cell">Price</th>
                                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.booksIssued.map((book, index) => (
                                        <tr key={book._id} className={`hover:bg-gray-50 transition ease-in-out cursor-pointer border-b border-gray-200`}>
                                            <td className="px-4 py-4 text-gray-700">{index + 1}</td>
                                            <td className="px-6 py-4">
                                                <Link to={`/books/${book._id}`} className="flex items-center">
                                                    <img
                                                        className="h-16 object-contain rounded-md transition-transform duration-200 hover:scale-105"
                                                        src={book.images && book.images.length > 0 ? book.images[0] : 'placeholder.jpg'}
                                                        alt={book.title}
                                                    />
                                                </Link>
                                            </td>
                                            <td className="px-4 py-4 text-gray-700 hidden md:table-cell">{book._id}</td>
                                            <td className="px-6 py-4 text-gray-700 hidden md:table-cell">{book.title}</td>
                                            <td className="px-6 py-4 text-gray-700 hidden md:table-cell">{book.stock}</td>
                                            <td className="px-6 py-4 text-gray-700 hidden md:table-cell">₹{book.originalPrice}</td>
                                            <td className="px-6 py-4 text-gray-700"><Link to={`/books/${book._id}`} className="text-white p-2 bg-blue-400 rounded-md hover:bg-blue-500">View</Link></td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    }
                </>
            )}
        </div>
    );
};

export default StudentDetails;
