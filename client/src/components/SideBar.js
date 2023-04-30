import { AppBar, Box, Button, Container, Drawer, List, ListItem, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

// A side bar for the UI

// NavText from HW2 with some changes to styling
const NavText = ({ href, text}) => {
  return (
    <Typography
      variant='h5'
      style={{
        padding: '5px',
        marginRight: '30px',
        marginBottom: '10px',
        fontFamily: 'sans-serif',
        fontWeight: 525,
        letterSpacing: '.15rem',
      }}
    >
      <NavLink
        to={href}
        style={{
          color: 'darkGreen',
          textDecoration: 'none',
        }}
      >
        {text}
      </NavLink>
    </Typography>
  )
};

// A list with all NavTexts to all of the pages
const menuList = (
      <Box
        sx={250}
        role="presentation"     
      >
        <List>
            <ListItem key="home" disablePadding>
              <NavText href='/' text='Home' />
            </ListItem>
            <ListItem key="county_directory" disablePadding>
              <NavText href='/county_directory' text = 'County Directory'/>
            </ListItem>
            <ListItem key="compare_favorites" disablePadding>
              <NavText href='/compare_favorites' text = 'Compare Favorites'/>
            </ListItem>
            <ListItem key="search_counties" disablePadding>
              <NavText href='/search_counties' text = 'Search Counties'/>
            </ListItem>
        </List>
    </Box>
);

// Here, we define the SideBar, which uses similar components to the NavBar in HW2. 
export default function SideBar() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <AppBar position='static'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            {/*Button to open sidebar*/}
            <Button variant="text" color='success' onClick={() => setOpenMenu(true)}>
              <Typography
                variant='h5'
                style={{
                  marginRight: '35px',
                  fontFamily: 'sans-serif',
                  fontWeight: 700,
                  letterSpacing: '.15rem',
                }}
              >
                Menu
              </Typography>
            </Button>
        </Toolbar>
          {/*The Actual Side Menu*/}
          <Drawer
            open={openMenu}
            onClose={() => setOpenMenu(false)}
            PaperProps={{
              sx: {
                backgroundColor: '#8BC24A'
              }
            }}
          >
            {menuList}
          </Drawer>
      </Container>
    </AppBar>
  );
}