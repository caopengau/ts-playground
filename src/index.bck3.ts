import { RateLimitTracker } from "./RateLimitTracker";

const makeRequest = (customerId: string) => {
  if (!RateLimitTracker.rateLimit(customerId)) {
    return false;
  }
  RateLimitTracker.increment(customerId);
  return true;
};

const main = () => {
  for (let i = 0; i < 10; i++) {
    const customerId = "customer" + i;
    const randomRequestCount = Math.ceil(Math.random() * 10);
    let allowedCount = 0;
    for (let j = 0; j < randomRequestCount; j++) {
      const allowed = makeRequest(customerId);
      if (allowed) {
        allowedCount += 1;
      }
    }

    console.log(`Customer ${customerId} made ${allowedCount}/${randomRequestCount} requests`);
    console.log("---------------");
  }
};

main();
