
const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

router.post('/pop', async (req, res) => {
    const sessionId = req.sessionID;
    let sessionData = await Session.findOne({ sessionId });

    if (!sessionData) {
        sessionData = new Session({ sessionId });
    }

    const now = new Date();
    const timeDiff = (now - sessionData.lastPopTime) / 1000;

    if (timeDiff <= 2) { 
        sessionData.multiplier += 1; 
    } else {
        sessionData.multiplier = 1;
    }

    sessionData.popCount += 1 * sessionData.multiplier;
    sessionData.lastPopTime = now;

    await sessionData.save();

    res.json({
        popCount: sessionData.popCount,
        multiplier: sessionData.multiplier
    });
});

router.get('/score', async (req, res) => {
    const sessionId = req.sessionID;
    const sessionData = await Session.findOne({ sessionId });

    if (!sessionData) {
        return res.json({ popCount: 0, multiplier: 1 });
    }

    res.json({
        popCount: sessionData.popCount,
        multiplier: sessionData.multiplier
    });
});

module.exports = router;
