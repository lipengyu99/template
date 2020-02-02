import axios from 'axios';
import Vue from 'vue';
import router from './router/index';
const http = axios.create({
    baseURL: 'http://127.0.0.1:5000/'
})
export default http