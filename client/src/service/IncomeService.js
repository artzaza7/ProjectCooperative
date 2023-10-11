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
const getIncomeByIdAndUserId = async (user_id, income_id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/income`, {
            params: {
                userId: user_id,
                incomeId: income_id
            }
        });
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

// PUT METHOD
const updateIncomeByIdAndUserId = async (user_id, income_id, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/income`, data, {
            params: {
                userId: user_id,
                incomeId: income_id
            }
        });
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

// DELETE METHOD
const deleteIncomeByIdAndUserId = async (user_id, income_id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/income`, {
            params: {
                userId: user_id,
                incomeId: income_id
            }
        });
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};


export { createIncomeWithUserId, getAllIncomesInYearByUserId, getAllIncomesInYearWithTypesByUserId, getIncomeByIdAndUserId, updateIncomeByIdAndUserId, deleteIncomeByIdAndUserId };

