import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:4000/api' });

export const register = (username, password) => API.post('/register', { username, password }).then(r => r.data);
export const login = (username, password) => API.post('/login', { username, password }).then(r => r.data);
export const getNextQuestion = (token) => API.get('/next-question', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
export const submit = (token, questionId, correct) => API.post('/submit', { questionId, correct }, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
export const seed = () => API.get('/seed').then(r => r.data);
