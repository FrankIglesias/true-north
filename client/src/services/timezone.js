import api from '../config/api';

export const getTimezoneNames = (name) =>
  api.get('/timezones', { params: { name } });

export const getTimezone = (name) =>
  api
    .get(`/timezones/${encodeURIComponent(name)}`);
