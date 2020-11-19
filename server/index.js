require('dotenv').config();
const mongoose = require('mongoose');
const app = require('express')();
const express = require('express');
const timezoneController = require('./controllers/timezones');
const cors = require('cors')
// connect to Mongo daemon
mongoose
.connect(process.env.NODE_APP_MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.get('/timezones', timezoneController.getAllTimezones);
app.get('/timezones/:name', timezoneController.getTimezone);
app.put('/timezones/:name', timezoneController.updateTimezone);
app.delete('/timezones/:name', timezoneController.deleteTimezone);

const port = 3000;
app.listen(port, () => console.log('Server running...'));
