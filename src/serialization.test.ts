import { test, expect } from "bun:test";
import { testSerialization } from "./serialization.tester";

test("[1, 1, 1]", () => {
  const arr = [1, 1, 1];
  const isCorrect = testSerialization(arr, false);
  expect(isCorrect).toBeTrue();
});
