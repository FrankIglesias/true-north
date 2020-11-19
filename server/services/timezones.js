const api = require('../config/api');

exports.getTimezones = () => api.get('/timezone');

exports.getTimezonesByName = name => api.get(`/timezone/${name}`);
