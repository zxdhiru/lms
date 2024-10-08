import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AuthorDetails from './components/AuthorDetails'; // Import AuthorDetails component
import EditAuthor from './components/EditAuthor'; // Import EditAuthor component
import BookDetails from './components/BookDetails';
import StudentDetails from './components/StudentDetails';
import BooksTable from './components/BooksTable';
import StudentsTable from './components/StudentsTable';

function App() {

  return (
    <>
      <Navbar />
      <Routes> {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/students/" element={<StudentsTable />} /> {/* Route for viewing author details */}
        <Route path="/students/:id" element={<StudentDetails />} /> {/* Route for viewing author details */}
        <Route path="/authors/:id" element={<AuthorDetails />} /> {/* Route for viewing author details */}
        < Route path="/books/" element={<BooksTable />} />{/* Route for viewing book details*/}
        < Route path="/books/:id" element={<BookDetails />} />{/* Route for viewing book details*/}
        <Route path="/edit-author/:id" element={<EditAuthor />} /> {/* Route for editing author details */}
      </Routes>
    </>
  );
}

export default App;
