/**
 * This function calculates the maximum profit that can be made by buying and selling a stock at
 * different prices.
 *
 * @param {number[]} stockPrices - `stockPrices` is an array of numbers representing the stock prices
 * at different minutes throughout the day. The index of each element in the array represents the
 * minute, and the value of the element represents the stock price at that minute.
 *
 * @returns the maximum profit that can be made by buying and selling a stock at different times, based
 * on the input array of stock prices.
 */
export function getMaxProfit(stockPrices: number[]): number {
  if (!stockPrices || stockPrices.length < 2) {
    throw new Error("Invalid input");
  }

  // assume we have to make a transaction, allowing negative profit
  // start with first element as buy price and second element as sell price
  let priceToBuyIndex = 0;
  let priceToBuy = stockPrices[priceToBuyIndex];
  let priceToSellIndex = 1;
  let priceToSell = stockPrices[priceToSellIndex];
  let maxProfit = priceToSell - priceToBuy;

  // a temporary variable to store minimum element as potential buy price, until finding the next selling price for higher profit
  let minPriceIndex = priceToBuyIndex;
  let minPrice = priceToBuy;

  // loop through the array to find the maximum profit
  for (let minuteIndex = 1; minuteIndex < stockPrices.length; minuteIndex++) {
    // calculate the profit if selling at current price, buy price is the minimum element in previous iterations
    const currentPrice = stockPrices[minuteIndex];
    const currentPriceProfit = currentPrice - minPrice;
    if (currentPriceProfit > maxProfit) {
      priceToSellIndex = minuteIndex;
      maxProfit = currentPriceProfit;
      // confirm the minimum element as new buy price
      priceToBuy = minPrice;
      priceToBuyIndex = minPriceIndex;
    }

    // new minimum element found
    if (currentPrice < priceToBuy) {
      minPriceIndex = minuteIndex;
      minPrice = currentPrice;
    }
  }
  priceToSell = stockPrices[priceToSellIndex];

  // console.log(
  //   `Buy $${priceToBuy}(${priceToBuyIndex} min), sell $${priceToSell}(${priceToSellIndex} min), profit: $${maxProfit}`,
  // );
  return maxProfit;
}

console.log(getMaxProfit([10, 7, 5, 8, 11, 9]));
