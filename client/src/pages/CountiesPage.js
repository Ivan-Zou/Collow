import { useEffect, useState } from 'react';
import { Checkbox, Container, InputLabel, FormControl, FormControlLabel, Grid, MenuItem, Select, Slider, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function CountiesPage() {
    // State to keep track of the number of counties to show at one time
    const [pageSize, setPageSize] = useState(10);
    // State to keep track of the current counties being displayed 
    const [data, setData] = useState([]);

    // State to keep track of input to search bar
    const [name, setName] = useState('');
    // State to keep track of the date of the data that will be used to query (initially 02/2023)
    const [date, setDate] = useState(202302);
    // State to keep track of bounds for average price when querying
    const [averagePrice, setAveragePrice] = useState([0, 1000000000]);
    // State to keep track of bounds for median square foot when querying
    const [medianSquareFoot, setMedianSquareFoot] = useState([0, 57000]);
    // State to keep track of bounds for active listings when querying
    const [activeListingCount, setActiveListingCount] = useState([0, 24000]);
    // State to keep track of bounds for demand score when querying
    const [demandScore, setDemandScore] = useState([0, 100]);
    // State to keep track of bounds for supply score when querying
    const [supplyScore, setSupplyScore] = useState([0, 100]);
    // State to keep track of whether to sort by hotness score or not
    const [sortByHotness, setSortByHotness] = useState(false);

    
    return (
        <Container>
            <Typography variant='h3' color={'darkgreen'} style={{marginTop: '45px', marginBottom: '40px'}}>
                Find the right county for you!
            </Typography>
            <Grid container spacing={4} direction={'row'} wrap='nowrap' alignItems={"center"}>
                <Grid item xs={6}>
                    <TextField label='County Name' value={name} onChange={(e) => setName(e.target.value)} 
                               style={{ width: "100%" }}/>
                </Grid>
                <Grid item xs={3}>
                    <FormControlLabel 
                        label='Sort By Hotness' 
                        control={<Checkbox checked={sortByHotness} onChange={(e) => setSortByHotness(e.target.checked)}/>}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="filled" sx={{minWidth: 120}}>
                        <InputLabel>Date</InputLabel>
                        <Select
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            label="Date"    
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Container>
    )
}