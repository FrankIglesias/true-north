require('dotenv').config();
const mongoose = require('mongoose');
const Timezone = require('../models/timezone');
const timezoneService = require('../services/timezones');

mongoose
  .connect(process.env.NODE_APP_MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

timezoneService.getTimezones().then((response) => {
  Promise.all(
    response.data.map((element) => {
      const timezone = new Timezone({
        name: element,
      });
      return timezone.save();
    })
  ).then(() => {
    console.log('All Migrated');
    return;
  });
});
