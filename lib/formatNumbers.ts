export function formatNumber(num: number | string): string {
  const n = typeof num === "number" ? num : Number(num);

  if (isNaN(n)) return "";

  return n.toLocaleString("en-US");
}