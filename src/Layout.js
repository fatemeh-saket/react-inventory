import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Component/Layout/Header';
import Content from './Component/Layout/Content';
import Sidebar from './Component/Layout/Sidbar';
import ThemeContext from './Store/ThemeContext'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IRANSansWebWoff2 from './assets/Font/IRANSansWeb/IRANSansWeb.woff2';
import playfairdisplay from './assets/Font/playfairdisplay/playfairdisplay-variablefont_wght-webfont.woff2';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect, useState } from 'react';


export default function Layout() {
  const ctx = useContext(ThemeContext)

  // *******change font-family in material ui/
  const theme = createTheme({
    typography: {
      fontFamily: ctx.locale !== "en" ? 'IRANSansWeb' : 'playfairdisplay',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'IRANSansWeb';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('IRANSansWeb'), local('IRANSansWeb-Regular'), url(${IRANSansWebWoff2}) format('woff2');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'playfairdisplay';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('playfairdisplay'), local('playfairdisplay-Regular'), url(${playfairdisplay}) format('woff2');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
  });
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  useEffect(() => {
    handleClick()
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ fontFamily: 'IRANSansWeb', display: 'flex', height: '100vh !important' }} >
        <CssBaseline />
        <Header />
        {!ctx.isRtl ? <Sidebar /> : <Content />}
        {!ctx.isRtl ? <Content /> : <Sidebar />}
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="لطفا قبل از بررسی پروژه برای درک بهتر کارکرد آن، فایل راهنما را مطالعه نمایید."
        action={action}
      />
    </ThemeProvider>

  );
}