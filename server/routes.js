const mysql = require('mysql')
const config = require('./config.json')

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));

/******************
 * ROUTES *
 ******************/

// Route 1: GET /author
const author = async function(req, res) {
  const name = 'Angeline, Brady, Ivan, and Sid';
  res.send(`Created by ${name}`);
}

// Route 2: GET /county_listing_prices
const county_listing_prices = async function(req, res) {
  const page = req.query.page;
  const pageSize = req.query.page_size ?? 10;
  const offset = pageSize * (page - 1);

  // LP.date is temporary just wanted to display data on the web page
  connection.query(`
    SELECT C.id, LP.date, C.name, LP.median, LP.average
    FROM County C JOIN Listing_Price LP ON C.id = LP.id
    WHERE LP.date = 202302
    ORDER BY LP.median
    LIMIT ${pageSize} OFFSET ${offset}
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

// Route 3: GET /search_counties
const search_counties = async function(req, res) {
  const name = req.query.name ?? '';
  const averagePriceLow  = req.query.average_price_low ?? 0;
  const averagePriceHigh = req.query.average_price_high ?? 10000000;
  const supplyScoreLow = req.query.supply_score_low ?? 0;
  const supplyScoreHigh = req.query.supply_score_high ?? 100;
  const demandScoreLow = req.query.demand_score_low ?? 0;
  const demandScoreHigh = req.query.demand_score_high ?? 100;
  const medianSquareFeetLow = req.query.median_square_feet_low ?? 0;
  const medianSquareFeetHigh = req.query.median_square_feet_high ?? 31000;
  const activeListingCountLow = req.query.active_listing_count_low ?? 0;
  const activeListingCountHigh = req.query.active_listing_count_high ?? 24000;
  const sortByHotness = req.query.sort_by_hotness === 'true' ? 1 : 0;
  const year = req.query.year ?? "2023";
  const month = req.query.month ?? "02";

  if (sortByHotness) {
    connection.query(`
    SELECT *
    FROM County C JOIN Listing_Price LP ON C.id = LP.id
      JOIN Listing_Count LC ON LP.id = LC.id
      JOIN Square_Footage SF ON LC.id = SF.id
      JOIN Hotness H ON SF.id = H.id
      JOIN Supply_and_Demand SD ON H.id = SD.id
    WHERE (name LIKE '%${name}%')
      AND (average >= ${averagePriceLow} AND average <= ${averagePriceHigh})
      AND (supply >= ${supplyScoreLow} AND supply <= ${supplyScoreHigh})
      AND (demand >= ${demandScoreLow} AND demand <= ${demandScoreHigh})
      AND (median_square_feet >= ${medianSquareFeetLow} AND median_square_feet <= ${medianSquareFeetHigh})
      AND (active >= ${activeListingCountLow} AND active <= ${activeListingCountHigh})
      AND (LP.date = ${parseInt(year + month)})
    ORDER BY hotness
  `, (err, data) => {
    if (err || data.length == 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
  } else {
    connection.query(`
    SELECT *
    FROM County C JOIN Listing_Price LP ON C.id = LP.id
      JOIN Listing_Count LC ON LP.id = LC.id
      JOIN Square_Footage SF ON LC.id = SF.id
      JOIN Hotness H ON SF.id = H.id
      JOIN Supply_and_Demand SD ON H.id = SD.id
      WHERE (name LIKE '%${name}%')
        AND (average >= ${averagePriceLow} AND average <= ${averagePriceHigh})
        AND (supply >= ${supplyScoreLow} AND supply <= ${supplyScoreHigh})
        AND (demand >= ${demandScoreLow} AND demand <= ${demandScoreHigh})
        AND (median_square_feet >= ${medianSquareFeetLow} AND median_square_feet <= ${medianSquareFeetHigh})
        AND (active >= ${activeListingCountLow} AND active <= ${activeListingCountHigh})
        AND (LP.date = ${parseInt(year + month)})
  `, (err, data) => {
    if (err || data.length == 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
  }
}

module.exports = {
  author,
  county_listing_prices,
  search_counties,
}
