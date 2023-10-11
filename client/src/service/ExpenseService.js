import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// POST METHOD
const createExpenseWithUserId = async (id, data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/expense/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

// Get METHOD
const getAllExpensesInYearByUserId = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/expense/year/months`, {
            params: {
                id: id
            }
        });
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

// Get METHOD
const getAllExpenseInYearWithTypesByUserId = async (month, id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/expense/months/${month}/types`, {
            params: {
                id: id,
                month: month
            }
        });
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

// Get METHOD
const getExpenseByIdAndUserId = async (user_id, expense_id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/expense`, {
            params: {
                userId: user_id,
                expenseId: expense_id
            }
        });
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

// Get METHOD
const updateExpenseByIdAndUserId = async (user_id, expense_id, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/expense`, data, {
            params: {
                userId: user_id,
                expenseId: expense_id
            }
        });
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

// Delete METHOD
const deleteExpenseByIdAndUserId = async (user_id, expense_id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/expense`, {
            params: {
                userId: user_id,
                expenseId: expense_id
            }
        });
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};


export { createExpenseWithUserId, getAllExpensesInYearByUserId, getAllExpenseInYearWithTypesByUserId, getExpenseByIdAndUserId, updateExpenseByIdAndUserId, deleteExpenseByIdAndUserId };

