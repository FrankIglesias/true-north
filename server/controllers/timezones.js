const timezoneService = require('../services/timezones');
const moment = require('moment');
const Timezone = require('../models/timezone');

const interactor = process.env.NODE_APP_FETCH_MODE  === 'db' ? Timezone : timezoneService; 

exports.getAllTimezones = (req, res) => {
  interactor.getTimezones(req.query.name).then((timezones) => {
    res.send(timezones.map((timezone) => timezone.timezone));
    });
  }

exports.getTimezone = (req, res) => {
  interactor.getTimezone(req.params.name).then((timezone) => {
    if(!timezone) {
      res.status(404).send();
    }
    res.send({
      ...timezone,
      datetime: moment().utc().utcOffset(timezone.utc_offset).format(),
    });
  }).catch(e => {
    res.status(404).send();
  });
};

exports.updateTimezone = (req, res) => {
  console.log(`Timezone: ${req.params.name} updated`);
  res.status(200).send();
};

exports.deleteTimezone = (req, res) => {
  console.log(`Timezone: ${req.params.name} deleted`);
  res.status(200).send();
};
