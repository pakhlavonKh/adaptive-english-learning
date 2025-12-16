import axios from 'axios';
const API = axios.create({ 
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
});

export const register = (username, password) => API.post('/register', { username, password }).then(r => r.data);
export const login = (username, password) => API.post('/login', { username, password }).then(r => r.data);
export const getNextQuestion = (token) => API.get('/next-question', { 
  headers: { 
    Authorization: `Bearer ${token}`,
    'Cache-Control': 'no-cache'
  } 
}).then(r => r.data);
export const submit = (token, questionId, correct) => API.post('/submit', { questionId, correct }, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
export const seed = () => API.get('/seed').then(r => r.data);
export const getLearningPath = (token) => API.get('/learning-path', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
export const getModule = (token, id) => API.get(`/module/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
export const createModule = (data) => API.post('/module', data).then(r => r.data);

// Path generation endpoints
export const generateInitialPath = (token, options = {}) => API.post('/path/generate', options, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
export const checkNeedsGeneration = (token) => API.get('/path/needs-generation', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
export const regeneratePath = (token) => API.post('/path/regenerate', {}, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
