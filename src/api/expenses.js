import axios from 'axios';

const API_URL = 'https://bead-translucent-fossa.glitch.me';

export const fetchExpenses = async () => {
  const response = await axios.get(`${API_URL}/expenses`);
  return response.data;
};

export const createExpense = async (expense) => {
  const response = await axios.post(`${API_URL}/expenses`, expense);
  return response.data;
};

export const updateExpense = async (id, expense) => {
  const response = await axios.put(`${API_URL}/expenses/${id}`, expense);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await axios.delete(`${API_URL}/expenses/${id}`);
  return response.data;
};
