// RateLimiterStore is a class that use the RateLimiterQueue class for each customer
import { RateLimiterQueue } from "./RateLimiterQueue";

export class RateLimiterStore {
  static store: { [key: string]: RateLimiterQueue } = {};
  static limit: number = 3;
  static interval: number = 1000;
  static getRateLimiterQueue(customerId: string) {
    if (!this.store[customerId]) {
      this.store[customerId] = new RateLimiterQueue(this.limit, this.interval);
    }
    return this.store[customerId];
  }
  static rateLimit(customerId: string): boolean {
    return this.getRateLimiterQueue(customerId).enqueue();
  }
}
