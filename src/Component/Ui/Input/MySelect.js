
import { useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import TextField from '@mui/material/TextField';
import ThemeContext from '../../../Store/ThemeContext'

import MenuItem from '@mui/material/MenuItem';



const MySelect = ({ field, form, ...props }) => {
    const ctx = useContext(ThemeContext)

    //   ******************change side for rtl and ltr in TextField
    const theme = createTheme({
        direction: 'rtl',
    });
    // Create rtl cache
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: ctx.isRtl ? [prefixer, rtlPlugin] : [],
    });
    //   ******************end change side for rtl and ltr in TextField
    return (
        <CacheProvider value={cacheRtl} >
            <ThemeProvider theme={theme}>
                <div dir={ctx.isRtl ? 'rtl' : 'ltr'} >
                    <TextField
                        style={props.style}
                        id="outlined-select-currency"
                        select
                        label={props.label}
                        // helperText="Please select your currency"
                        {...field}
                    >
                        {props.menuItem.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <div style={{ color: "red" }}>{props.errors}</div>

                </div>
            </ThemeProvider>
        </CacheProvider>
    )
}
export default MySelect