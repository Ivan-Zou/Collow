import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightGreen } from '@mui/material/colors'
import { createTheme } from "@mui/material/styles";

import SideBar from './components/SideBar';
import HomePage from './pages/HomePage';
import SearchCountiesPage from "./pages/SearchCountiesPage";
import CountyDirectoryPage from "./pages/CountyDirectoryPage";

// createTheme enables you to customize the look and feel of your app past the default
// in this case, we only change the color scheme
export const theme = createTheme({
  palette: {
    primary: lightGreen,
    secondary: lightGreen,
  },
});

// App is the root component of our application and as children contain all our pages
// We use React Router's BrowserRouter and Routes components to define the pages for
// our application, with each Route component representing a page and the common
// NavBar component allowing us to navigate between pages (with hyperlinks)
export default function App() {
  const [favorites, setFavorites] = useState([]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search_counties" element={<SearchCountiesPage favorites={favorites} setFavorites={setFavorites}/>} />
          <Route path="/county_directory" element={<CountyDirectoryPage favorites={favorites} setFavorites={setFavorites}/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}