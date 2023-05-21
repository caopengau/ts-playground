import { getMaxProfit } from "./index";

describe("getMaxProfit", () => {
  it("should throw error if input is invalid", () => {
    expect(() => getMaxProfit([])).toThrowError("Invalid input");
    expect(() => getMaxProfit([1])).toThrowError("Invalid input");
  });

  it("should return the maximum profit if only two elements", () => {
    expect(getMaxProfit([2, 1])).toBe(-1);
  });

  it("should return the maximum profit if all transactions are negative", () => {
    expect(getMaxProfit([4, 2, 1])).toBe(-1); // buy at 2 and sell at 1
  });

  it("should return the maximum profit if more than two elements", () => {
    expect(getMaxProfit([2, 1, 3])).toBe(2); // buy at 1 and sell at 3
    expect(getMaxProfit([2, 1, 3, 4])).toBe(3); // buy at 1 and sell at 4
  });

  it("should return the maximum profit, if later lower price no selling price", () => {
    expect(getMaxProfit([2, 5, 3, 4, 1])).toBe(3); // buy at 2 and sell at 5
  });

  it("should return the maximum profit, if later lower buy price having less profit", () => {
    expect(getMaxProfit([4, 2, 5, 1, 2, 3])).toBe(3); // buy at 2 and sell at 5
  });

  it("should return the maximum profit, if all elements are same", () => {
    expect(getMaxProfit([2, 2, 2, 2, 2])).toBe(0); // no profit
  });
});
