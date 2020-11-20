const timezoneService = require('../services/timezones');
const moment = require('moment');
const Timezone = require('../models/timezone');

exports.getAllTimezones = (req, res) =>
  Timezone.find({
    ...(req.query.name ? { timezone: new RegExp(req.query.name, 'i') } : {}),
  })
    .limit(10)
    .then((timezones) => {
      res.send(timezones.map((timezone) => timezone.timezone));
    });

exports.getTimezone = (req, res) => {
  Timezone.findOne({ timezone: req.params.name }).then((timezone) => {
    if(!timezone) {
      res.status(404).send();
    }
    res.send({
      ...timezone.toObject(),
      datetime: moment().utc().utcOffset(timezone.utc_offset).format(),
    });
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
