import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import classes from './Header.module.css';
import { ReactCountryFlag } from 'react-country-flag'
import { useContext } from 'react';
import ThemeContext from '../../Store/ThemeContext'
import { FormattedMessage } from 'react-intl';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import { useSelector } from 'react-redux';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        border: "none"
    },
}));
const drawerWidth = 240;

const Header = () => {
    const ctx = useContext(ThemeContext)
    const data = useSelector(state => state.products.items)
    const limitProduct = data.filter(element => (element.totalNumber !== "0" && element.totalNumber <= 5) || (element.weight !== "0" && element.weight <= 10))


    {/* *******open menue */ }
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorE2, setAnchorE2] = useState(null);
    const openNotfic = Boolean(anchorE2);
    const handleClickNotific = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleCloseNotific = () => {
        setAnchorE2(null);
    };
    {/* *******end open menue */ }


    const ThemIcon = () => {
        if (ctx.skin === "Light") {
            return (
                <IconButton aria-label="moon" onClick={() => {
                    ctx.changeColor("Light");
                }}
                >
                    <Brightness2OutlinedIcon color='primary'
                    />
                </IconButton>
            )
        }
        else if (ctx.skin === "Dark") {
            return (
                <IconButton aria-label="sun" onClick={() => {
                    ctx.changeColor("Dark");

                }} >
                    <WbSunnyOutlinedIcon
                        color='primary'
                    // sx={{
                    //     color: "#C38FFF",
                    //     // color:"#0B5ED7"
                    // }} 
                    />
                </IconButton>
            )
        }
    }
    return (
        <AppBar className={`${classes.header} ${ctx.skin === "Light" ? classes.lightTheme : classes.darkTheme}`}
            position="fixed"
            sx={{
                width: `calc(92% - ${drawerWidth}px)`,
                //*****left side
                ml: !ctx.isRtl ? `${drawerWidth}px` : 0,
                //*****right side
                mr: ctx.isRtl ? `${drawerWidth}px` : 0,
            }}
        >
            <Toolbar>
                <div className={classes[`header-item`]}>
                    <Typography variant="h6" noWrap component="div">
                        <FormattedMessage id='header-title' defaultMessage={"titile"} />
                    </Typography>
                    <div className={classes.navbar} >
                        {/* *******notification */}
                        <section >
                            <IconButton aria-label="cart" onClick={handleClickNotific} >
                                <StyledBadge badgeContent={limitProduct.length} color="error">
                                    <NotificationsNoneIcon color="primary" />
                                </StyledBadge>
                            </IconButton>
                            <Menu
                                anchorE2={anchorE2}
                                id="account-menu"
                                open={limitProduct.length > 0 ? openNotfic : ""}
                                onClose={handleCloseNotific}
                                onClick={handleCloseNotific}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 7,

                                        ml: ctx.isRtl ? '-3vw' : '15vw',
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,

                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                            >
                                <div className={classes.notificationLimitProductHeader} 
                                style={{direction:ctx.isRtl ? "rtl":"ltr"}} 
                                >
                                    <div style={{ width: "70%" }}><FormattedMessage id="warning"/></div>
                                    <div
                                        style={{
                                            backgroundColor: "rgba(115, 103, 240, 0.12)",
                                            color: ' #7367f0',
                                            padding: "0.2rem 0.9rem",
                                            borderRadius: ' 10rem',
                                            width: "25%",
                                            fontSize: "12px",
                                        }}

                                    > {limitProduct.length} <FormattedMessage id="new"/></div>
                                </div>
                                {limitProduct.map(element => (
                                    <section className={classes.notificationLimitProduct}
                                    style={{direction:ctx.isRtl ? "rtl":"ltr"}} 
                                    >
                                        <MenuItem >
                                            <span>مقدار  {element.title}</span>
                                            <span style={{ display: element.counterUnit === "weight" ? "none" : "inline-block", padding:".5rem" }}>کمتر از 5 عدد میباشد</span>
                                            <span style={{ display: element.counterUnit === "number" ? "none" : "inline-block", padding:".5rem" }}>کمتر از 10 کیلو گرم می باشد</span>
                                        </MenuItem>
                                    </section>

                                ))}
                            </Menu>
                        </section>
                        {/* *******themIcon */}
                        <section >
                            <ThemIcon />
                        </section>
                        {/* *******Language */}
                        <section >
                            <IconButton
                                onClick={handleClick}
                                aria-controls="menu-appbar"
                                aria-haspopup={true}
                                color="inherit">
                                {/* <span className={classes.languageTitle} >{ctx.locale === "en" ? "ENGLISH" : "فارسی"}</span> */}
                                <ReactCountryFlag
                                    countryCode={ctx.locale === "en" ? "US" : "IR"}
                                    svg
                                />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        direction: ctx.isRtl ? "rtl" : "ltr",

                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={() => {
                                    handleClose();
                                    ctx.changeLanguage("en")
                                }}>
                                    <ReactCountryFlag
                                        countryCode={"US"}
                                        svg
                                    />
                                    <span style={{ margin: "0 5px" }}>
                                        <FormattedMessage id='English' defaultMessage={"language name"} />

                                    </span>
                                </MenuItem>

                                <MenuItem onClick={() => {
                                    handleClose();
                                    ctx.changeLanguage("fa")

                                }}>
                                    <ReactCountryFlag
                                        countryCode={"IR"}
                                        svg
                                    />
                                    <span style={{ margin: "0 5px" }}>
                                        <FormattedMessage id='Persian' defaultMessage={"language name"} />

                                    </span>
                                </MenuItem>
                            </Menu>
                        </section>
                    </div>

                </div>
            </Toolbar>
        </AppBar>
    )
}
export default Header