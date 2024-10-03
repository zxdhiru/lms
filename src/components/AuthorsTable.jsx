import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AuthorsTable = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authorsRes = await axios.get('http://localhost:8000/api/v1/authors');
                console.log(authorsRes);

                setAuthors(authorsRes.data);
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
                            <th className="px-4 py-2 border">Author ID</th>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Books</th>
                            <th className="px-4 py-2 border">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.map((author) => (
                            <tr key={author._id}>
                                <td className="px-4 py-2 border"><img className='h-20 w-full object-contain' src={author.image} /></td>
                                <td className="px-4 py-2 border">{author._id}</td>
                                <td className="px-4 py-2 border">{author.name || 'N/A'}</td>
                                <td className="px-4 py-2 border">{author.books.length || 'N/A'}</td>
                                <td className="px-4 py-2 border">{new Date(author.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AuthorsTable