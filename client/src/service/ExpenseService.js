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
                // month: month
            }
        });
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};


export { createExpenseWithUserId, getAllExpensesInYearByUserId, getAllExpenseInYearWithTypesByUserId };

