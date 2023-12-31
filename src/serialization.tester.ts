import { serialize, deserialize, ASCII_FROM, ASCII_TO } from "./serialization";

export function testSerialization(arr: number[], silent = true) {
  const str = serialize(arr);
  const simpleJSON = JSON.stringify(arr);
  const compressionRatio = ((str.length / simpleJSON.length) * 100).toFixed(2);
  const result = deserialize(str);

  if (!silent) {
    console.log(`initial:${arr}:`);
    console.log(
      `compressed:${str}: (ASCII table range from ${ASCII_FROM} to ${ASCII_TO})`
    );
    console.log(`  compression ratio = ${compressionRatio}%`);
  } else console.log(`ratio: ${compressionRatio}%`);

  const isCorrect =
    JSON.stringify(result.sort()) === JSON.stringify(arr.sort());
  return isCorrect;
}
