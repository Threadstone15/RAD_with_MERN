const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Tutor = require("../models/Teacher");
const Payment = require("../models/Payment");
const Class = require("../models/Class");

const AuthMiddleware = require("../middleware/AuthMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.use(AuthMiddleware);

router.get('/fetchTutorData/:tutorID', async (req, res) => {
    console.log("Got a request to fetchTutorData");
    try {
        const {tutorID } = req.params;
        const tutorObjectId = new mongoose.Types.ObjectId(tutorID);

        console.log(`Fetching tutor with ID: ${tutorObjectId}`);

        const tutor = await Tutor.findById(tutorObjectId).populate("classIds");

        if (!tutor) {
            console.log(`Tutor with ID: ${tutorID} not found in database`);
            return res.status(404).json({ error: 'Tutor not found' });
        }

        console.log("Tutor  found:", tutor);
        res.json(tutor);
    } catch (error) {
        console.error("Error fetching tutor:", error);
    }
    
})




module.exports = router;