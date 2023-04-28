import { useEffect, useState } from 'react';
import { Container, Divider, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { formatUnitPrice, formatCountyName, formatUnitNumber, formatNull } from '../helpers/formatter';


import LazyTable from '../components/LazyTable';
const config = require('../config.json');


export default function HomePage() {
  // We use the setState hook to persist information across renders (such as the result of our API calls)
  const [appAuthor, setAppAuthor] = useState('');
  const [selectedSongId, setSelectedSongId] = useState(null);


  // States


  // The useEffect hook by default runs the provided callback after every render
  // The second (optional) argument, [], is the dependency array which signals
  // to the hook to only run the provided callback if the value of the dependency array
  // changes from the previous render. In this case, an empty array means the callback
  // will only run on the very first render.
  useEffect(() => {
    // Fetch request to get the song of the day. Fetch runs asynchronously.
    // The .then() method is called when the fetch request is complete
    // and proceeds to convert the result to a JSON which is finally placed in state.

    fetch(`http://${config.server_host}:${config.server_port}/author`)
      .then(res => res.text())
      .then(resText => setAppAuthor(resText));
  }, []);


  const listingPrices = [
    {
      field: 'name',
      headerName: 'County',
      renderCell: (row) => formatCountyName(row.name)
    },
    {
      field: 'median',
      headerName: 'Median Listing Price',
      renderCell: (row) => formatUnitPrice(row.median)
    },
    {
      field: 'average',
      headerName: 'Average Listing Price',
      renderCell: (row) => formatUnitPrice(row.average)
    },
  ];

  const squareFootage = [
    {
      field: 'name',
      headerName: 'County',
      renderCell: (row) => formatCountyName(row.name)
    },
    {
      field: 'median_listing_price_per_square_foot',
      headerName: 'Median Listing Price Per Square Foot',
      renderCell: (row) => formatUnitNumber(row.median_listing_price_per_square_foot)
    },
    {
      field: 'median_square_feet',
      headerName: 'Median Square Feet',
      renderCell: (row) => formatUnitNumber(row.median_square_feet)
    },
  ];

  const listingCounts = [
    {
      field: 'name',
      headerName: 'County',
      renderCell: (row) => formatCountyName(row.name)
    },
    {
      field: 'active',
      headerName: 'Active Listings',
      renderCell: (row) => formatUnitNumber(row.active)
    },
    {
      field: 'new',
      headerName: 'New Listings',
      renderCell: (row) => formatUnitNumber(row.new)
    },
    {
      field: 'total',
      headerName: 'Total Listings',
      renderCell: (row) => formatUnitNumber(row.total)
    },
  ];

  const hotnessScores = [
    {
      field: 'name',
      headerName: 'County',
      renderCell: (row) => formatCountyName(row.name)
    },
    {
      field: 'hotness',
      headerName: 'Hotness Scores',
      renderCell: (row) => formatNull(row.hotness)
    },
  ];

  const supplyAndDemandScores = [
    {
      field: 'name',
      headerName: 'County',
      renderCell: (row) => formatCountyName(row.name)
    },
    {
      field: 'demand',
      headerName: 'Demand Scores',
      renderCell: (row) => formatNull(row.demand)
    },
    {
      field: 'supply',
      headerName: 'Supply Scores',
      renderCell: (row) => formatNull(row.supply)
    },
  ];

  return (
    <Container>
      <Divider />
      <h2>Latest Listing Prices</h2>
      <LazyTable 
        route={`http://${config.server_host}:${config.server_port}/latest_county_info`} 
        columns={listingPrices} 
        rowsPerPageOptions={[5, 10, 25]} />
      <Divider />
      <h2>Latest Square Footage</h2>
      <LazyTable 
        route={`http://${config.server_host}:${config.server_port}/latest_county_info`} 
        columns={squareFootage} 
        rowsPerPageOptions={[5, 10, 25]} />
      <Divider />
      <h2>Latest Listing Count</h2>
      <LazyTable 
        route={`http://${config.server_host}:${config.server_port}/latest_county_info`} 
        columns={listingCounts} 
        rowsPerPageOptions={[5, 10, 25]} />
      <Divider />
      <h2>Latest Hotness Scores</h2>
      <LazyTable 
        route={`http://${config.server_host}:${config.server_port}/latest_county_info`} 
        columns={hotnessScores} 
        rowsPerPageOptions={[5, 10, 25]} />
      <Divider />
      <h2>Latest Supply and Demand Scores</h2>
      <LazyTable 
        route={`http://${config.server_host}:${config.server_port}/latest_county_info`} 
        columns={supplyAndDemandScores} 
        rowsPerPageOptions={[5, 10, 25]} />
      <Divider />
      <p>{appAuthor}</p>
    </Container>
  );
};
