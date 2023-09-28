import React from 'react';
import { MDBDataTable } from 'mdbreact';

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
        ],
        rows: [
            {
                name: 'Tiger Nixon',
                position: 'System Architect',
                office: 'Edinburgh',
                age: '61',
                date: '2011/04/25',
                salary: '$320'
            },
            {
                name: 'Garrett Winters',
                position: 'Accountant',
                office: 'Tokyo',
                age: '63',
                date: '2011/07/25',
                salary: '$170'
            },

            {
                name: 'Hope Fuentes',
                position: 'Secretary',
                office: 'San Francisco',
                age: '41',
                date: '2010/02/12',
                salary: '$109'
            },
            {
                name: 'Vivian Harrell',
                position: 'Financial Controller',
                office: 'San Francisco',
                age: '62',
                date: '2009/02/14',
                salary: '$452'
            },
            {
                name: 'Timothy Mooney',
                position: 'Office Manager',
                office: 'London',
                age: '37',
                date: '2008/12/11',
                salary: '$136'
            },
            {
                name: 'Jackson Bradshaw',
                position: 'Director',
                office: 'New York',
                age: '65',
                date: '2008/09/26',
                salary: '$645'
            },
            {
                name: 'Olivia Liang',
                position: 'Support Engineer',
                office: 'Singapore',
                age: '64',
                date: '2011/02/03',
                salary: '$234'
            },

        ]
    };

    return (
        <MDBDataTable
            striped
            bordered
            hover
            data={data}
        />
    );
}

export default DatatablePage;