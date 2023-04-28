export function formatUnitNumber(number) {
  if (number == null) {
    return "N/A";
  }
  const formatter = new Intl.NumberFormat('en-US');
  return formatter.format(number);
}

export function formatUnitPrice(price) {
  if (price == null) {
    return "N/A";
  }
  const priceFormatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0});
  return priceFormatter.format(price);
}

export function formatPriceByThousand(price) {
  if (price == null) {
    return "N/A";
  }
  return formatUnitPrice(price) + "k";
}

export function formatCountyName(name) {
  if (name == null) {
    return "N/A";
  }
  const countyState = name.split(', ');
  const county = countyState[0];
  const state = countyState[1];
  return county[0].toUpperCase() + county.slice(1) + ", " + state.toUpperCase();
}

export function formatNull(value) {
  return value == null ? "N/A" : value;
}