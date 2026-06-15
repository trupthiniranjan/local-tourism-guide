const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. Force registration of models so .populate() works
require('./models/Review'); 
require('./models/Place');  

const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Shivamogga DB Connected Successfully"))
  .catch((err) => console.log("❌ DB Connection Error: ", err));

// 4. Route Imports
const placeRoutes = require('./routes/placeRoutes');
const reviewRoutes = require('./routes/reviews');

// 5. Routes
app.use('/api/places', placeRoutes);
app.use('/api/places/:id/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.send("Shivamogga Tourism API is Running!");
});

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
}); //updated bt Trupthi Niranjan
