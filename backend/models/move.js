const mongoose = require('mongoose');

var MoveSchema = new mongoose.Schema({
	name: String,
	description: String,
	location: { lat: Number, lon: Number },
	updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Move', MoveSchema);