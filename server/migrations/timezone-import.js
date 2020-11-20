require('dotenv').config();
const mongoose = require('mongoose');
const Timezone = require('../models/timezone');
const timezoneService = require('../services/timezones');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

mongoose
  .connect(process.env.NODE_APP_MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

timezoneService.getTimezones().then(async (response) => {
  let retries = [];
  for (element of response.data) {
    try {
      console.log('Migrating: ', element);
      const timezone = await timezoneService.getTimezonesByName(element);
      await new Timezone({ ...timezone.data }).save();
      await sleep(200);
    } catch (e) {
      retries.push(element);
    }
  }
  for (let i = 0; i < 3; i++) {
    let auxRet = [];
    for (element of retries) {
      try {
        console.log('Retry: ', element);
        const timezone = await timezoneService.getTimezonesByName(element);
        await new Timezone({ ...timezone.data }).save();
        await sleep(200);
      } catch (e) {
        auxRet.push(element);
      }
    }
    retries = auxRet;
  }
  console.log('Timezones fetched: ',response.data.length);
  console.log('Timezones migrated: ',Timezone.count());
  return Promise.resolve();
});
