export function formatDuration(sec) {
  const date = new Date(0);
  date.setSeconds(sec ?? 0);
  return date.toISOString().substring(14, 19);
}

export function formatReleaseDate(date) {
  const dateObj = new Date(Date.parse(date));
  return dateObj.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

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

// work in progress
export function formatDate(date) {
  const year = date.slice(0,4);
  const month = date.slice(4,6);
  return;
}