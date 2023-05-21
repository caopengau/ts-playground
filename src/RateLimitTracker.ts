export class RateLimitTracker {
  private static store: any;
  public static readonly limit = 5;

  constructor(store: any) {
    RateLimitTracker.store = store;
  }

  static getStore() {
    if (!this.store) {
      return new RateLimitTracker({});
    }
    return this.store;
  }

  static get(key: string) {
    return RateLimitTracker.getStore()[key];
  }

  static set(key: string, value: any) {
    RateLimitTracker.getStore()[key] = value;
  }

  static reset() {
    RateLimitTracker.store = {};
  }

  static increment(key: string) {
    const value = RateLimitTracker.getStore()[key];
    if (value) {
      RateLimitTracker.getStore()[key] = value + 1;
    } else {
      RateLimitTracker.getStore()[key] = 1;
    }
  }

  static rateLimit(key: string) {
    const value = RateLimitTracker.getStore()[key];
    if (value) {
      return value < RateLimitTracker.limit;
    }
    return true;
  }
}
