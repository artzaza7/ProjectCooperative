import React, { useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { format } from 'date-fns';

// Import API
import { deleteExpenseByIdAndUserId } from "../service/ExpenseService"
import { deleteIncomeByIdAndUserId } from "../service/IncomeService"

// Import Library
import jwtDecode from 'jwt-decode';

const DatatablePage = (props) => {
    // Navigator
    const navigate = useNavigate()

    // Function for Modal
    const [modalId, setModalId] = useState("")
    const [modalType, setModalType] = useState("")
    const [modalMoney, setModalMoney] = useState(0)
    const [modalMoneyType, setModalMoneyType] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    async function refreshPage() {
        window.location.reload(false);
    }

    async function deleteSubmit() {
        const token = localStorage.getItem("token")
        if (token) {
            const user_id = jwtDecode(token).user_id
            try {
                if (modalType === "INCOME") {
                    const responseDeleteIncome = await deleteIncomeByIdAndUserId(user_id, modalId)
                    console.log(responseDeleteIncome.message)
                }
                else {
                    const responseDeleteExpense = await deleteExpenseByIdAndUserId(user_id, modalId)
                    console.log(responseDeleteExpense.message)
                }
                setShow(false);
                navigate("/alltransaction");
                refreshPage(); // call the function to refresh the page
            }
            catch (error) {
                console.log(error.message)
            }
        }
        else {
            console.log("Don't have token")
            navigate("/")
        }
    }
    function handleShow(id, type, money, moneyType) {
        setModalId(id)
        setModalType(type)
        setModalMoney(money)
        setModalMoneyType(moneyType)
        // openModal
        setShow(true)
    }

    const { monies } = props
    const rowData = []
    const colData = [
        {
            label: 'ID',
            field: 'id',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Type',
            field: 'type',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Money',
            field: 'money',
            sort: 'asc',
            width: 270
        },
        {
            label: 'Money_Type',
            field: 'money_type',
            sort: 'asc',
            width: 200
        },
        {
            label: 'CreateDate',
            field: 'createDate',
            sort: 'asc',
            width: 100
        },
        {
            label: 'CreateDay',
            field: 'createDay',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Update',
            field: 'update',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Delete',
            field: 'delete',
            sort: 'asc',
            width: 100
        }
    ]

    if (monies.length !== 0) {
        for (let i = 0; i < monies.length; i++) {
            const formattedDate = format(new Date(monies[i].createDate), 'dd MMM yyyy HH:mm:ss');

            var fixData = {
                id: monies[i].id,
                type: monies[i].type,
                money: monies[i].money,
                money_type: monies[i].money_type,
                createDate: formattedDate,
                createDay: monies[i].createDay,
                update: <Link
                    to={{
                        pathname: `/update/${monies[i].id}/${monies[i].type}`,
                        state: { typeName: "Update" },
                    }}
                >
                    <Button variant="warning" style={{

                        width: "6rem",
                        height: "3rem",
                        fontSize: "1.3rem",
                    }}>
                        Update
                    </Button>
                </Link>,
                delete: <button className='btn btn-danger' onClick={() => handleShow(monies[i].id, monies[i].type, monies[i].money, monies[i].money_type)}
                    style={{

                        width: "5rem",
                        height: "3rem",
                        fontSize: "1.3rem",
                    }}
                >Delete</button>,
            }
            rowData.push(fixData)
        }
    }

    const data = {
        columns: monies.length === 0 ? [
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Position',
                field: 'position',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Office',
                field: 'office',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Age',
                field: 'age',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Start date',
                field: 'date',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Salary',
                field: 'salary',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Update',
                field: 'update',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Delete',
                field: 'delete',
                sort: 'asc',
                width: 100
            }
        ] : colData,
        rows: monies.length === 0 ? [
            // {
            //     name: 'Tiger Nixon',
            //     position: 'System Architect',
            //     office: 'Edinburgh',
            //     age: '61',
            //     date: '2011/04/25',
            //     salary: '$320',
            //     update: <Link
            //         to={{
            //             pathname: "/update",
            //             state: { typeName: "Update" },
            //         }}
            //     >
            //         <Button variant="warning" style={{ marginRight: "1rem" }}>
            //             Update
            //         </Button>
            //     </Link>,
            //     delete: <button className='btn btn-danger'>Delete</button>,
            // },
            // {
            //     name: 'Garrett Winters',
            //     position: 'Accountant',
            //     office: 'Tokyo',
            //     age: '63',
            //     date: '2011/07/25',
            //     salary: '$170', update: <button className='btn btn-warning'>Update</button>,
            //     delete: <button className='btn btn-danger'>Delete</button>,
            // },

            // {
            //     name: 'Hope Fuentes',
            //     position: 'Secretary',
            //     office: 'San Francisco',
            //     age: '41',
            //     date: '2010/02/12',
            //     salary: '$109', update: <button className='btn btn-warning'>Update</button>,
            //     delete: <button className='btn btn-danger'>Delete</button>,
            // },
            // {
            //     name: 'Vivian Harrell',
            //     position: 'Financial Controller',
            //     office: 'San Francisco',
            //     age: '62',
            //     date: '2009/02/14',
            //     salary: '$452', update: <button className='btn btn-warning'>Update</button>,
            //     delete: <button className='btn btn-danger'>Delete</button>,
            // },
            // {
            //     name: 'Timothy Mooney',
            //     position: 'Office Manager',
            //     office: 'London',
            //     age: '37',
            //     date: '2008/12/11',
            //     salary: '$136', update: <button className='btn btn-warning'>Update</button>,
            //     delete: <button className='btn btn-danger'>Delete</button>,
            // },
            // {
            //     name: 'Jackson Bradshaw',
            //     position: 'Director',
            //     office: 'New York',
            //     age: '65',
            //     date: '2008/09/26',
            //     salary: '$645', update: <button className='btn btn-warning'>Update</button>,
            //     delete: <button className='btn btn-danger'>Delete</button>,
            // },
            // {
            //     name: 'Olivia Liang',
            //     position: 'Support Engineer',
            //     office: 'Singapore',
            //     age: '64',
            //     date: '2011/02/03',
            //     salary: '$234', update: <button className='btn btn-warning'>Update</button>,
            //     delete: <button className='btn btn-danger'>Delete</button>,
            // }
        ] : rowData
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
        <>
            <MDBDataTable
                striped
                bordered
                hover
                data={data}
                style={customStyles.tableWrapper}
                responsive
            />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ถามอีกครั้งสำหรับการลบข้อมูล</Modal.Title>
                </Modal.Header>
                <Modal.Body>ID : {modalId} ({modalType}) <br /> ประเภท : {modalMoneyType}<br />จำนวนเงิน : {modalMoney} บาท</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        ปิด
                    </Button>
                    <Button variant="danger" onClick={deleteSubmit} >
                        ลบข้อมูล
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    );
}

export default DatatablePage;