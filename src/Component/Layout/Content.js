import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useContext } from 'react';
import ThemeContext from '../../Store/ThemeContext'
import classes from './Content.module.css'

import { Outlet } from 'react-router-dom'

function Content() {
  const ctx = useContext(ThemeContext)
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1, p: 3,
        backgroundColor: ctx.skin === "Light" ? "rgb(245,245,245)" : "#161d30"
      }}
    >
      <Toolbar />
      <div className={`${classes.content} `}>
        <Outlet />
      </div>
    </Box>
  )
}
export default Content