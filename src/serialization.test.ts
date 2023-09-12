import { describe, test, expect } from "bun:test";
import { testSerialization } from "./serialization.tester";

describe("serialize()", () => {
  test("[1, 1, 1]", () => {
    const arr = [1, 1, 1];
    const isCorrect = testSerialization(arr, false);
    expect(isCorrect).toBeTrue();
  });

  test("[72, 42, 125, 35]", () => {
    const arr = [72, 42, 125, 35];
    const isCorrect = testSerialization(arr, false);
    expect(isCorrect).toBeTrue();
  });
});
