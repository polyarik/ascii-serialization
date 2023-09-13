import { describe, test, expect } from "bun:test";
import { testSerialization } from "./serialization.tester";

describe("serialize()", () => {
  const cases: Record<string, number[]> = {
    "[1, 1, 1]": [1, 1, 1],
    "[72, 42, 125, 125, 42]": [72, 42, 125, 125, 42],
    "[65, 294, 9, 5, 294, 5, 294, 92, 9, 294]": [
      65, 294, 9, 5, 294, 5, 294, 92, 9, 294,
    ],
    "50 random": Array.from(
      { length: 50 },
      () => Math.floor(Math.random() * 300) + 1
    ),
    "100 random": Array.from(
      { length: 100 },
      () => Math.floor(Math.random() * 300) + 1
    ),
    "500 random": Array.from(
      { length: 500 },
      () => Math.floor(Math.random() * 300) + 1
    ),
    "1000 random": Array.from(
      { length: 1000 },
      () => Math.floor(Math.random() * 300) + 1
    ),
    "all 1-digit numbers": Array.from({ length: 10 }, (_, i) => i),
    "all 2-digit numbers": Array.from({ length: 90 }, (_, i) => i + 10),
    "all 3-digit numbers": Array.from({ length: 200 }, (_, i) => i + 100),
    "each number 3 times": Array.from(
      { length: 900 },
      (_, i) => Math.floor(i / 3) + 1
    ),
  };

  for (const caseName in cases) {
    test(caseName, () => {
      const arr = cases[caseName];
      const isCorrect = testSerialization(arr);
      expect(isCorrect).toBeTrue();
    });
  }
});
