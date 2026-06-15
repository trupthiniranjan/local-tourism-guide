# 🌿 Local Tourism Guide - Shivamogga

A full-featured tourism management backend built using Node.js, Express.js, and MongoDB. The application helps users discover tourist destinations in Shivamogga, view detailed information about attractions, upload images, explore nearby stays and cafes, and share reviews and ratings.

## 🚀 Features

### 🏞 Tourism Place Management
- Add and manage tourist destinations
- Store place descriptions and categories
- Display best time to visit
- Entry fee information
- Google Maps integration

### ⭐ Review & Rating System
- Add reviews for tourist places
- Upload multiple review images
- Automatic average rating calculation
- Review history tracking

### 📷 Cloud Image Storage
- Image upload using Multer
- Cloudinary integration for image storage
- Secure media management

### 🏨 Nearby Recommendations
- Nearby stays and hotels
- Nearby cafes and restaurants
- Price range information
- External booking/map links

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Cloud Services
- Cloudinary

### Middleware
- Multer
- CORS
- Dotenv

## 📂 Project Structure

```
local-tourism-guide/
│
├── models/
│   ├── Place.js
│   └── Review.js
│
├── routes/
│   ├── placeRoutes.js
│   └── reviews.js
│
├── controllers/
│   └── placeController.js
│
├── cloudinary/
│
├── index.js
├── seed.js
├── package.json
└── .env
```

## 🌟 Main Functionalities

### Tourist Places
- Create new tourist places
- View all tourist attractions
- View place details
- Categorize attractions:
  - Waterfalls
  - Wildlife
  - Historical Sites
  - Nature & Religious Places
  - Trekking Destinations
  - Parks

### Reviews
- Add ratings
- Upload review photos
- Store review history
- Calculate average ratings

### Media Upload
- Upload destination images
- Upload review images
- Cloud-based storage support

## 📡 API Endpoints

### Places

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /api/places | Get all places |
| GET | /api/places/:id | Get place details |
| POST | /api/places | Add a new place |

### Reviews

| Method | Endpoint |
|----------|----------|
| POST | /api/places/:id/reviews |

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/trupthiniranjan/local-tourism-guide.git
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

```env
MONGO_URI=your_mongodb_uri

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

### Start Server

```bash
node index.js
```

## 🔮 Future Enhancements

- User Authentication
- Admin Dashboard
- Travel Recommendation Engine
- AI-based Place Suggestions
- Weather Information
- Tourist Route Planning

## 👩‍💻 Author

**Trupthi Niranjan**

Information Science & Engineering Student


