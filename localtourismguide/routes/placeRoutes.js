const express = require('express');
const router = express.Router();
const Place = require('../models/Place');
const Review = require('../models/Review');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

// 1. GET ALL PLACES
router.get('/', async (req, res) => {
    try {
        const places = await Place.find({});
        res.json(places);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. GET SINGLE PLACE (With Population)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const place = await Place.findById(id).populate('reviews');
        
        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }
        res.json(place);
    } catch (error) {
        console.error("GET Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// 3. CREATE NEW SPOT (With Stay/Cafe suggestions)
router.post('/', upload.single('image'), async (req, res) => {
    try {
        // Parse the JSON strings sent from FormData
        const nearbyStays = req.body.nearbyStays ? JSON.parse(req.body.nearbyStays) : [];
        const nearbyCafes = req.body.nearbyCafes ? JSON.parse(req.body.nearbyCafes) : [];

        const place = new Place({
            ...req.body,
            nearbyStays,
            nearbyCafes
        });

        if (req.file) {
            place.imageUrl = req.file.path;
        }

        await place.save();
        res.status(201).json(place);
    } catch (err) {
        console.error("Creation Error:", err);
        res.status(500).json({ message: err.message });
    }
});

// 4. POST REVIEW (Alternative route if you aren't using reviews.js)
router.post('/:id/reviews', upload.array('images', 4), async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);

        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }

        const review = new Review({
            body: req.body.body || "No comment provided",
            rating: Number(req.body.rating) || 5
        });

        if (req.files) {
            review.images = req.files.map(f => ({
                url: f.path,
                filename: f.filename
            }));
        }

        await review.save();
        place.reviews.push(review._id);
        await place.save();

        res.status(201).json(review);
    } catch (err) {
        console.error("Review Error:", err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;