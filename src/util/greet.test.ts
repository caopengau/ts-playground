import { describe } from "node:test";

import { greet } from "./greet";

describe("greet", () => {
  it("should return Hello World", () => {
    expect(greet()).toEqual("Hello World");
  });
});
