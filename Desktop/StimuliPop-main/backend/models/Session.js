
const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },
    popCount: { type: Number, default: 0 },
    multiplier: { type: Number, default: 1 },
    lastPopTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Session', SessionSchema);
