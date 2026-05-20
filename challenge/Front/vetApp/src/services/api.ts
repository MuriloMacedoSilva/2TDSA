import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-challenge-clyvo.onrender.com/',
  timeout: 60000,
})

// http://localhost:8080/

// https://api-challenge-clyvo.onrender.com/