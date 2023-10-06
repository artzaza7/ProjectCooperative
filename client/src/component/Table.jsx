import React from 'react';
import { MDBDataTable } from 'mdbreact';
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const DatatablePage = () => {
    const data = {
        columns: [
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Position',
                field: 'position',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Office',
                field: 'office',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Age',
                field: 'age',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Start date',
                field: 'date',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Salary',
                field: 'salary',
                sort: 'asc',
                width: 100
            }
            , {
                label: 'Update',
                field: 'update',
                sort: 'asc',
                width: 100
            }, {
                label: 'Delete',
                field: 'delete',
                sort: 'asc',
                width: 100
            }
        ],
        rows: [
            {
                name: 'Tiger Nixon',
                position: 'System Architect',
                office: 'Edinburgh',
                age: '61',
                date: '2011/04/25',
                salary: '$320',
                update: <Link
                    to={{
                        pathname: "/update",
                        state: { typeName: "Update" },
                    }}
                >
                    <Button variant="warning" style={{ marginRight: "1rem" }}>
                        Update
                    </Button>
                </Link>,
                delete: <button className='btn btn-danger'>Delete</button>,
            },
            {
                name: 'Garrett Winters',
                position: 'Accountant',
                office: 'Tokyo',
                age: '63',
                date: '2011/07/25',
                salary: '$170', update: <button className='btn btn-warning'>Update</button>,
                delete: <button className='btn btn-danger'>Delete</button>,
            },

            {
                name: 'Hope Fuentes',
                position: 'Secretary',
                office: 'San Francisco',
                age: '41',
                date: '2010/02/12',
                salary: '$109', update: <button className='btn btn-warning'>Update</button>,
                delete: <button className='btn btn-danger'>Delete</button>,
            },
            {
                name: 'Vivian Harrell',
                position: 'Financial Controller',
                office: 'San Francisco',
                age: '62',
                date: '2009/02/14',
                salary: '$452', update: <button className='btn btn-warning'>Update</button>,
                delete: <button className='btn btn-danger'>Delete</button>,
            },
            {
                name: 'Timothy Mooney',
                position: 'Office Manager',
                office: 'London',
                age: '37',
                date: '2008/12/11',
                salary: '$136', update: <button className='btn btn-warning'>Update</button>,
                delete: <button className='btn btn-danger'>Delete</button>,
            },
            {
                name: 'Jackson Bradshaw',
                position: 'Director',
                office: 'New York',
                age: '65',
                date: '2008/09/26',
                salary: '$645', update: <button className='btn btn-warning'>Update</button>,
                delete: <button className='btn btn-danger'>Delete</button>,
            },
            {
                name: 'Olivia Liang',
                position: 'Support Engineer',
                office: 'Singapore',
                age: '64',
                date: '2011/02/03',
                salary: '$234', update: <button className='btn btn-warning'>Update</button>,
                delete: <button className='btn btn-danger'>Delete</button>,
            },

        ]
    };
    const customStyles = {
        table: {
            // Add your custom table styles here
            background: '#0A0909'
        },
        tableWrapper: {
            // Add your custom table wrapper styles here
            background: '#0A0909'
        },
    };
    return (
        <MDBDataTable
            striped
            bordered
            hover
            data={data}
            style={customStyles.tableWrapper}
            responsive
        />
    );
}

export default DatatablePage;