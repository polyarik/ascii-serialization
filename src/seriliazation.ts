const MAX_LENGTH = 1000;
const RANGE = 300;

const bitsForCounts = BigInt(Math.ceil(Math.log2(MAX_LENGTH)));
const bitsForNums = BigInt(Math.ceil(Math.log2(RANGE)));

export function serialize(nums: number[]) {
  if (nums.length > MAX_LENGTH)
    throw new Error(`max length ${MAX_LENGTH} exceeded`);

  const occurrences = nums.reduce((acc, curr) => {
    acc.set(curr, (acc.get(curr) || 0) + 1);
    return acc;
  }, new Map<number, number>());

  let bits = 0n;
  let uniqueNumsCount = 0n;

  occurrences.forEach((count, num) => {
    const currBits = (BigInt(count) << bitsForNums) | BigInt(num);
    bits |= currBits << BigInt(uniqueNumsCount * (bitsForCounts + bitsForNums));
    uniqueNumsCount++;
  });

  return convertToASCII(bits);
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

export function deserialize(str: string) {
  //return number[]
}

function convertFromASCII(base128: string) {
  //return BigNumber
}
