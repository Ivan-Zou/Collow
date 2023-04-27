import { useEffect, useState } from 'react';
import { Button, Container, InputLabel, FormControl, Grid, Link, MenuItem, Select, Slider, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CountyCard from '../components/CountyCard';

import { formatUnitNumber, formatUnitPrice, formatPriceByThousand, formatCountyName} from '../helpers/formatter';
const config = require('../config.json');

export default function CountiesPage({favorites, setFavorites}) {
    const earliest = 201708;
    const latest = 202302;
    // Array with all the years between earliest and latest
    const years = [];
    for (let i = latest; i >= earliest; i -= 100) {
        // Since of dates are of the form YYYYMM, we divide by 100 to get the year and increment by 100 to get the next year.
        years.push(Math.trunc(i / 100));
    }
    // State to keep track of the number of counties to show at one time
    const [pageSize, setPageSize] = useState(10);
    // State to keep track of the current counties being displayed 
    const [data, setData] = useState([]);
    // State to keep track of which county card to display
    const [selectedCounty, setSelectedCounty] = useState(null);
    // State to keep track of input to search bar
    const [name, setName] = useState('');
    // States to keep track of the date of the data that will be used to query (initially 02/2023)
    const [month, setMonth] = useState("02");
    const [year, setYear] = useState(years[0]);
    // State to keep track of bounds for average price when querying
    const [averagePrice, setAveragePrice] = useState([0, 10000000]);
    // State to keep track of bounds for median square feet when querying
    // State to keep track of bounds for supply score when querying
    const [supplyScore, setSupplyScore] = useState([0, 100]);
    // State to keep track of bounds for demand score when querying
    const [demandScore, setDemandScore] = useState([0, 100]);
    const [medianSquareFeet, setMedianSquareFeet] = useState([0, 31000]);
    // State to keep track of bounds for active listings when querying
    const [activeListingCount, setActiveListingCount] = useState([0, 24000]);
    

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/search_counties`)
          .then(res => res.json())
          .then(resJson => {
            const countiesWithId = resJson.map((county) => (
                { 
                    id: county.id, 
                    name: formatCountyName(county.name), 
                    average: formatUnitPrice(county.average),
                    supply: county.supply,
                    demand: county.demand,
                    median_square_feet: formatUnitNumber(county.median_square_feet),
                    active: formatUnitNumber(county.active)
                }));
            setData(countiesWithId);
          });
      }, []);

      const search = () => {
        fetch(`http://${config.server_host}:${config.server_port}/search_counties?name=${name}` +
        `&average_price_low=${averagePrice[0]}&average_price_high=${averagePrice[1]}` +
        `&supply_score_low=${supplyScore[0]}&supply_score_high=${supplyScore[1]}` +
        `&demand_score_low=${demandScore[0]}&demand_score_high=${demandScore[1]}` +
        `&median_square_feet_low=${medianSquareFeet[0]}&median_square_feet_high=${medianSquareFeet[1]}` +
        `&active_listing_count_low=${activeListingCount[0]}&active_listing_count_high=${activeListingCount[1]}` +
        `&year=${year}` +
        `&month=${month}`
        )
        .then(res => res.json())
        .then(resJson => {
            const countiesWithId = resJson.map((county) => (
                { 
                    id: county.id, 
                    name: formatCountyName(county.name), 
                    average: formatUnitPrice(county.average),
                    supply: county.supply,
                    demand: county.demand,
                    median_square_feet: formatUnitNumber(county.median_square_feet),
                    active: formatUnitNumber(county.active) 
                }));
            setData(countiesWithId);
        });
      }

    // Columns for our result table
    const columns = [
        { 
            field: 'name', 
            headerName: 'Name', 
            width: 200, 
            renderCell: (params) => (
                <Link onClick={() => setSelectedCounty(params.row.id)}>{params.row.name}</Link>
            )
        },
        { 
            field: 'average', 
            headerName: 'Average Price', 
            width: 250, 
        },
        { 
            field: 'supply', 
            headerName: 'Supply Score', 
            width: 150
        },
        {
            field: 'demand', 
            headerName: 'Demand Score', 
            width: 150 
        },
        {
            field: 'median_square_feet', 
            headerName: 'Median Square Feet', 
            width: 200, 
        },
        { 
            field: 'active', 
            headerName: 'Active Listing Count', 
            width: 200, 
        },
      ]

    return (
        <Container>
            {/*Render the CountyCard if a county has been selected */}
            {selectedCounty && <CountyCard countyId={selectedCounty} handleClose={() => setSelectedCounty(null)} favorites={favorites} setFavorites={setFavorites}/>}
            {/*Header for the page*/}
            <Typography variant='h4' color={'darkgreen'} style={{marginTop: '45px', marginBottom: '40px'}}>
                Find the right county for you!
            </Typography>
            {/*A container to hold all of our search parameters*/}
            <Grid container spacing={4} direction={'row'} wrap='nowrap' alignItems={"center"} style={{marginBottom: '40px'}}>
                {/*Text Box for name search*/}
                <Grid item xs={6}>
                    <TextField label='County Name' value={name} onChange={(e) => setName(e.target.value)} 
                               style={{ width: "100%" }}/>
                </Grid>
                {/*Drop down boxes to select the month and year for our data*/}
                <Grid item xs={6}>
                    <FormControl variant="filled" sx={{minWidth: 120}}>
                        <InputLabel>Month</InputLabel>
                        <Select
                            onChange={(e) => setMonth(e.target.value)}
                            label="Month"
                            defaultValue={"02"}   
                        >
                            <MenuItem value={"01"}>Jan</MenuItem>
                            <MenuItem value={"02"}>Feb</MenuItem>
                            <MenuItem value={"03"}>Mar</MenuItem>
                            <MenuItem value={"04"}>Apr</MenuItem>
                            <MenuItem value={"05"}>May</MenuItem>
                            <MenuItem value={"06"}>Jun</MenuItem>
                            <MenuItem value={"07"}>Jul</MenuItem>
                            <MenuItem value={"08"}>Aug</MenuItem>
                            <MenuItem value={"09"}>Sep</MenuItem>
                            <MenuItem value={"10"}>Oct</MenuItem>
                            <MenuItem value={"11"}>Nov</MenuItem>
                            <MenuItem value={"12"}>Dec</MenuItem>
                            
                        </Select>
                    </FormControl>
                    <FormControl variant="filled" sx={{minWidth: 120}}>
                        <InputLabel>Year</InputLabel>
                        <Select
                            onChange={(e) => setYear(e.target.value)}
                            label="Year"    
                            defaultValue={2023}
                        >
                            {years.map(
                                (x) => <MenuItem value={x}>{x}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            {/*Sliders for Average Price, Demand Score, and Supply Score*/}
            <Grid container spacing={4} direction={'row'} wrap='nowrap' alignItems={'center'} style={{marginBottom: '40px'}}>
                <Grid item xs={6}>
                    <Typography variant='p' color={'darkgreen'}>
                        Average Price (thousands)
                    </Typography>
                    <Slider
                        value={averagePrice}
                        min={0}
                        max={10000000}
                        step={1000}
                        onChange={(e, newValue) => setAveragePrice(newValue)}
                        valueLabelDisplay='auto'
                        valueLabelFormat={value => <div>{formatPriceByThousand(value / 1000)}</div>}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='p' color={'darkgreen'}>
                        Supply Score
                    </Typography>
                    <Slider
                        value={supplyScore}
                        min={0}
                        max={100}
                        step={1}
                        onChange={(e, newValue) => setSupplyScore(newValue)}
                        valueLabelDisplay='auto'
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='p' color={'darkgreen'}>
                        Demand Score
                    </Typography>
                    <Slider
                        value={demandScore}
                        min={0}
                        max={100}
                        step={1}
                        onChange={(e, newValue) => setDemandScore(newValue)}
                        valueLabelDisplay='auto'
                    />
                </Grid>
            </Grid>
            <Grid container spacing={4} direction={'row'} wrap='nowrap' alignItems={'center'} style={{marginBottom: '40px'}}>
                {/*Sliders for median square feet and active listings*/}
                <Grid item xs={6}>
                    <Typography variant='p' color={'darkgreen'}>
                        Median Square Feet
                    </Typography>
                    <Slider
                        value={medianSquareFeet}
                        min={0}
                        max={31000}
                        step={100}
                        onChange={(e, newValue) => setMedianSquareFeet(newValue)}
                        valueLabelDisplay='auto'
                        valueLabelFormat={value => <div>{formatUnitNumber(value)}</div>}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='p' color={'darkgreen'}>
                        Active Listing Count
                    </Typography>
                    <Slider
                        value={activeListingCount}
                        min={0}
                        max={24000}
                        step={10}
                        onChange={(e, newValue) => setActiveListingCount(newValue)}
                        valueLabelDisplay='auto'
                        valueLabelFormat={value => <div>{formatUnitNumber(value)}</div>}
                    />
                </Grid>
            </Grid>
            {/*Search Button*/}
            <Button onClick={() => search() } style={{ left: '50%', transform: 'translateX(-50%)', marginBottom: '20px' }}>
                Search
            </Button>
            {/*Table with all the data*/}
            <Typography variant='h4' color={'darkgreen'} style={{marginBottom: '20px', textAlign: 'center'}}>
                Results
            </Typography>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 25]}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                autoHeight
            />
        </Container>
    )
}