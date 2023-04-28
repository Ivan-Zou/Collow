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
  const name = 'Angeline, Brady, Ivan, and Siddharth';
  res.send(`Created by ${name}`);
}

// Route 2: GET /latest_county_info
const latest_county_info = async function(req, res) {
  const page = req.query.page;
  const pageSize = req.query.page_size ?? 10;
  const offset = pageSize * (page - 1);

  connection.query(`
    SELECT *
    FROM County C JOIN Listing_Price LP ON C.id = LP.id
                  JOIN Square_Footage SF ON C.id = SF.id AND LP.date = SF.date
                  JOIN Listing_Count LC ON C.id = LC.id AND LP.date = LC.date
                  JOIN Hotness H ON C.id = H.id AND LP.date = H.date
                  JOIN Supply_and_Demand SaD ON C.id = SaD.id AND LP.date = SaD.date
    WHERE LP.date = 202302
    ORDER BY C.name
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

// Route 3: GET /county_metrics/:id
const county_metrics = async function(req, res) {
  const countyId = req.params.id;
  connection.query(`
  SELECT CONCAT(FLOOR(LP.date % 100), '/', FLOOR(LP.date / 100)) as date, LP.average AS Average, 
  LP.median AS Median, LC.active AS Active, LC.total AS Total, SF.median_listing_price_per_square_foot AS Square_Price, 
  SF.median_square_feet AS Square_Feet
  FROM Listing_Price LP JOIN
       Listing_Count LC ON LP.id = LC.id AND LP.date = LC.date JOIN
      Square_Footage SF ON LC.id = SF.id AND LC.date = SF.date
  WHERE LP.id = ${countyId}
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

// ROUTE 4: GET /search_counties
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
  const year = req.query.year ?? "2023";
  const month = req.query.month ?? "02";
  connection.query(`
    SELECT *
    FROM County C JOIN Listing_Price LP ON C.id = LP.id 
      JOIN Listing_Count LC ON LP.id = LC.id AND LP.date = LC.date
      JOIN Square_Footage SF ON LC.id = SF.id AND LC.date = SF.date
      JOIN Supply_and_Demand SD ON SF.id = SD.id AND SF.date = SD.date
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

// Route 5: GET /county_name/:id
const county_name = async function(req, res) {
  const countyId = req.params.id;
  connection.query(`
    SELECT name
    FROM County
    WHERE id = ${countyId}
  `, (err, data) => {
    if (err || data.length == 0) {
      console.log(err);
      res.json([]);
    } else {
      res.send(data[0].name); 
    }
  });
}

// Route 6: GET /listing_change/
const listing_change = async function(req, res) {
  const d1 = req.query.d1;
  const d2 = req.query.d2;
  connection.query(`
    SELECT id, ABS(LC_D1.active - LC_D2.active) as change
    FROM (SELECT id, active
      FROM Listing_Count LC
      WHERE LC.date = ${d1}) LC_D1 JOIN
    (SELECT id, active
      FROM Listing_Count LC
      WHERE LC.date = ${d2}) LC_D2 ON LC_D1.id, LC_D1.date = LC_D2.id, LC_D2.date
    ORDER BY change DESC
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

// Route 7: GET /counties_starting_with/:letter
const counties_starting_with = async function(req, res) {
  // If letter is null, return all counties. Else, return all counties that start with letter
  const letter = req.params.letter != 'all' ? req.params.letter : '';
  connection.query(`
    SELECT id, name
    FROM County 
    WHERE name LIKE '${letter}%'
    ORDER BY name 
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  })
}

// Route 8: GET /county_metrics_by_date/:list/:date
const county_metrics_by_date = async function(req, res) {
  const ids = req.params.list;
  const date = req.params.date;
  connection.query(`
  SELECT C.id, C.name AS Name, LP.average AS Average, 
  LP.median AS Median, LC.active AS Active, LC.total AS Total, SF.median_listing_price_per_square_foot AS Square_Price, 
  SF.median_square_feet AS Square_Feet
  FROM County C JOIN Listing_Price LP ON C.id = LP.id
       JOIN Listing_Count LC ON LP.id = LC.id AND LP.date = LC.date JOIN
       Square_Footage SF ON LC.id = SF.id AND LC.date = SF.date
  WHERE LP.id IN ${ids} AND LP.date = ${date}
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

// Route 9: GET /average_county_info
const average_county_info = async function(req, res) {
  connection.query(`
  WITH hotness_average (id, hotness_avg, viewer_avg) AS (
    SELECT id, AVG(hotness), AVG(num_of_viewers)
    FROM Hotness
    GROUP BY id
  ),
  listing_count_average (id, total_avg, active_avg, new_avg) AS (
      SELECT id, AVG(total), AVG(active), AVG(new)
      FROM Listing_Count
      GROUP BY id
  ),
  listing_price_average (id, median_avg, average_avg) AS (
      SELECT id, AVG(median), AVG(average)
      FROM Listing_Price
      GROUP BY id
  ),
  square_footage_average (id, median_listing_price_per_square_foot_avg, median_square_feet_avg) AS (
      SELECT id, AVG(median_listing_price_per_square_foot), AVG(median_square_feet)
      FROM Square_Footage
      GROUP BY id
  ),
  supply_and_demand_average (id, supply_avg, demand_avg) AS (
      SELECT id, AVG(supply), AVG(demand)
      FROM Supply_and_Demand
      GROUP BY id
  )
  SELECT *
  FROM County C LEFT JOIN hotness_average HA ON C.id = HA.id
              LEFT JOIN listing_count_average LCA ON C.id = LCA.id
              LEFT JOIN listing_price_average LPA ON C.id = LPA.id
              LEFT JOIN square_footage_average SFA ON C.id = SFA.id
              LEFT JOIN supply_and_demand_average SDA ON C.id = SDA.id;
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

// Route 10: GET /maximum_county_info
const maximum_county_info = async function(req, res) {
  connection.query(`
  WITH hotness_max (id, hotness_max, viewer_max) AS (
    SELECT id, MAX(hotness), MAX(num_of_viewers)
    FROM Hotness
    GROUP BY id
  ),
  listing_count_max (id, total_max, active_max, new_max) AS (
      SELECT id, MAX(total), MAX(active), MAX(new)
      FROM Listing_Count
      GROUP BY id
  ),
  listing_price_max (id, median_max, average_max) AS (
      SELECT id, MAX(median), MAX(average)
      FROM Listing_Price
      GROUP BY id
  ),
  square_footage_max (id, median_listing_price_per_square_foot_max, median_square_feet_max) AS (
      SELECT id, MAX(median_listing_price_per_square_foot), MAX(median_square_feet)
      FROM Square_Footage
      GROUP BY id
  ),
  supply_and_demand_max (id, supply_max, demand_max) AS (
      SELECT id, MAX(supply), MAX(demand)
      FROM Supply_and_Demand
      GROUP BY id
  )
  SELECT *
  FROM County C LEFT JOIN hotness_max HM ON C.id = HM.id
              LEFT JOIN listing_count_max LCM ON C.id = LCM.id
              LEFT JOIN listing_price_max LPM ON C.id = LPM.id
              LEFT JOIN square_footage_max SFM ON C.id = SFM.id
              LEFT JOIN supply_and_demand_max SDM ON C.id = SDM.id;
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

// Route 11: GET /minimum_county_info
const minimum_county_info = async function(req, res) {
  connection.query(`
  WITH hotness_min (id, hotness_min, viewer_min) AS (
    SELECT id, MIN(hotness), MIN(num_of_viewers)
    FROM Hotness
    GROUP BY id
  ),
  listing_count_min (id, total_min, active_min, new_min) AS (
      SELECT id, MIN(total), MIN(active), MIN(new)
      FROM Listing_Count
      GROUP BY id
  ),
  listing_price_min (id, median_min, average_min) AS (
      SELECT id, MIN(median), MIN(average)
      FROM Listing_Price
      GROUP BY id
  ),
  square_footage_min (id, median_listing_price_per_square_foot_min, median_square_feet_min) AS (
      SELECT id, MIN(median_listing_price_per_square_foot), MIN(median_square_feet)
      FROM Square_Footage
      GROUP BY id
  ),
  supply_and_demand_min (id, supply_min, demand_min) AS (
      SELECT id, MIN(supply), MIN(demand)
      FROM Supply_and_Demand
      GROUP BY id
  )
  SELECT *
  FROM County C LEFT JOIN hotness_min HM ON C.id = HM.id
              LEFT JOIN listing_count_min LCM ON C.id = LCM.id
              LEFT JOIN listing_price_min LPM ON C.id = LPM.id
              LEFT JOIN square_footage_min SFM ON C.id = SFM.id
              LEFT JOIN supply_and_demand_min SDM ON C.id = SDM.id;
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

module.exports = {
  author,
  latest_county_info,
  county_metrics,
  search_counties,
  county_name,
  listing_change,
  counties_starting_with,
  county_metrics_by_date,
  average_county_info,
  maximum_county_info,
  minimum_county_info,
}
