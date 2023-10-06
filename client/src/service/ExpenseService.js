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


export { createExpenseWithUserId, };

