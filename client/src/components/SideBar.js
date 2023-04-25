import { AppBar, Box, Button, Container, Drawer, List, ListItem, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

// The hyperlinks in the NavBar contain a lot of repeated formatting code so a
// helper component NavText local to the file is defined to prevent repeated code.

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

const menuList = (
      <Box
        sx={250}
        role="presentation"     
      >
        <List>
            <ListItem key="home" disablePadding>
              <NavText href='/' text='Home' />
            </ListItem>
            <ListItem key="songs" disablePadding>
              <NavText href='/songs' text='Songs' />  
            </ListItem>
            <ListItem key="search_counties" disablePadding>
              <NavText href='/search_counties' text = 'Search Counties'/>
            </ListItem>
        </List>
    </Box>
);

// Here, we define the NavBar. Note that we heavily leverage MUI components
// to make the component look nice. Feel free to try changing the formatting
// props to how it changes the look of the component.
export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <AppBar position='static'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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