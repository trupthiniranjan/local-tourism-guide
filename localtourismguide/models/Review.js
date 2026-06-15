const express = require('express');
// mergeParams: true is CRITICAL because the :id is defined in the main app.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String, 
    rating: Number,
    images: [
        {
            url: String,
            filename: String
        }
    ],
    createdAt: { type: Date, default: Date.now }
});
const router = express.Router({ mergeParams: true }); 
const Place = require('../models/Place');
const Review = require('../models/Review');
const { storage } = require('../cloudinary'); // Path to your cloudinary/index.js
const multer = require('multer');
const upload = multer({ storage });

router.post('/', upload.array('images'), async (req, res) => {
    try {
        const { id } = req.params;
        const place = await Place.findById(id);

        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }

        // 1. Create the review from text data
        const review = new Review({
            body: req.body.body,
            rating: Number(req.body.rating)
        });

        // 2. Attach Cloudinary image data if files were uploaded
        if (req.files) {
            review.images = req.files.map(f => ({
                url: f.path,
                filename: f.filename
            }));
        }

        // 3. Save review and link to the place
        await review.save();
        place.reviews.push(review._id);

        // 4. Calculate New Average Rating
        // We populate reviews to get the latest rating values
        const updatedPlace = await Place.findById(id).populate('reviews');
        const totalReviews = updatedPlace.reviews.length;
        
        if (totalReviews > 0) {
            const sum = updatedPlace.reviews.reduce((acc, rev) => acc + (rev.rating || 0), 0);
           updatedPlace.averageRating = Number((sum / totalReviews).toFixed(1));
        }

        await updatedPlace.save();

        res.status(201).json(review);
    } catch (error) {
        console.error("Review Error:", error);
        res.status(500).json({ message: "Failed to post review" });
    }
});

module.exports = mongoose.model('Review', reviewSchema);