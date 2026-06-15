const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const placeSchema = new Schema({
  name: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['Waterfall', 'Wildlife', 'Historical', 'Nature/Religious', 'Trekking', 'Park'] 
  },
  description: String,
  averageRating: { type: Number, default: 0 },
  bestTimeToVisit: { type: String }, 
  entryFee: { type: String, default: "Free" }, 
  // Add these to your placeSchema in models/Place.js
  nearbyStays: [
    {
      name: String,
      link: String, // Google Maps or Booking link
      priceRange: String // e.g., "₹2000 - ₹4000"
    }
  ],
  nearbyCafes: [
    {
      name: String,
      link: String,
      specialty: String // e.g., "Authentic Malnad Coffee"
    }
  ],
  imageUrl: { type: String },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review' // Mongoose now knows exactly what this refers to
    }
  ],
  mapUrl: { type: String, required: false }
});

module.exports = mongoose.model('Place', placeSchema);