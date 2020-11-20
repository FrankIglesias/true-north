const api = require('../config/api');

exports.getTimezones = (name) =>
  api
    .get('/timezones')
    .then((response) =>
      response.data
        .filter((timezone) => new RegExp(name, 'i').test(timezone))
        .map((timezone) => ({ timezone }))
    );

exports.getTimezone = (name) =>
  api.get(`/timezone/${name}`).then((response) => response.data);
