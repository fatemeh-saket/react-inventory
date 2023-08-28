import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ThemeContext from '../../Store/ThemeContext'
import { useSelector } from 'react-redux';
import classes from './style.module.css'
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const storesInfo = useSelector(state => state.products.storesInfo)
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Stores() {
  const [value, setValue] = React.useState(0);
  const ctx = React.useContext(ThemeContext)
  const storesInfo = useSelector(state => state.products.storesInfo)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{
      backgroundColor: ctx.skin === 'Light' ? '#fff' : '#283046',
      borderRadius: '20px',
      boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
      padding: '2rem'
    }}
      style={{ height: "73.5vh" }}

    >
      <section>
        <div style={{ direction: ctx.isRtl ? "rtl" : "ltr" }} >
          <h1>لیست فروشگاه های مورد قرار داد :</h1>
        </div>

      </section>
      <hr />
      <section>
        <Box
          sx={{
            flexGrow: 1, display: 'flex', height: 224,
            backgroundColor: ctx.skin === 'Light' ? '#fff' : '#283046',
            color: ctx.skin === 'Light' ? "#333" : "#fff"
          }}

        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}

          >
            {storesInfo.map((element, index) => (
              <Tab key={index} label={element.name} {...a11yProps(index)} />
            ))}
          </Tabs>
          {storesInfo.map((element, index) => (
            <TabPanel value={value} index={index} key={index}>

              <div  >
                <p className={classes.description}><span>نام </span>:{element.name}</p>
                <p className={classes.description}><span>تاریخ بستن قرارداد </span>:{element.time}</p>
                <p className={classes.description}><span>ادرس </span>:{element.address}</p>
                <p className={classes.description}>
                  <span style={{ color: element.concession === "golden" ? "gold" : "silver" }} >امتیاز : {element.concession === "golden" ? "طلایی" : "نقره ایی"}</span>
                </p>
              </div>
            </TabPanel>
          ))}
        </Box>
      </section>
    </Paper>
  );
}