import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// POST METHOD
const register = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, data);
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

// POST METHOD
const login = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, data);
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

export { register, login };

