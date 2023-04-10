import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { purple } from '@mui/material/colors';
import { NavLink } from 'react-router-dom';

// The hyperlinks in the NavBar contain a lot of repeated formatting code so a
// helper component NavText local to the file is defined to prevent repeated code.
const NavText = ({ href, text, isMain }) => {
  return (
    <Typography
      variant={isMain ? 'h4' : 'h5'}
      style={{
        marginRight: '30px',
        fontFamily: 'sans-serif',
        fontWeight: 750,
        letterSpacing: '.3rem',
      }}
    >
      <NavLink
        to={href}
        style={{
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {text}
      </NavLink>
    </Typography>
  )
}

// Here, we define the NavBar. Note that we heavily leverage MUI components
// to make the component look nice. Feel free to try changing the formatting
// props to how it changes the look of the component.
export default function NavBar() {
  return (
    <AppBar position='static'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <NavText href='/' text='COLLOW' isMain />
          <NavText href='/albums' text='ALBUMS' />
          <NavText href='/songs' text='SONGS' />
          <NavText href='/counties' text = 'COUNTIES'/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}