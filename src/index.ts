import { serialize, deserialize } from "./serialization";

console.log("Serialization example:");

const arr = [55, 73, 55, 73, 55, 73, 55, 73, 1, 1, 1, 1, 1, 1, 1];
console.log(`  initial:${arr}:`);

const str = serialize(arr);
const str2 = JSON.stringify(arr);

const compressionRate = ((str.length / str2.length) * 100).toFixed(2);
console.log(`  compressed:${str}: (ASCII table range from 32 to 126)`);
console.log(`    compression rate = ${compressionRate}%`);

const result = deserialize(str);
console.log(`  decompressed:${result}:`);

console.log('\nHey! Use "bun test" to run all tests :>');
