import { useEffect, useState } from 'react';
import { Button, Container, Link, Typography} from '@mui/material';
import CountyCard from '../components/CountyCard';
import { DataGrid } from '@mui/x-data-grid';
import {formatCountyName} from '../helpers/formatter';

const config = require('../config.json');

export default function CountyDirectoryPage({favorites, setFavorites}) {
    // State to keep track of the current counties being displayed 
    const [data, setData] = useState([]);
    // State to keep track of the current letter selected by user
    const [letter, setLetter] = useState('all');
    // State to keep track of which county card to display
    const [selectedCounty, setSelectedCounty] = useState(null);
    // State to keep track of the number of counties to show at one time
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/counties_starting_with/${letter}`)
          .then(res => res.json())
          .then(resJson => {
            const counties = resJson.map((county) => (
                {  
                    id: county.id,
                    name: formatCountyName(county.name), 
                }));
            setData(counties);
          });
      }, [letter]);

    const buttonOptions = (
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
              'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'all'].map(
            (buttonLetter) => (
                <Button 
                    variant="text"
                    onClick={() => {
                            setLetter(buttonLetter);
                        }
                    }
                >
                    {buttonLetter}
                </Button>
            )
        )
        
    );

    const columns = [
        { 
            field: 'name', 
            headerName: 'Name', 
            width: 200, 
            renderCell: (params) => (
                <Link onClick={() => setSelectedCounty(params.row.id)}>{params.row.name}</Link>
            )
        }
    ]
    
    return (
        <Container>
            {/*Render the CountyCard if a county has been selected */}
            {selectedCounty && <CountyCard countyId={selectedCounty} handleClose={() => setSelectedCounty(null)} favorites={favorites} setFavorites={setFavorites}/>}
            {/*Header for the page*/}
            <Typography variant='h3' color={'darkgreen'} style={{marginTop: '45px', marginBottom: '40px'}}>
                County Directory
            </Typography>
            <Typography variant='h5' color={'darkgreen'} style={{marginTop: '45px', marginBottom: '40px'}}>
                Counties that start with:
            </Typography>
            {buttonOptions} 
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 25]}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                style={{
                    marginTop: "20px"
                }}
                autoHeight
            />
        </Container>
    )
}