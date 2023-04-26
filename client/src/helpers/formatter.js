export function formatUnitNumber(number) {
  const formatter = new Intl.NumberFormat('en-US');
  return formatter.format(number);
}

export function formatUnitPrice(price) {
  const priceFormatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0});
  return priceFormatter.format(price);
}

export function formatPriceByThousand(price) {
  return formatUnitPrice(price) + "k";
}

export function formatCountyName(name) {
  const countyState = name.split(', ');
  const county = countyState[0];
  const state = countyState[1];
  return county[0].toUpperCase() + county.slice(1) + ", " + state.toUpperCase();
}