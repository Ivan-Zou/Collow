import { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Checkbox, FormControlLabel, Tabs, Tab, Typography, Modal } from '@mui/material';
import { ResponsiveContainer, Line, LineChart, Legend, XAxis, YAxis, Tooltip } from 'recharts';
import { formatCountyName } from '../helpers/formatter';

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
    const [infoToDisplay, setInfoToDisplay] = useState(1);
    const [inFavorites, setInFavorites] = useState(favorites.includes(countyId));
    const [averageData, setAverageData] = useState([]);
    const [maxData, setMaxData] = useState([]);
    const [minData, setMinData] = useState([]);
    // State to keep track of whether to display average data
    const [allTime, setAllTime] = useState(0);

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
                            setAverageData(resJson2);
                    })
                })  
            });
    }, []);

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/county_scores/${countyId}`)
            .then(res => res.json())
            .then(resJson3 => {
                setCountyScores(resJson3)
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
                            <ButtonGroup style={{display: 'flex', alignItems: 'center'}} >
                                <Button onClick={() => setAllTime(0)}>Average</Button>
                                <Button onClick={() => setAllTime(1)}>Maximum</Button>
                                <Button onClick={() => setAllTime(2)}>Minimum</Button>
                            </ButtonGroup>
                            {averageData.length}
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