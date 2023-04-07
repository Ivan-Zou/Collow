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

// Route 3: GET /


module.exports = {
  author,
  county_listing_prices,
}
