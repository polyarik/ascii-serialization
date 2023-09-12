import { serialize, deserialize } from "./serialization";
import { testSerialization } from "./serialization.tester";

console.log("Serialization example:");
const exampleArr = [55, 73, 55, 73, 55, 73, 55, 73, 1, 1, 1, 1, 1, 1, 1];
testSerialization(exampleArr, false);

console.log('\nHey! Use "bun test" to run all tests :>');
