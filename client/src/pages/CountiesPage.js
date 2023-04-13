import { useEffect, useState } from 'react';
import { Button, Checkbox, Container, InputLabel, FormControl, FormControlLabel, Grid, MenuItem, Select, Slider, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function CountiesPage() {
    // Have a query find the earliest date and the highest date for bounds on the date (Hardcoded for now)
    const earliest = 201708;
    const latest = 202302;
    // Array with all the years between earliest and latest
    const years = [];
    for (let i = latest; i > earliest - 100; i -= 100) {
        // Since of dates are of the form YYYYMM, we divide by 100 to get the year and increment by 100 to get the next year.
        years.push(Math.trunc(i / 100));
    }
    // State to keep track of the number of counties to show at one time
    const [pageSize, setPageSize] = useState(10);
    // State to keep track of the current counties being displayed 
    const [data, setData] = useState([]);
    // State to keep track of input to search bar
    const [name, setName] = useState('');
    // States to keep track of the date of the data that will be used to query (initially 02/2023)
    const [month, setMonth] = useState(latest % 100);
    const [year, setYear] = useState(years[0]);
    // State to keep track of bounds for average price when querying
    const [averagePrice, setAveragePrice] = useState([0, 1000000000]);
    // State to keep track of bounds for median square foot when querying
    // State to keep track of bounds for supply score when querying
    const [supplyScore, setSupplyScore] = useState([0, 100]);
    // State to keep track of bounds for demand score when querying
    const [demandScore, setDemandScore] = useState([0, 100]);
    const [medianSquareFoot, setMedianSquareFoot] = useState([0, 57000]);
    // State to keep track of bounds for active listings when querying
    const [activeListingCount, setActiveListingCount] = useState([0, 24000]);
    // State to keep track of whether to sort by hotness score or not
    const [sortByHotness, setSortByHotness] = useState(false);

    // Columns for our result table
    // TODO: For the name, add , renderCell: (params) => (Link to county card)
    const columns = [
        { field: 'name', headerName: 'Name', width: 200},
        { field: 'averagePrice', headerName: 'Average Price', width: 250},
        { field: 'supplyScore', headerName: 'Supply Score', width: 150},
        { field: 'demandScore', headerName: 'Demand Score', width: 150 },
        { field: 'medianSquareFoot', headerName: 'Median Square Foot', width: 200 },
        { field: 'activeListingCount', headerName: 'Active Listing Count', width: 200 },
      ]

    return (
        <Container>
            {/*Header for the page*/}
            <Typography variant='h3' color={'darkgreen'} style={{marginTop: '45px', marginBottom: '40px'}}>
                Find the right county for you!
            </Typography>
            {/*A container to hold all of our search parameters*/}
            <Grid container spacing={4} direction={'row'} wrap='nowrap' alignItems={"center"} style={{marginBottom: '40px'}}>
                {/*Text Box for name search*/}
                <Grid item xs={6}>
                    <TextField label='County Name' value={name} onChange={(e) => setName(e.target.value)} 
                               style={{ width: "100%" }}/>
                </Grid>
                {/*Checkbox for whether we want our results sorted by Hotness values*/}
                <Grid item xs={3}>
                    <FormControlLabel 
                        label='Sort By Hotness' 
                        control={<Checkbox checked={sortByHotness} onChange={(e) => setSortByHotness(e.target.checked)}/>}
                    />
                </Grid>
                {/*Drop down boxes to select the month and year for our data*/}
                <Grid item xs={6}>
                    <FormControl variant="filled" sx={{minWidth: 120}}>
                        <InputLabel>Month</InputLabel>
                        <Select
                            onChange={(e) => setMonth(e.target.value)}
                            label="Month"   
                        >
                            <MenuItem value={1}>Jan</MenuItem>
                            <MenuItem value={2}>Feb</MenuItem>
                            <MenuItem value={3}>Mar</MenuItem>
                            <MenuItem value={4}>Apr</MenuItem>
                            <MenuItem value={5}>May</MenuItem>
                            <MenuItem value={6}>Jun</MenuItem>
                            <MenuItem value={7}>Jul</MenuItem>
                            <MenuItem value={8}>Aug</MenuItem>
                            <MenuItem value={9}>Sep</MenuItem>
                            <MenuItem value={10}>Oct</MenuItem>
                            <MenuItem value={11}>Nov</MenuItem>
                            <MenuItem value={12}>Dec</MenuItem>
                            
                        </Select>
                    </FormControl>
                    <FormControl variant="filled" sx={{minWidth: 120}}>
                        <InputLabel>Year</InputLabel>
                        <Select
                            onChange={(e) => setYear(e.target.value)}
                            label="Year"    
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
                        Average Price (millions)
                    </Typography>
                    <Slider
                        value={averagePrice}
                        min={0}
                        max={1000000000}
                        step={10000000}
                        onChange={(e, newValue) => setAveragePrice(newValue)}
                        valueLabelDisplay='auto'
                        valueLabelFormat={value => <div>{value / 10000000}</div>}
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
                        step={5}
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
                        step={5}
                        onChange={(e, newValue) => setDemandScore(newValue)}
                        valueLabelDisplay='auto'
                    />
                </Grid>
            </Grid>
            <Grid container spacing={4} direction={'row'} wrap='nowrap' alignItems={'center'} style={{marginBottom: '40px'}}>
                {/*Sliders for median square foot and active listings*/}
                <Grid item xs={6}>
                    <Typography variant='p' color={'darkgreen'}>
                        Median Square Foot
                    </Typography>
                    <Slider
                        value={medianSquareFoot}
                        min={0}
                        max={57000}
                        step={100}
                        onChange={(e, newValue) => setMedianSquareFoot(newValue)}
                        valueLabelDisplay='auto'
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
                        step={100}
                        onChange={(e, newValue) => setActiveListingCount(newValue)}
                        valueLabelDisplay='auto'
                    />
                </Grid>
            </Grid>
            {/*Search Button*/}
            <Button style={{ left: '50%', transform: 'translateX(-50%)', marginBottom: '30px' }}>
                Search
            </Button>
            {/*Table with all the data*/}
            <Typography variant='h4' color={'darkgreen'} style={{marginBottom: '40px'}}>
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