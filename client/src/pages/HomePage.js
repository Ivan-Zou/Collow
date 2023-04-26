import { useEffect, useState } from 'react';
import { Container, Divider, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { formatUnitPrice, formatCountyName } from '../helpers/formatter';


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


  const countyColumns = [
    {
      field: 'date',
      headerName: "Date",
    },
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

  const testColumns = [
    {
      field: 'date',
      headerName: "Date",
    },
    {
      field: 'Hotness',
      headerName: 'Hotness',
    },
    {
      field: 'Supply',
      headerName: 'Supply',
    },
    {
      field: 'Demand',
      headerName: 'Demand'
    },
  ];

  return (
    <Container>
      <Divider />
      <h2>Latest County Listing Prices</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/county_listing_prices`} columns={countyColumns} rowsPerPageOptions={[5, 10, 25]} />
      <Divider />
      <h2>Testing County Scores</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/county_scores/1001`} columns={testColumns} rowsPerPageOptions={[5, 10, 25]} />
      <Divider />
      <p>{appAuthor}</p>
    </Container>
  );
};
