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

// Get METHOD
const getAllIncomesInYearByUserId = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/income/year/months`, {
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
const getAllIncomesInYearWithTypesByUserId = async (month, id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/income/months/${month}/types`, {
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


export { createIncomeWithUserId, getAllIncomesInYearByUserId, getAllIncomesInYearWithTypesByUserId };

