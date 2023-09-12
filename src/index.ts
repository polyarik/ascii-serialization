import { serialize, deserialize } from "./seriliazation";
import { simpleSerialize, simpleDeserialize } from "./simple-seriliazation";

const arr = [1, 1, 1, 2, 1, 300, 298, 15, 127, 29, 29, 65, 29, 29, 29, 17];
console.log(`initial:${arr}:`);

const str = serialize(arr);
console.log(`compressed:${str}:`);

const result = deserialize(str);
console.log(`decompressed:${arr}:`);
