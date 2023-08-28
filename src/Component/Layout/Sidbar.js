import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import RvHookup from '@mui/icons-material/RvHookup'
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';// import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import ThemeContext from '../../Store/ThemeContext'
import { useContext, useEffect, useState } from 'react';
import logo from '../../assets/image/logo1.png'
import Assignment from '@mui/icons-material/Assignment'
import StoreIcon from '@mui/icons-material/Store';
import classes from './Sidbar.module.css'
import { FormattedMessage } from 'react-intl';
import { useNavigate, useLocation } from 'react-router-dom';


const drawerWidth = 240;

function Sidebar() {
  const ctx = useContext(ThemeContext)
  const redirect = useNavigate()
  let navigation = useLocation()

  const [selectedItem, setSelectedItem] = useState(0)
  useEffect(() => {
    //****  don't miss slider item when refresh ***/
    if (navigation.pathname === '/dashbord') {
      setSelectedItem(0)
    }
    if (navigation.pathname === '/stock') {
      setSelectedItem(1)
    }
    if (navigation.pathname === '/requests') {
      setSelectedItem(2)
    }
    if (navigation.pathname === '/reject') {
      setSelectedItem(3)
    }
    if (navigation.pathname === '/storeList') {
      setSelectedItem(5)
    }
    if (navigation.pathname === '/deficits') {
      setSelectedItem(4)
    }
    if (navigation.pathname === '/stock/show') {
      setSelectedItem(1)
    }
  })


  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: ctx.skin === "Light" ? "#fff" : "#283046",
          direction: ctx.locale === "en" ? "ltr" : "rtl"
        },
      }}
      variant="permanent"
      className={classes.drawer}
      anchor={ctx.isRtl ? "right" : "left"}
    >
      {/* <Toolbar /> */}
      <div className={classes.sidbarLogo}>
        <img src={logo} alt="logo " className={classes.sidbarLogoImg} />
      </div>

      <Divider />
      <List>
        {['dashbord', 'stock', 'requests', 'reject'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton

              onClick={() => {
                setSelectedItem(index)
                redirect(`/${text}`)
              }}
              className={index === selectedItem ?  ctx.isRtl?  classes.selectedItemRtl:classes.selectedItemLtr : ""}
              sx={{

                borderRadius: ctx.isRtl ? '0 8px 8px 0 ' : '8px 0 0 8px ',
                marginRight: ctx.isRtl ? ' 10px' : " ",
                marginLeft: ctx.isRtl ? " " : ' 10px',

              }}
            >
              <ListItemIcon>
                {index % 4 === 0 && <HomeIcon sx={{ color: ctx.skin === "Light" ? "" : "#ddd" }} />}
                {index % 4 === 1 && <PlaylistAddCheckIcon sx={{ color: ctx.skin === "Light" ? "" : "#ddd" }} />}
                {index % 4 === 2 && <RvHookup sx={{ color: ctx.skin === "Light" ? "" : "#ddd" }} />}
                {index % 4 === 3 && <ThreeSixtyIcon sx={{ color: ctx.skin === "Light" ? "" : "#ddd" }} />}
              </ListItemIcon>
              <ListItemText
                className={` ${ctx.isRtl ? classes.rightSideText : classes.leftSideText}
                            ${ctx.skin === "Light" ? classes.lightTheme : classes.darkTheme}
                            `}>
                <FormattedMessage id={text} defaultMessage={'menu value'} />
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['deficits', 'storeList'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                setSelectedItem(index + 4)
                redirect(`/${text}`)
              }}
              className={index+ 4 === selectedItem ?  ctx.isRtl?  classes.selectedItemRtl:classes.selectedItemLtr : ""}

              // className={index === selectedItem-4 ? classes.selectedItem : ""}
              sx={{

                borderRadius: ctx.isRtl ? '0 8px 8px 0 ' : '8px 0 0 8px ',
                marginRight: ctx.isRtl ? ' 10px' : " ",
                marginLeft: ctx.isRtl ? " " : ' 10px',

              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <Assignment sx={{ color: ctx.skin === "Light" ? "" : "#ddd" }} /> : <StoreIcon sx={{ color: ctx.skin === "Light" ? "" : "#ddd" }} />}
              </ListItemIcon>
              <ListItemText className={` ${ctx.isRtl ? classes.rightSideText : classes.leftSideText}
                            ${ctx.skin === "Light" ? classes.lightTheme : classes.darkTheme}
                            `} >
                <FormattedMessage id={text} defaultMessage={'menu value'} />
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
export default Sidebar