

const Place = require('../models/Place');

// Get all tourism spots
exports.getAllPlaces = async (req, res) => {
    try {
        const places = await Place.find();
        res.status(200).json(places);
    } catch (error) {
        res.status(500).json({ message: "Error fetching places", error });
    }
};

// Add a new spot (Useful for admin or initial data seeding)
exports.createPlace = async (req, res) => {
    try {
        const newPlace = new Place(req.body);
        const savedPlace = await newPlace.save();
        res.status(201).json(savedPlace);
    } catch (error) {
        res.status(400).json({ message: "Error saving place", error });
    }
};