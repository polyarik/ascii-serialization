export function simpleSerialize(arr: number[]) {
  return arr.join(",");
}

export function simpleDeserialize(str: string) {
  return str.split(",").map((s) => parseInt(s, 10));
}
