# GrowthPro Backend (Node.js + Express)

## Complete Backend Implementation

Create a new folder called `growthpro-backend` and add these files:

### package.json
```json
{
  "name": "growthpro-backend",
  "version": "1.0.0",
  "description": "GrowthPro Backend API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### server.js
```javascript
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample SEO headlines templates
const headlineTemplates = [
  "Top-Rated {name} in {location} - Trusted by {reviews}+ Happy Customers",
  "{name} - {location}'s Premier Choice with {rating}★ Rating", 
  "Best {name} Experience in {location} - {reviews} Five-Star Reviews",
  "{name}: {location}'s Most Trusted Business Since Day One",
  "Premium {name} Services in {location} - Rated {rating}/5 Stars",
  "{name} - Leading {location} Business with Exceptional {rating}★ Rating",
  "Discover Why {name} is {location}'s #1 Choice - {reviews} Reviews",
  "{name}: Your Go-To {location} Destination for Excellence"
];

// Helper functions
const generateRating = () => {
  // Generate ratings between 4.0 and 5.0 for realistic business ratings
  return parseFloat((Math.random() * 1 + 4).toFixed(1));
};

const generateReviews = () => {
  // Generate review counts between 50 and 500
  return Math.floor(Math.random() * 450) + 50;
};

const generateHeadline = (name, location, rating, reviews) => {
  const template = headlineTemplates[Math.floor(Math.random() * headlineTemplates.length)];
  return template
    .replace('{name}', name)
    .replace('{location}', location) 
    .replace('{rating}', rating.toString())
    .replace('{reviews}', reviews.toString());
};

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'GrowthPro API is running!',
    timestamp: new Date().toISOString()
  });
});

// POST /business-data - Accept business info and return simulated data
app.post('/business-data', (req, res) => {
  try {
    const { name, location } = req.body;
    
    // Validation
    if (!name || !location) {
      return res.status(400).json({
        error: 'Both name and location are required'
      });
    }

    if (typeof name !== 'string' || typeof location !== 'string') {
      return res.status(400).json({
        error: 'Name and location must be strings'
      });
    }

    if (name.trim().length === 0 || location.trim().length === 0) {
      return res.status(400).json({
        error: 'Name and location cannot be empty'
      });
    }

    // Generate simulated data
    const rating = generateRating();
    const reviews = generateReviews();
    const headline = generateHeadline(name.trim(), location.trim(), rating, reviews);

    // Simulate processing delay (optional)
    setTimeout(() => {
      res.json({
        name: name.trim(),
        location: location.trim(),
        rating,
        reviews,
        headline,
        timestamp: new Date().toISOString()
      });
    }, 500);

  } catch (error) {
    console.error('Error in /business-data:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// GET /regenerate-headline - Generate new headline for existing business
app.get('/regenerate-headline', (req, res) => {
  try {
    const { name, location } = req.query;
    
    // Validation
    if (!name || !location) {
      return res.status(400).json({
        error: 'Both name and location query parameters are required'
      });
    }

    if (typeof name !== 'string' || typeof location !== 'string') {
      return res.status(400).json({
        error: 'Name and location must be strings'
      });
    }

    if (name.trim().length === 0 || location.trim().length === 0) {
      return res.status(400).json({
        error: 'Name and location cannot be empty'
      });
    }

    // Generate new rating and reviews for variety
    const rating = generateRating();
    const reviews = generateReviews();
    const headline = generateHeadline(name.trim(), location.trim(), rating, reviews);

    // Simulate processing delay (optional)
    setTimeout(() => {
      res.json({
        headline,
        timestamp: new Date().toISOString()
      });
    }, 300);

  } catch (error) {
    console.error('Error in /regenerate-headline:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GrowthPro API server running on http://localhost:${PORT}`);
  console.log(`📝 Available endpoints:`);
  console.log(`   GET  /                    - Health check`);
  console.log(`   POST /business-data      - Submit business data`);
  console.log(`   GET  /regenerate-headline - Generate new headline`);
});

module.exports = app;
```

### README.md (Backend)
```markdown
# GrowthPro Backend

Express.js backend for the GrowthPro business dashboard application.

## Features

- **CORS enabled** for frontend communication
- **Business data simulation** with realistic ratings and reviews
- **AI-style SEO headline generation** with multiple templates
- **Form validation** and error handling
- **No database required** - pure simulation

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   
   Or for production:
   ```bash
   npm start
   ```

3. **Server will run on:** `http://localhost:3001`

## API Endpoints

### POST /business-data
Submit business information and receive simulated analytics.

**Request Body:**
```json
{
  "name": "Joe's Pizza",
  "location": "New York, NY"
}
```

**Response:**
```json
{
  "name": "Joe's Pizza",
  "location": "New York, NY", 
  "rating": 4.7,
  "reviews": 234,
  "headline": "Top-Rated Joe's Pizza in New York, NY - Trusted by 234+ Happy Customers",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

### GET /regenerate-headline
Generate a new SEO headline for an existing business.

**Query Parameters:**
- `name` (required) - Business name
- `location` (required) - Business location

**Example:**
```
GET /regenerate-headline?name=Joe's Pizza&location=New York, NY
```

**Response:**
```json
{
  "headline": "Best Joe's Pizza Experience in New York, NY - 156 Five-Star Reviews",
  "timestamp": "2024-01-20T10:35:00.000Z"
}
```

## Error Handling

All endpoints include proper error handling:
- **400** - Bad Request (missing/invalid parameters)
- **404** - Route not found
- **500** - Internal server error

## Development

The server uses `nodemon` for auto-reloading during development. Make changes to the code and the server will automatically restart.

## Testing

You can test the endpoints using:
- **Postman** - Import and test the API endpoints
- **curl** - Command line testing
- **Your frontend app** - Connect from React app running on port 5173/8080
```

## Setup Instructions

1. **Create backend folder:**
   ```bash
   mkdir growthpro-backend
   cd growthpro-backend
   ```

2. **Initialize and install:**
   ```bash
   npm init -y
   npm install express cors
   npm install -D nodemon
   ```

3. **Copy the files above** into your `growthpro-backend` folder

4. **Start the backend:**
   ```bash
   npm run dev
   ```

5. **Update frontend API calls** (in `src/lib/api.ts`) - uncomment the `realAPI` functions and replace `mockAPI` with `realAPI` in your React components.

The backend will run on `http://localhost:3001` and your React frontend will run on `http://localhost:8080` with full CORS support.