export class RateLimiterQueue {
  queue: number[];

  timestamp: number;

  limit: number;

  interval: number;

  constructor(limit: number, interval: number) {
    this.queue = [];
    this.timestamp = Date.now();
    if (limit < 1) throw new Error("limit must be greater than 0");
    this.limit = limit;
    if (interval < 1) throw new Error("interval must be greater than 0");
    this.interval = interval;
  }

  enqueue(): boolean {
    if (this.isAvailable()) {
      this.updatedQueue();
      this.queue.push(Date.now());
      return true;
    } else {
      return false;
    }
  }

  dequeue() {
    this.queue.shift();
  }

  isAvailable() {
    if (this.queue.length < this.limit) {
      return true;
    }
    const diff = Date.now() - this.queue[0];
    if (diff > this.interval) {
      return true;
    }
    return false;
  }

  updatedQueue() {
    this.queue = this.queue.filter((timestamp) => Date.now() - timestamp < this.interval);
    return this.queue;
  }
}
