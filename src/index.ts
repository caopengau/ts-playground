import { RateLimiterStore } from "./RateLimiterStore";

const main = async () => {
  const fakeCustomerRequest = async (customerId: string) => {
    setInterval(() => {
      const requestCount = Math.floor(Math.random() * 5) + 1;
      let successCount = 0;
      for (let i = 0; i < requestCount; i++) {
        if (RateLimiterStore.rateLimit(customerId)) {
          successCount++;
        }
      }
      console.log(`Customer ${customerId} made ${requestCount} requests, ${successCount} succeeded.`);
      console.log("");
    }, 3000);
  };

  const customerIds = ["c1"];
  for (const customerId of customerIds) {
    await fakeCustomerRequest(customerId);
  }
};

void main();
