import axios from 'axios';
import React, { useEffect, useState } from 'react'

const StudentsTable = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentsRes = await axios.get('http://localhost:8000/api/v1/students');
                setStudents(studentsRes.data);
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
                            <th className="px-4 py-2 border">Student Id</th>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id}>
                                <td className="px-4 py-2 border"><img className='h-20 w-full object-contain' src={student.image} /></td>
                                <td className="px-4 py-2 border">{student._id}</td>
                                <td className="px-4 py-2 border">{student.name}</td>
                                <td className="px-4 py-2 border">{student.email}</td>
                                <td className="px-4 py-2 border">{student.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StudentsTable