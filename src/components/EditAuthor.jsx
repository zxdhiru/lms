import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditAuthor = () => {
    const { id } = useParams(); // Get the author ID from the URL
    const navigate = useNavigate(); // For navigating after form submission
    const [author, setAuthor] = useState(null); // Set initial author to null
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        books: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authorRes = await axios.get(`https://library-api-backend.onrender.com/api/v1/authors/${id}`);
                setAuthor(authorRes.data);

                // Set form data with the fetched author's details
                setFormData({
                    name: authorRes.data.name,
                    image: authorRes.data.image,
                    books: authorRes.data.books
                });
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, [id]);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update the author's details via the API
            await axios.put(`https://library-api-backend.onrender.com/api/v1/authors/${id}`, formData);
            alert('Author updated successfully');
            navigate(`/authors/${id}`); // Redirect to the author's detail page
        } catch (error) {
            console.error('Error updating author', error);
        }
    };

    if (!author) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <div>
            <h2>Edit Author ID: {id}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 p-2 border w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="mt-1 p-2 border w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Books</label>
                    <textarea
                        name="books"
                        value={formData.books.join(', ')} // Convert array to string
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                books: e.target.value.split(',').map((book) => book.trim()) // Convert back to array
                            })
                        }
                        className="mt-1 p-2 border w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditAuthor;
