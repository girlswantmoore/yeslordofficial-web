export const SALE_PERCENT = 25;

export function toCents(price: number) {
  return Math.round(price * 100);
}

export function getSalePriceCents(price: number) {
  return Math.round((toCents(price) * (100 - SALE_PERCENT)) / 100);
}

export function getSalePrice(price: number) {
  return getSalePriceCents(price) / 100;
}
