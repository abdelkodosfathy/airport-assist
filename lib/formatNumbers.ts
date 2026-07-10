// export function formatNumber(num: number | string): string {
//   const n = typeof num === "number" ? num : Number(num);

//   if (isNaN(n)) return "";

//   return n.toLocaleString("en-US");
// }
export function formatNumber(num: number | string): string {
  if (typeof num === "string") {
    const [integer, decimal] = num.split(".");

    const formattedInteger = Number(integer).toLocaleString("en-US");

    return decimal !== undefined
      ? `${formattedInteger}.${decimal}`
      : formattedInteger;
  }

  return num.toLocaleString("en-US");
}
