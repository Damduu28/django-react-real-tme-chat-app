import axios from "axios"
import axiosInstance from "../../api/axiosInstance"
import { API_URL } from "../../api/config"
import mem from "mem";
import { userStatusUpdate } from "../../constant";

const login = async ({ email, password }) => {
    const response = await axios.post(`${API_URL}/token/`, { email, password })
    localStorage.setItem('chatAuthToken', JSON.stringify(response.data))
    // console.log('Data: ', response.data)

    return response.data
}

const logout = async (userId) => {
    const response = await axios.put(userStatusUpdate(userId))
    return response.data
}

const register = async (formData) => {
    // console.log('User Data:', { ...formData });
    const response = await axios.post(`${API_URL}/users/register/`, { ...formData })
    return response.data
}

const refreshToken = async () => {
    try {
        const tokens = localStorage.getItem('chatAuthToken') ? JSON.parse(localStorage.getItem('chatAuthToken')) : null;
        // console.log(tokens)
        if (!tokens) {
            throw new Error('No refresh token available');
        }
        
        const response = await axiosInstance.post('/token/refresh/', {
            refresh: tokens.refresh,
        });

        localStorage.setItem('chatAuthToken', JSON.stringify(response.data));
        
        return response.data;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshToken, {
    maxAge,
});

const authService = {
    login,
    logout,
    register,
    memoizedRefreshToken,
}

export default authService