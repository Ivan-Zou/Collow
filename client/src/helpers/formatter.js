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
  const county = countyState[0].split(' ');
  
  for (var i = 0; i < county.length; i++) {
    county[i] = county[i][0].toUpperCase() + county[i].slice(1);
  }

  var countyStr = "";
  for(var j = 0; j < county.length; j++) {
    countyStr += j !== county.length - 1 ? county[j] + " " : county[j];
  }

  const state = countyState[1];
  return countyStr + ", " + state.toUpperCase();
}

export function formatNull(value) {
  return value == null ? "N/A" : value;
}