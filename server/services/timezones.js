const api = require('../config/api');

exports.getTimezones = () => api.get('/timezones');

exports.getTimezonesByName = name => api.get(`/timezone/${name}`);
