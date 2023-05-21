const RATE_LIMIT_X_PER_INTERVAL = 3;
const INTERVAL_TO_CLEAR_COUNTS_IN_SECONDS = 3;

let customerRequestCount: any = {
  abc: {
    currentCount: 2,
    previousLeftOver: 0,
  },
};

const rateLimit = (customerId: string) => {
  if (customerRequestCount[customerId] === undefined) {
    customerRequestCount[customerId].currentCount = 1;
    return true;
  } else {
    customerRequestCount[customerId].currentCount += 1;
  }
  const exceedLimit = customerRequestCount[customerId].currentCount > RATE_LIMIT_X_PER_INTERVAL
  if (
    exceedLimit &&
    customerRequestCount[customerId].currentCount <
      RATE_LIMIT_X_PER_INTERVAL + customerRequestCount[customerId].previousLeftOver
  ) {
    console.log("Exceed limit but using previousLeftOver");
  }
  if (
    customerRequestCount[customerId].currentCount >
    RATE_LIMIT_X_PER_INTERVAL + customerRequestCount[customerId].previousLeftOver
  ) {
    return false;
  }
  return true;
};
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const main = async () => {
  const customerId = "abc";

  let isAllowed;
  setInterval(() => {
    customerRequestCount = {
      [customerId]: {
        currentCount: 0,
        previousLeftOver: RATE_LIMIT_X_PER_INTERVAL - customerRequestCount[customerId].currentCount,
      },
    };
  }, INTERVAL_TO_CLEAR_COUNTS_IN_SECONDS * 1000);

  setInterval(() => {
    for (let index = 0; index < getRandomInt(6); index++) {
      // submit to queue
      //
      isAllowed = rateLimit(customerId);
      if(isAllowed){
        console.log(isAllowed);
        // remove rom queue
      } else {
        // throw back to queue
      }
    }
    console.log("---------------");
  }, INTERVAL_TO_CLEAR_COUNTS_IN_SECONDS * 1000);
};
void main();

// many customer, rate limit per customer, x request per y second
// boolean rateLimit(int customerId)
