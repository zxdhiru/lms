import axios from 'axios';
import React, { useEffect, useState } from 'react';

const StudentsTable = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentsRes = await axios.get('https://library-api-backend.onrender.com/api/v1/students');
                setStudents(studentsRes.data);
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
                            <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Student ID</th>
                            <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Email</th>
                            <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student) => (
                                <tr key={student._id} className="hover:bg-gray-50 transition ease-in-out cursor-pointer border-b border-gray-200">
                                    <td className="px-4 py-4 text-gray-700">
                                        <img className="h-20 w-full object-contain" src={student.image} alt={student.name} />
                                    </td>
                                    <td className="px-4 py-4 text-gray-700">{student._id}</td>
                                    <td className="px-4 py-4 text-gray-700">{student.name}</td>
                                    <td className="px-4 py-4 text-gray-700">{student.email}</td>
                                    <td className="px-4 py-4 text-gray-700">{student.phone}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-4 text-center text-gray-700" colSpan="5">
                                    No students found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentsTable;
