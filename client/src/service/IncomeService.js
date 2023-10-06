import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// POST METHOD
const createIncomeWithUserId = async (id, data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/income/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};


export { createIncomeWithUserId, };

