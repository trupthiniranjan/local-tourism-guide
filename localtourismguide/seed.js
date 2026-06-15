const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Place = require('./models/Place'); // Ensure this path matches your model location

dotenv.config();

const places = [
  {
    name: "Jog Falls",
    type: "Waterfall",
    description: "The magnificent Sharavathi river dropping from a height of 830 ft.",
    location: "Sagar Taluk",
    rating: 4.8,
    bestTimeToVisit: "August to December",
    entryFee: "₹10",
    imageUrl: "https://images.unsplash.com/photo-1626002633453-61b608930438?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Sakrebyle Elephant Camp",
    type: "Wildlife",
    description: "Watch elephants being bathed and fed in their natural habitat.",
    location: "Shivamogga-Thirthahalli Road",
    rating: 4.5,
    bestTimeToVisit: "October to March",
    entryFee: "₹50",
    imageUrl: "https://images.unsplash.com/photo-1585938389612-a552a28d6914?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Kavaledurga Fort",
    type: "Historical",
    description: "A misty trek to a 9th-century fort with 7 layers of granite walls.",
    location: "Thirthahalli",
    rating: 4.7,
    bestTimeToVisit: "September to February",
    entryFee: "Free",
    imageUrl: "https://images.unsplash.com/photo-1610471925333-7808940562e5?auto=format&fit=crop&q=80&w=800"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Optional: Clear existing data so you don't get duplicates
    await Place.deleteMany({});
    console.log("Old data cleared.");

    await Place.insertMany(places);
    console.log("Shivamogga tourism data seeded successfully! 🌲");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seedDB();