import { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Select, Tabs, Tab, Typography} from '@mui/material';
import { Bar, BarChart, ResponsiveContainer, Line, LineChart, Legend, XAxis, YAxis, Tooltip } from 'recharts';
import { formatCountyName} from '../helpers/formatter';

const config = require('../config.json');

export default function CountyCard({countyId, handleClose, favorites, setFavorites}) {
    // State to keep track of county name
    const [name, setName] = useState('');
    // State to keep track of county metrics from all dates
    const [countyMetrics, setCountyMetrics] = useState(null);
    // State to keep track of county scores from all dates
    const [countyScores, setCountyScores] = useState(null);
    // State to keep track of whether to display median price
    const [medPrice, setMedPrice] = useState(false);
    // State to keep track of whether to display average price
    const [avgPrice, setAvgPrice] = useState(false);
    // State to keep track of whether to display active listings
    const [activeListings, setActiveListings] = useState(false);
    // State to keep track of whether to display total listings
    const [totalListings, setTotalListings] = useState(false);
    // State to keep track of whether to display median square foot
    const [medSquareFoot, setMedSquareFoot] = useState(false);
    // State to keep track of whether to display hotness
    const [hotness, setHotness] = useState(false);
    // State to keep track of whether to display median price
    const [supply, setSupply] = useState(false);
    // State to keep track of whether to display average price
    const [demand, setDemand] = useState(false);
    // State to keep track of whether to display median price per square foot
    const [pricePerSquareFoot, setPricePerSquareFoot] = useState(false);
    // State to keep track of which info to display
    const [infoToDisplay, setInfoToDisplay] = useState(0);
    // State to keep track of whether the current county is favorited
    const [inFavorites, setInFavorites] = useState(favorites.includes(countyId));
    // State to keep track of average, min, max
    const [allTimeData, setAllTimeData] = useState([]);
    // State to keep track of which data to show for allTimeData
    const [attribute, setAttribute] = useState("Average_Listing_Price");

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/county_metrics/${countyId}`)
            .then(res => res.json())
            .then(resJson => {
                setCountyMetrics(resJson);
                fetch(`http://${config.server_host}:${config.server_port}/county_name/${countyId}`)
                .then(res => res.text())
                .then(resText => {
                    setName(formatCountyName(resText));
                    fetch(`http://${config.server_host}:${config.server_port}/average_county_info/${countyId}`)
                        .then(res => res.json()) 
                        .then(resJson2 => {
                            const average = {
                                Type: "Average",
                                Average_Listing_Price: resJson2.average_avg,
                                Median_Listing_Price: resJson2.median_avg,
                                Total_Listing_Count: resJson2.total_avg,
                                Active_Listing_Count: resJson2.active_avg,
                                New_Listing_Count: resJson2.new_avg,
                                Median_Price_Per_Square_Foot: resJson2.median_listing_price_per_square_foot_avg,
                                Median_Square_Feet: resJson2.median_square_feet_avg,
                                Hotness: resJson2.hotness_avg,
                                Viewers: resJson2.viewer_avg,
                                Supply: resJson2.supply_avg,
                                Demand: resJson2.demand_avg
                            }
                            average.Type="Average"
                            fetch(`http://${config.server_host}:${config.server_port}/maximum_county_info/${countyId}`)
                            .then(res => res.json())
                            .then(resJson4 => {
                                const max = {
                                    Type: "Maximum",
                                    Average_Listing_Price: resJson4.average_max,
                                    Median_Listing_Price: resJson4.median_max,
                                    Total_Listing_Count: resJson4.total_max,
                                    Active_Listing_Count: resJson4.active_max,
                                    New_Listing_Count: resJson4.new_max,
                                    Median_Price_Per_Square_Foot: resJson4.median_listing_price_per_square_foot_max,
                                    Median_Square_Feet: resJson4.median_square_feet_max,
                                    Hotness: resJson4.hotness_max,
                                    Viewers: resJson4.viewer_max,
                                    Supply: resJson4.supply_max,
                                    Demand: resJson4.demand_max
                                }
                                fetch(`http://${config.server_host}:${config.server_port}/minimum_county_info/${countyId}`)
                                    .then(res => res.json())
                                    .then(resJson5 => {
                                        const min = {
                                            Type: "Minimum",
                                            Average_Listing_Price: resJson5.average_min,
                                            Median_Listing_Price: resJson5.median_min,
                                            Total_Listing_Count: resJson5.total_min,
                                            Active_Listing_Count: resJson5.active_min,
                                            New_Listing_Count: resJson5.new_min,
                                            Median_Price_Per_Square_Foot: resJson5.median_listing_price_per_square_foot_min,
                                            Median_Square_Feet: resJson5.median_square_feet_min,
                                            Hotness: resJson5.hotness_min,
                                            Viewers: resJson5.viewer_min,
                                            Supply: resJson5.supply_min,
                                            Demand: resJson5.demand_min
                                        }
                                        setAllTimeData([average, max, min]);
                                    }
                                );
                            }
                        );
                    })
                })  
            });
    }, []);

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/county_scores/${countyId}`)
            .then(res => res.json())
            .then(resJson3 => {
                setCountyScores(resJson3);
            }
        );
    }, []);

    const handleTabChange = (event, newTabIndex) => {
        setInfoToDisplay(newTabIndex);
    };

    const updateFavorites = () => {
        if (inFavorites) {
            setInFavorites(false);
            setFavorites(favorites.filter(id => id != countyId));
        } else {
            setInFavorites(true);
            setFavorites([...favorites, countyId]);
        }
    }

    return (
        <Modal
            open={true}
            onClose={(handleClose)}
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
            <Box
                p={4}
                style={{
                    backgroundColor: 'white',
                    borderRadius: '16px', 
                    border: '3px solid darkgreen',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',  
                    alignItems: 'center',
                    width: 1200 
                }}
            >   
                <Typography variant='h3' color={'darkgreen'} style={{textAlign: 'center', marginTop: '45px', marginBottom: '40px'}}>
                    {name}
                </Typography>
                <Tabs value={infoToDisplay} onChange={handleTabChange}>
                    <Tab label="Prices"/>
                    <Tab label="Listings"/>
                    <Tab label="Square Footage"/>
                    <Tab label="Hotness"/>
                    <Tab label="All Time"/>
                </Tabs>
                {infoToDisplay === 0 && (
                    <Box style={{
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',  
                        alignItems: 'center'
                    }}>
                        <ButtonGroup style={{display: 'flex', alignItems: 'center'}} >
                            <FormControlLabel 
                                control={<Checkbox checked={avgPrice} onChange={() => setAvgPrice(!avgPrice)}/>}
                                label="Avg. Price"
                                labelPlacement='start'
                            />
                            <FormControlLabel 
                                control={<Checkbox checked={medPrice} onChange={() => setMedPrice(!medPrice)}/>}
                                label="Med. Price"
                                labelPlacement='start'
                            />
                        </ButtonGroup>
                        <ResponsiveContainer height={250}>
                            <LineChart data={countyMetrics} style={{width: '1100px'}}>
                                <XAxis dataKey="date" interval={'preserveStartEnd'}/>
                                <YAxis></YAxis>
                                <Legend></Legend>
                                <Tooltip></Tooltip>
                                {avgPrice && <Line dataKey="Average" stroke="darkgreen" activeDot={{ r: 8 }}/>}
                                {medPrice && <Line dataKey="Median" stroke="red" activeDot={{ r: 8 }}/>}
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                )}
                {infoToDisplay === 1 && (
                    <Box style={{
                        padding: '20px',
                        width: '800',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',  
                        alignItems: 'center'
                    }}>
                        <ButtonGroup style={{display: 'flex', alignItems: 'center'}}>
                            <FormControlLabel 
                                control={<Checkbox checked={activeListings} onChange={() => setActiveListings(!activeListings)}/>}
                                label="Active Listings"
                                labelPlacement='start'
                            />
                            <FormControlLabel 
                                control={<Checkbox checked={totalListings} onChange={() => setTotalListings(!totalListings)}/>}
                                label="Total Listings"
                                labelPlacement='start'
                            />
                        </ButtonGroup>
                        <ResponsiveContainer height={250}>
                            <LineChart data={countyMetrics} style={{width: '1100px'}}>
                                <XAxis dataKey="date" interval={'preserveStartEnd'}></XAxis>
                                <YAxis></YAxis>
                                <Legend></Legend>
                                <Tooltip></Tooltip>
                                {activeListings && <Line dataKey="Active" stroke="darkgreen" activeDot={{ r: 8 }}/>}
                                {totalListings && <Line dataKey="Total" stroke="red" activeDot={{ r: 8 }}/>}
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                )}
                {infoToDisplay === 2 && (
                    <Box style={{
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',  
                        alignItems: 'center'
                    }}>
                        <ButtonGroup>
                            <FormControlLabel 
                                control={<Checkbox checked={medSquareFoot} onChange={() => setMedSquareFoot(!medSquareFoot)}/>}
                                label="Median Sq. Feet"
                                labelPlacement='start'
                            />
                            <FormControlLabel 
                                control={<Checkbox checked={pricePerSquareFoot} onChange={() => setPricePerSquareFoot(!pricePerSquareFoot)}/>}
                                label="Median Price Per Sq. Ft."
                                labelPlacement='start'
                            />
                        </ButtonGroup>
                        <ResponsiveContainer height={250}>
                            <LineChart data={countyMetrics} style={{width: '1100px'}}>
                                <XAxis dataKey="date" interval={'preserveStartEnd'}></XAxis>
                                <YAxis></YAxis>
                                <Legend></Legend>
                                <Tooltip></Tooltip>
                                {medSquareFoot && <Line dataKey="Square_Feet" stroke="darkgreen" activeDot={{ r: 8 }}/>}
                                {pricePerSquareFoot && <Line dataKey="Square_Price" stroke="red" activeDot={{ r: 8 }}/>}
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                )}
                {infoToDisplay === 3 && (
                    <Box style={{
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',  
                        alignItems: 'center'
                    }}>
                        <ButtonGroup style={{display: 'flex', alignItems: 'center'}} >
                            <FormControlLabel 
                                control={<Checkbox checked={hotness} onChange={() => setHotness(!hotness)}/>}
                                label="Hotness"
                                labelPlacement='start'
                            />
                            <FormControlLabel 
                                control={<Checkbox checked={supply} onChange={() => setSupply(!supply)}/>}
                                label="Supply"
                                labelPlacement='start'
                            />
                            <FormControlLabel 
                                control={<Checkbox checked={demand} onChange={() => setDemand(!demand)}/>}
                                label="Demand"
                                labelPlacement='start'
                            />
                        </ButtonGroup>
                        <ResponsiveContainer height={250}>
                            <LineChart data={countyScores} style={{width: '1100px'}}>
                                <XAxis dataKey="date" interval={'preserveStartEnd'}></XAxis>
                                <YAxis></YAxis>
                                <Legend></Legend>
                                <Tooltip></Tooltip>
                                {hotness && <Line dataKey="Hotness" stroke="red" activeDot={{ r: 8 }}/>}
                                {supply && <Line dataKey="Supply" stroke="lightgreen" activeDot={{ r: 8 }}/>}
                                {demand && <Line dataKey="Demand" stroke="darkgreen" activeDot={{ r: 8 }}/>}
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                )}
                {infoToDisplay === 4 &&
                    (
                        <Box style={{
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',  
                            alignItems: 'center'
                        }}>
                            <FormControl variant="filled" sx={{minWidth: 120}} style={{marginBottom:"30px"}}> 
                                <InputLabel>Attribute</InputLabel>
                                    <Select
                                        onChange={(e) => setAttribute(e.target.value)}
                                        label="Attribute"
                                        defaultValue={"Average_Listing_Price"}   
                                    >
                                        <MenuItem value={"Average_Listing_Price"}>Average Listing Price</MenuItem>
                                        <MenuItem value={"Median_Listing_Price"}>Median Listing Price</MenuItem>
                                        <MenuItem value={"Total_Listing_Count"}>Total Listing Count</MenuItem>
                                        <MenuItem value={"Active_Listing_Count"}>Active Listing Count</MenuItem>
                                        <MenuItem value={"New_Listing_Count"}>New Listing Count</MenuItem>
                                        <MenuItem value={"Median_Price_Per_Square_Foot"}>Median Price Per Square Foot</MenuItem>
                                        <MenuItem value={"Median_Square_Feet"}>Median Square Feet</MenuItem>
                                        <MenuItem value={"Hotness"}>Hotness</MenuItem>
                                        <MenuItem value={"Viewers"}>Viewers</MenuItem>
                                        <MenuItem value={"Supply"}>Supply</MenuItem>
                                        <MenuItem value={"Demand"}>Demand</MenuItem>
                                    </Select>
                                </FormControl>
                            <ResponsiveContainer height={250}>
                            <BarChart data={allTimeData} style={{width: '1100px'}}>
                                <XAxis dataKey="Type"></XAxis>
                                <YAxis></YAxis>
                                <Legend></Legend>
                                <Tooltip></Tooltip>
                                <Bar dataKey={attribute} fill='#82CA9D' maxBarSize={25}/>
                            </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    )
                }
                <Button onClick={() => updateFavorites()} style={{ left: '50%', transform: 'translateX(-50%)' }}>
                    {inFavorites ? "Delete From Favorites" : "Add To Favorites"}
                </Button>
                <Button onClick={handleClose} style={{ left: '50%', transform: 'translateX(-50%)' }} >
                    Close
                </Button>
            </Box>
        </Modal>
    )
}