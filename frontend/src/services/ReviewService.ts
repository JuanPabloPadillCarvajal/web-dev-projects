import type { ReviewInterface } from '@/interfaces/ReviewInterface'; 

import { useReviewStore } from '@/stores/reviewstore.js'; 

 

export class ReviewService { 

  static getReviews(): ReviewInterface[] { 

    return useReviewStore().reviews; 

  } 

 

  static getReviewsByBookId(bookId: number): ReviewInterface[] { 

    return useReviewStore().reviews.filter((review) => review.bookId === bookId); 

  } 

 

  static createReview(review: Omit<ReviewInterface, 'id'>): void { 

    const store = useReviewStore(); 

    const nextId = 

      store.reviews.length > 0 ? Math.max(...store.reviews.map((r) => r.id), 0) + 1 : 1; 

    store.reviews.push({ 

      id: nextId, 

      ...review, 

      createdAt: new Date().toISOString(), 

    }); 

  } 

} 
import type { ReviewInterface } from '@/interfaces/ReviewInterface';

import axios from 'axios';


export class ReviewService {

private static readonly API_URL =
  'https://friendly-enigma-r449w5vj5v9r2rpg-3000.app.github.dev/api/reviews';


static async getReviews(): Promise<ReviewInterface[]> {

const { data } = await axios.get(this.API_URL);

return data;

}


static async getReviewsByBookId(bookId: number): Promise<ReviewInterface[]> {

const { data } = await axios.get(`${this.API_URL}/book/${bookId}`);

return data;

}


static async createReview(review: Omit<ReviewInterface, 'id'>): Promise<ReviewInterface> {

const { data } = await axios.post(this.API_URL, review);

return data;

}

}
 

 