const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
	temp: Number,
	humid: Number,
	time: Number
});

module.exports = mongoose.model('Log', logSchema);