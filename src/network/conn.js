import axios from 'axios';

const conn = axios.create({
    baseURL: 'https://docs.googleapis.com/v1/',
    headers: {
        'Content-Type': 'application/json',
    }
});


export {conn};