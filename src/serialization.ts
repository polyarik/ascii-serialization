const MAX_LENGTH = 1000;
const RANGE = 300;

export const ASCII_FROM = 32;
export const ASCII_TO = 127; // only printable ASCII characters (32 - 127), 96 in total

const bitsForCounts = Math.ceil(Math.log2(MAX_LENGTH));
const bitsForNums = Math.ceil(Math.log2(RANGE));

export function serialize(nums: number[]) {
  if (nums.length > MAX_LENGTH)
    throw new Error(`max length ${MAX_LENGTH} exceeded`);

  const occurrences = nums.reduce((acc, curr) => {
    if (curr > RANGE) throw new Error(`number range of ${RANGE} exceeded`);

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

export function deserialize(str: string) {
  const arr: number[] = [];
  let bits = convertFromASCII(str);

  while (bits) {
    let num = 0;

    for (let i = 0; i < bitsForNums; i++) {
      num += Number(bits & BigInt(1 << i));
    }

    let count = 0;

    for (let i = 0; i < bitsForCounts; i++) {
      if (bits & BigInt(1 << (i + bitsForNums))) count += 2 ** i;
    }

    for (let i = 0; i < count; i++) {
      arr.push(num);
    }

    bits >>= BigInt(bitsForCounts + bitsForNums);
  }

  return arr;
}

function convertToASCII(num: bigint) {
  let str = "";
  const base = BigInt(ASCII_TO - ASCII_FROM + 1);

  while (num > 0n) {
    const remainder = num % base;
    str = String.fromCharCode(Number(remainder) + ASCII_FROM) + str;
    num = (num - remainder) / base;
  }

  return str;
}

function convertFromASCII(str: string) {
  let num = 0n;
  const base = BigInt(ASCII_TO - ASCII_FROM + 1);

  for (let i = 0; i < str.length; i++) {
    const digit =
      BigInt(str.charCodeAt(i) - ASCII_FROM) *
      base ** BigInt(str.length - 1 - i);

    num += digit;
  }

  return num;
}
