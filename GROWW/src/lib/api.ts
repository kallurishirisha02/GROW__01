// Mock API service to simulate backend calls
// In a real app, these would be actual HTTP requests to your Express server

interface BusinessData {
  name: string;
  location: string;
  rating: number;
  reviews: number;
  headline: string;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

const generateRating = (): number => {
  // Generate ratings between 4.0 and 5.0 for realistic business ratings
  return parseFloat((Math.random() * 1 + 4).toFixed(1));
};

const generateReviews = (): number => {
  // Generate review counts between 50 and 500
  return Math.floor(Math.random() * 450) + 50;
};

const generateHeadline = (name: string, location: string, rating: number, reviews: number): string => {
  const template = headlineTemplates[Math.floor(Math.random() * headlineTemplates.length)];
  return template
    .replace('{name}', name)
    .replace('{location}', location)
    .replace('{rating}', rating.toString())
    .replace('{reviews}', reviews.toString());
};

export const mockAPI = {
  // Simulate POST /business-data
  async submitBusinessData(data: { name: string; location: string }): Promise<BusinessData> {
    // Simulate network delay
    await sleep(1500);
    
    const rating = generateRating();
    const reviews = generateReviews();
    const headline = generateHeadline(data.name, data.location, rating, reviews);
    
    return {
      name: data.name,
      location: data.location,
      rating,
      reviews,
      headline
    };
  },

  // Simulate GET /regenerate-headline
  async regenerateHeadline(name: string, location: string, rating: number, reviews: number): Promise<string> {
    // Simulate network delay
    await sleep(800);
    
    return generateHeadline(name, location, rating, reviews);
  }
};

// Real API functions (commented out - these would connect to your Express backend)
/*
export const realAPI = {
  async submitBusinessData(data: { name: string; location: string }): Promise<BusinessData> {
    const response = await fetch('http://localhost:3001/business-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit business data');
    }
    
    return response.json();
  },

  async regenerateHeadline(name: string, location: string): Promise<{ headline: string }> {
    const response = await fetch(
      `http://localhost:3001/regenerate-headline?name=${encodeURIComponent(name)}&location=${encodeURIComponent(location)}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to regenerate headline');
    }
    
    return response.json();
  }
};
*/