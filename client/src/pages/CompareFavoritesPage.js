import { useEffect, useState } from 'react';
import { Box, Container, Checkbox, Link, FormControlLabel, Typography, Divider } from '@mui/material';
import CountyCard from '../components/CountyCard';
import { formatUnitNumber, formatUnitPrice, formatPriceByThousand, formatCountyName} from '../helpers/formatter';
const config = require('../config.json');

export default function CompareFavoritesPage({favorites, setFavorites}) {
    const earliest = 201708;
    const latest = 202302;
    // Array with all the years between earliest and latest
    const years = [];
    for (let i = latest; i >= earliest; i -= 100) {
        // Since of dates are of the form YYYYMM, we divide by 100 to get the year and increment by 100 to get the next year.
        years.push(Math.trunc(i / 100));
    }
    // States to keep track of the date of the data that will be used to query (initially 02/2023)
    const [month, setMonth] = useState("02");
    const [year, setYear] = useState(years[0]);
    // State to keep track of data of ALL favorites
    const[data, setData] = useState([]);
    // State to keep track of the counties that the user wants to compare
    const [counties, setCounties] = useState([]);
    // State to keep track of which county card to display
    const [selectedCounty, setSelectedCounty] = useState(null);

    useEffect(() => {
        const favoriteIds = "(" + favorites.map((id) => `${id}`).join(',') + ")";
        fetch(`http://${config.server_host}:${config.server_port}/county_metrics_by_date/${favoriteIds}/${parseInt(year + month)}`)
        .then(res => res.json())
        .then(resJson => {
            setData(resJson);
        });
    }, [favorites])

    return (
        <Container>
            {favorites.length == 0 ? 
               (<Typography variant='h4' color={'darkgreen'} style={{marginTop: '45px', marginBottom: '40px'}}>
                    You don't have any favorites! Come back when you have some.
                </Typography>) :
                (
                    <Box>
                        <Typography variant='h4' color={'darkgreen'} style={{marginTop: '45px', marginBottom: '40px'}}>
                        Select the counties you want to compare.
                        </Typography>
                        <h1>{data.length}</h1>
                        <h1>{"(" + favorites.map((id) => `${id}`).join(',') + ")"}</h1>
                    </Box>
                )
            }
        </Container>
    )
}