const mongoose = require('mongoose');

const TimezoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Timezone = mongoose.model('timezone', TimezoneSchema);

module.exports = Timezone;
