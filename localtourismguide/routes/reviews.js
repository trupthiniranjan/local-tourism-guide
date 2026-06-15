const express = require('express');
const router = express.Router({ mergeParams: true });
const Place = require('../models/Place');
const Review = require('../models/Review');
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });

router.post('/', upload.array('images'), async (req, res) => {
    try {
        const { id } = req.params;
        const place = await Place.findById(id);
        if (!place) return res.status(404).json({ message: "Place not found" });

        const review = new Review({
            body: req.body.body,
            rating: Number(req.body.rating)
        });

        if (req.files) {
            review.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
        }
        await review.save();

        // Push review ID and save the place first
        place.reviews.push(review._id);
        await place.save();

        res.status(201).json(review);
    } catch (error) {
        console.error("Review Error:", error);
        res.status(500).json({ message: "Error posting review" });
    }
});

module.exports = router;