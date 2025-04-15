// api.js
import axios from 'axios';

const BASE_URL = 'https://fastapi-6txf.onrender.com';

export const getTasks = () => axios.get(`${BASE_URL}/tasks`);
export const createTask = (task) => axios.post(`${BASE_URL}/tasks`, task);
export const updateTask = (id, task) => axios.put(`${BASE_URL}/tasks/${id}`, task);
export const deleteTask = (id) => axios.delete(`${BASE_URL}/tasks/${id}`);
