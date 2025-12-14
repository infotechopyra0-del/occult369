// Base CRUD Service for API interactions
// This is a mock implementation - replace with your actual API integration

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export class BaseCrudService {
  private static baseURL = process.env.NEXT_PUBLIC_API_URL || '/api';

  /**
   * Get all items from a collection with pagination
   */
  static async getAll<T>(collection: string, params?: Record<string, unknown>): Promise<PaginatedResponse<T>> {
    try {
      // Mock data for development - params would be used in real API
      console.log('Fetching collection:', collection, params ? 'with params' : '');
      return this.getMockData<T>(collection);
    } catch (error) {
      console.error(`Error fetching ${collection}:`, error);
      throw error;
    }
  }

  /**
   * Get a single item by ID
   */
  static async getById<T>(collection: string, id: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}/admin/${collection}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch item');
      const data = await response.json();
      return data.service || data.item || data;
    } catch (error) {
      console.error(`Error fetching ${collection} by ID:`, error);
      throw error;
    }
  }

  /**
   * Create a new item
   */
  static async create<T>(collection: string, data: Partial<T>): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}/admin/${collection}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create item');
      const result = await response.json();
      return result.service || result.item || result;
    } catch (error) {
      console.error(`Error creating ${collection}:`, error);
      throw error;
    }
  }

  /**
   * Update an existing item
   */
  static async update<T>(collection: string, id: string, data: Partial<T>): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}/admin/${collection}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update item');
      const result = await response.json();
      return result.service || result.item || result;
    } catch (error) {
      console.error(`Error updating ${collection}:`, error);
      throw error;
    }
  }

  /**
   * Delete an item
   */
  static async delete(collection: string, id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseURL}/admin/${collection}?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete item');
    } catch (error) {
      console.error(`Error deleting ${collection}:`, error);
      throw error;
    }
  }

  /**
   * Mock data for development
   * Replace this with actual API calls in production
   */
  private static getMockData<T>(collection: string): PaginatedResponse<T> {
    const mockData: Record<string, unknown> = {
      testimonials: {
        items: [
          {
            _id: '1',
            customerName: 'Priya Sharma',
            customerPhoto: '/images/PriyaSharma.png',
            testimonialText: 'A miracle has happened in my life! After the Numerology reading, I found my true path. All the struggles that had been going on for years have ended. My business is flourishing and my relationships have become sweeter too. This was truly a divine experience. 🙏✨',
            rating: 5,
            serviceMentioned: 'Life Path Analysis',
            date: '2024-10-15',
          },
          {
            _id: '2',
            customerName: 'Rajesh Kumar',
            customerPhoto: '/images/RajeshKumar.png',
            testimonialText: 'The Sacred 369 reading completely transformed my life! This method based on Tesla\'s principles is amazing. My business has achieved unprecedented success and I am experiencing inner peace. This is not just a reading, but a spiritual awakening. Every Indian should get this done. 🕉️',
            rating: 5,
            serviceMentioned: 'Sacred 369 Reading',
            date: '2024-10-22',
          },
          {
            _id: '3',
            customerName: 'Anita Gupta',
            customerPhoto: '/images/AnitaGupta.png',
            testimonialText: 'The years-long differences between me and my husband ended after the Relationship Compatibility reading. The information based on our names and birth dates brought love and understanding back into our relationship. This is the modern form of Vedic knowledge. Thank you! 💕🌸',
            rating: 5,
            serviceMentioned: 'Relationship Compatibility',
            date: '2024-11-01',
          },
        ],
        total: 3,
        page: 1,
        pageSize: 10
      }
    };

    return (mockData[collection] as PaginatedResponse<T>) || { items: [], total: 0, page: 1, pageSize: 10 };
  }
}
