const timezoneService = require('../services/timezones');
const Timezone = require('../models/timezone');

exports.getAllTimezones = (req, res) =>
  Timezone.find({
    ...(req.query.name ? { name: new RegExp(req.query.name) } : {}),
  })
    .limit(10)
    .then((timezones) => {
      res.send(timezones.map((timezone) => timezone.name));
    });

exports.getTimezone = (req, res) => {
  timezoneService.getTimezonesByName(req.params.name).then((response) => {
    res.send(response.data);
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
