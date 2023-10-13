import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// GET METHOD
const getMoneyByUserId = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/money/${id}`);
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

// GET METHOD
const getStackGraph = async (id, month) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/alltype/${month}`, {
            params:{
                month: month,
                id: id
            }
        });
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

export { getMoneyByUserId, getStackGraph };

