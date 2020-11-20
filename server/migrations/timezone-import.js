require('dotenv').config();
const mongoose = require('mongoose');
const Timezone = require('../models/timezone');
const timezoneService = require('../services/timezones');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getAndPersistTimezone() {
  const timezone = await timezoneService.getTimezone(element.timezone);
  await new Timezone({ ...timezone }).save();
  return await sleep(200);
}

mongoose
  .connect(process.env.NODE_APP_MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

timezoneService.getTimezones().then(async (timezones) => {
  let retries = [];
  for (element of timezones) {
    try {
      await getAndPersistTimezone(element.timezone)
      console.log('Migrated: ', element.timezone);
    } catch (e) {
      retries.push(element.timezone);
    }
  }

  for (let i = 0; i < 3; i++) {
    let auxRet = [];
    for (element of retries) {
      try {
        console.log('Retrying: ', element);
        getAndPersistTimezone(element);
      } catch (e) {
        auxRet.push(element);
      }
    }
    retries = auxRet;
  }

  const timezonesCount = await Timezone.estimatedDocumentCount();
  console.log('Timezones fetched: ', timezones.length);
  console.log('Timezones migrated: ',  timezonesCount);
  return Promise.resolve();
});
