const axios = require('axios');

const baseURL = process.env.NODE_APP_TIMEZONE_API;
const api = axios.create({
  baseURL,
});

module.exports = api;
