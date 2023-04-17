import { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Checkbox, FormControlLabel, Typography, Modal } from '@mui/material';
import { ResponsiveContainer, LineChart, Legend, XAxis, YAxis, Tooltip } from 'recharts';
import { NavLink } from 'react-router-dom';

const config = require('../config.json');

export default function CountyCard({countyId, handleClose}) {
    // State to keep track of county data from all dates
    const [countyData, setCountyData] = useState(null);
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

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/county_metrics/${countyId}`)
            .then(res => res.json())
            .then(resJson => {
                console.log(resJson);
                setCountyData(resJson);
            })
    }, []);
    /*
    {countyData ? (<h1> Hello </h1>) : (<h1> Bye Bye</h1>)}
                <Typography variant='h3' color={'darkgreen'} style={{textAlign: 'center', marginTop: '45px', marginBottom: '40px'}}>
                    County Name (Styled :D)
                </Typography>
                <ButtonGroup style={{display: 'flex', alignItems: 'center'}} >
                    <FormControlLabel 
                        control={<Checkbox checked={avgPrice} onChange={() => setAvgPrice(!avgPrice)}/>}
                        label="Avg. $"
                        labelPlacement='start'
                    />
                    <FormControlLabel 
                        control={<Checkbox checked={medPrice} onChange={() => setMedPrice(!medPrice)}/>}
                        label="Med. $"
                        labelPlacement='start'
                    />
                    <FormControlLabel 
                        control={<Checkbox checked={pricePerSquareFoot} onChange={() => setPricePerSquareFoot(!pricePerSquareFoot)}/>}
                        label="$ Per Sq. Ft."
                        labelPlacement='start'
                    />
                </ButtonGroup>
                <ButtonGroup>
                    <FormControlLabel 
                        control={<Checkbox checked={activeListings} onChange={() => setActiveListings(!activeListings)}/>}
                        label="Act. Listings"
                        labelPlacement='start'
                    />
                    <FormControlLabel 
                        control={<Checkbox checked={totalListings} onChange={() => setTotalListings(!totalListings)}/>}
                        label="Ttl. Listings"
                        labelPlacement='start'
                    />
                </ButtonGroup>
                <ResponsiveContainer height={250}>
                    <LineChart data={countyData}>
                        <XAxis dataKey="date" interval={'preserveStartEnd'}></XAxis>
                        <YAxis></YAxis>
                        <Legend></Legend>
                        <Tooltip></Tooltip>
                    </LineChart>
                </ResponsiveContainer>
                <ButtonGroup style={{}}>
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
                <FormControlLabel 
                        control={<Checkbox checked={medSquareFoot} onChange={() => setMedSquareFoot(!medSquareFoot)}/>}
                        label="Med. Sq. Ft."
                        labelPlacement='start'
                />
                <Button onClick={handleClose} style={{ left: '50%', transform: 'translateX(-50%)' }} >
                    Close
                </Button>
    */
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
                    width: 800 
                }}
            >   
            </Box>
        </Modal>
    )

}