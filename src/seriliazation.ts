const MAX_LENGTH = 1000;
const RANGE = 300;

const bitsForCounts = Math.ceil(Math.log2(MAX_LENGTH));
const bitsForNums = Math.ceil(Math.log2(RANGE));

export function serialize(nums: number[]) {
  if (nums.length > MAX_LENGTH)
    throw new Error(`max length ${MAX_LENGTH} exceeded`);

  const occurrences = nums.reduce((acc, curr) => {
    acc.set(curr, (acc.get(curr) || 0) + 1);
    return acc;
  }, new Map<number, number>());

  let bits = 0n;
  let uniqueCount = 0;

  occurrences.forEach((count, num) => {
    const currBits = (BigInt(count) << BigInt(bitsForNums)) | BigInt(num);
    bits |= currBits << BigInt(uniqueCount * (bitsForCounts + bitsForNums));
    uniqueCount++;
  });

  return convertToASCII(bits);
}

export function deserialize(base128: string) {
  const arr: number[] = [];
  let bits = convertFromASCII(base128);

  while (bits) {
    let num = 0;

    for (let i = 0; i < bitsForNums; i++) {
      num += Number(bits & BigInt(1 << i));
    }

    let count = 0;

    for (let i = 0; i < bitsForCounts; i++) {
      if (bits & BigInt(1 << (i + bitsForNums))) count += Math.pow(2, i);
    }

    for (let i = 0; i < count; i++) {
      arr.push(num);
    }

    bits >>= BigInt(bitsForCounts + bitsForNums);
  }

  return arr;
}

function convertToASCII(num: bigint) {
  let base128 = "";

  while (num > 0n) {
    const remainder = num % 128n;
    base128 = String.fromCharCode(Number(remainder)) + base128;
    num = (num - remainder) / 128n;
  }

  return base128;
}

function convertFromASCII(base128: string) {
  let num = 0n;

  for (let i = 0; i < base128.length; i++) {
    const digit = base128.charCodeAt(i) * Math.pow(128, base128.length - 1 - i);
    num += BigInt(digit);
  }

  return num;
}
