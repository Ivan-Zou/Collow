import { useEffect, useState } from 'react';
import { Container, Divider, Link } from '@mui/material';
import { formatUnitPrice, formatCountyName, formatUnitNumber, formatNull } from '../helpers/formatter';

import LazyTable from '../components/LazyTable';
import CountyCard from '../components/CountyCard';
const config = require('../config.json');

export default function HomePage({favorites, setFavorites}) {
  // State for our names
  const [appAuthor, setAppAuthor] = useState('');
  // State to keep track of what county to display in the county card
  const [selectedCounty, setSelectedCounty] = useState(null);

 
  // useEffect to get author names
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/author`)
      .then(res => res.text())
      .then(resText => setAppAuthor(resText));
  }, []);

  // Columns for latest listing prices
  const listingPrices = [
    {
      field: 'name',
      headerName: 'County',
      renderCell: (row) => <Link onClick={() => setSelectedCounty(row.id)}>{formatCountyName(row.name)}</Link>
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

  // Columns for latest square footage
  const squareFootage = [
    {
      field: 'name',
      headerName: 'County',
      renderCell: (row) => <Link onClick={() => setSelectedCounty(row.id)}>{formatCountyName(row.name)}</Link>
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

  // Columns for latest listing counts
  const listingCounts = [
    {
      field: 'name',
      headerName: 'County',
      renderCell: (row) => <Link onClick={() => setSelectedCounty(row.id)}>{formatCountyName(row.name)}</Link>
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

  // Columns for latest hotness scores
  const hotnessScores = [
    {
      field: 'name',
      headerName: 'County',
      renderCell: (row) => <Link onClick={() => setSelectedCounty(row.id)}>{formatCountyName(row.name)}</Link>
    },
    {
      field: 'hotness',
      headerName: 'Hotness Scores',
      renderCell: (row) => formatNull(row.hotness)
    },
  ];

  // Columns for latest supply and demand scores
  const supplyAndDemandScores = [
    {
      field: 'name',
      headerName: 'County',
      renderCell: (row) => <Link onClick={() => setSelectedCounty(row.id)}>{formatCountyName(row.name)}</Link>
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
      {/*Display county card of the selected countyId*/}
      {selectedCounty && <CountyCard countyId={selectedCounty} handleClose={() => setSelectedCounty(null)} favorites={favorites} setFavorites={setFavorites}/>}
      <Divider />
      {/*Table displaying latest prices*/}
      <h2>Latest Listing Prices</h2>
      <LazyTable 
        route={`http://${config.server_host}:${config.server_port}/latest_county_info`} 
        columns={listingPrices} 
        rowsPerPageOptions={[5, 10, 25]} />
      <Divider />
      {/*Table displaying latest square footage*/}
      <h2>Latest Square Footage</h2>
      <LazyTable 
        route={`http://${config.server_host}:${config.server_port}/latest_county_info`} 
        columns={squareFootage} 
        rowsPerPageOptions={[5, 10, 25]} />
      <Divider />
      {/*Table displaying listing counts*/}
      <h2>Latest Listing Count</h2>
      <LazyTable 
        route={`http://${config.server_host}:${config.server_port}/latest_county_info`} 
        columns={listingCounts} 
        rowsPerPageOptions={[5, 10, 25]} />
      <Divider />
      {/*Table displaying latest hotness scores*/}
      <h2>Latest Hotness Scores</h2>
      <LazyTable 
        route={`http://${config.server_host}:${config.server_port}/latest_county_info`} 
        columns={hotnessScores} 
        rowsPerPageOptions={[5, 10, 25]} />
      <Divider />
      {/*Table displaying supply and demand scores*/}
      <h2>Latest Supply and Demand Scores</h2>
      <LazyTable 
        route={`http://${config.server_host}:${config.server_port}/latest_county_info`} 
        columns={supplyAndDemandScores} 
        rowsPerPageOptions={[5, 10, 25]} />
      <Divider />
      {/*Display authors*/}
      <p>{appAuthor}</p>
    </Container>
  );
};
