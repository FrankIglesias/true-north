const mongoose = require('mongoose');

const TimezoneSchema = new mongoose.Schema({
  timezone: {
    type: String,
    required: true,
  },
  abbreviation: {
    type: String,
    required: true,
  },
  raw_offset: {
    type: Number,
    required: true,
  },
  utc_offset: {
    type: String,
    required: true, 
  }
});


const Timezone = mongoose.model('timezone', TimezoneSchema);

Timezone.getTimezones = (name) =>
  Timezone.find({
    ...(name ? { timezone: new RegExp(name, 'i') } : {}),
  }).limit(10);

Timezone.getTimezone = (name) =>
  Timezone.findOne({ timezone: name }).then((response) => response.toObject());

module.exports = Timezone;
