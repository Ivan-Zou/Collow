const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));

// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js
app.get('/author', routes.author);
app.get('/latest_county_info', routes.latest_county_info);
app.get('/county_metrics/:id', routes.county_metrics);
app.get('/search_counties', routes.search_counties);
app.get('/county_name/:id', routes.county_name);
app.get('/county_scores/:id', routes.county_scores);
app.get(`/counties_starting_with/:letter`, routes.counties_starting_with);
app.get(`/county_metrics_by_date/:list/:date`, routes.county_metrics_by_date);
app.get(`/average_county_info`, routes.average_county_info);
app.get(`/maximum_county_info`, routes.maximum_county_info);
app.get(`/minimum_county_info`, routes.minimum_county_info)

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
