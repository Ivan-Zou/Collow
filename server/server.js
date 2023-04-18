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
app.get('/county_listing_prices', routes.county_listing_prices);
app.get('/county_metrics/:id', routes.county_metrics);
app.get('/search_counties', routes.search_counties);
app.get('/county_name/:id', routes.county_name);
app.get('/county_scores/:id', routes.county_scores)

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
