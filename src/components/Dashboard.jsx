import React from 'react'
import TransactionsTable from './TransactionsTable'
import AuthorsTable from './AuthorsTable'
import StudentsTable from './StudentsTable'
import BooksTable from './BooksTable'

const Dashboard = () => {
    return (
        <>
            <TransactionsTable />
            <AuthorsTable />
            <StudentsTable />
            <BooksTable />
        </>
    )
}

export default Dashboard