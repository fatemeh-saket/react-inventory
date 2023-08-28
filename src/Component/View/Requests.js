import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import Pagination from '@mui/material/Pagination';
import ThemeContext from '../../Store/ThemeContext'
import classes from './style.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import Snackbars from '../Ui/SnakBar'
import { useContext, useState, useEffect } from 'react';
import RequestFilter from './Filter/RequestFilter'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import {itemactions} from '../../Store/Reducers/items-Slice'
import { soldProductActions } from '../../Store/Reducers/soldProducts-Slice'

/* ************* table tittle  ******************/

const headCells = [
  { id: 'number', numeric: false, disablePadding: true, label: 'tableRow' },
  { id: 'title', numeric: true, disablePadding: false, label: 'title' },
  { id: 'store', numeric: true, disablePadding: false, label: 'store' },
  { id: 'totalAmount', numeric: true, disablePadding: false, label: 'request-amount' },
  { id: 'price', numeric: true, disablePadding: false, label: 'totalPrice' },
  { id: 'time', numeric: true, disablePadding: false, label: 'requestTime' },
  { id: 'statuse', numeric: true, disablePadding: false, label: 'statuse' },
  { id: 'edit', numeric: true, disablePadding: false, label: 'actions' },

];

/* ************* end table tittle  ******************/


export default function Requests() {
  const data = useSelector(state => state.soldProducts.items)
  const dataFilter = useSelector(state => state.soldProducts.filter)
  const dataSearch = useSelector(state => state.soldProducts.search)
  const [searched, setSearched] = useState("");
  const page = useSelector(state => state.soldProducts.requestPage)
  const dispatch = useDispatch()
  const ctx = useContext(ThemeContext)
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const selectedIndex = useSelector(state => state.soldProducts.selectedIndex)
  const reasonsReturn = useSelector(state => state.soldProducts.reasonsReturn)
  const [inputValue, setInputValue] = useState("")
  const [errorProps, setErrorProps] = useState(false)
  console.log(data,selectedIndex)


  // ******open filter
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [state, setState] = React.useState({
    storeA: false,
    storeB: false,
    storeC: false,
    storeD: false,
    compeleteOrder: false,
    rejectOrder: false,
    time: false
  });
  const [timeData, setTimeData] = useState({
    start: "",
    end: ""
  })

  const handleClickDialogOpen = () => {
    setOpenFilterModal(true);
  };
  const handledialogclose = () => {
    setOpenFilterModal(false);
  };
  // ******end open filter

  // ******open reject filter
  const [openRejectModal, setOpenRejectModal] = useState(false)

  const handleRejectModalClose = () => {
    setOpenRejectModal(false)
  }

  const handleRejectModalopen = () => {
    setOpenRejectModal(true)
  }

  // ******end open reject filter


  // ******open alert
  const [snakbarOpen, setSnakbarOpen] = useState(false);

  const handleSnackbarClick = () => {
    setSnakbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnakbarOpen(false);
  };
  // ******end open alert

  const ChangePage = (event, newPage) => {
    dispatch(soldProductActions.handleChangeRequestPage(newPage))
  };

  const isFilter = state.storeA || state.storeB || state.storeC || state.storeD
    || state.compeleteOrder || state.rejectOrder || state.time


  const rows = searched === "" ?
    (isFilter ? dataFilter : data) : (isFilter ? dataFilter : dataSearch)


  const emptyRows =
    page >= 0 ? Math.max(0, (1 + (page - 1)) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      rows.slice(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage,
      ),

    [page, rowsPerPage, rows],
  );


  /* ************* table header  ******************/

  function EnhancedTableHead(props) {
    return (
      <TableHead   >
        <TableRow sx={{ backgroundColor: ctx.skin === "Light" ? "#ededef" : "#343d55" }}>
          <TableCell padding="checkbox">
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              sx={{
                color: ctx.skin === "Light" ? "#333" : "#fff",
                textAlign: ctx.isRtl ? "right" : "left"
              }}
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
            >
              <FormattedMessage id={headCell.label} />
            </TableCell>
          ))}
        </TableRow>

      </TableHead>
    );
  }
  /* *************end table header  ******************/
  return (
    <>

      <Paper sx={{
        width: '100%', mb: 2,
        borderRadius: '20px',
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        backgroundColor: ctx.skin === "Light" ? "#fff" : "#283046"
      }}
      >
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            direction: ctx.isRtl ? "rtl" : "ltr",
          }} >

          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
          </Typography>

          <Tooltip title="search">
            <div className={`${classes.btn} ${ctx.isRtl ? classes.rightSideBtn : classes.leftSideBtn}  `}>
              <div className={classes.searchBox}>
                <button className={`${classes.btnSearch} ${ctx.isRtl ? classes.rightSideSearch : classes.leftSideSearch}`} >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16" color='#1565c0'>
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
                <input type="text" className={`${classes.inputSearch} ${ctx.skin === "Light" ? classes.lightInputSearch : classes.darkInputSearch}`}
                  placeholder="Type to Search..."
                  value={searched}
                  onChange={e => {
                    setSearched(e.target.value)
                    dispatch(soldProductActions.searchItem(e.target.value))
                    if (e.target.value === "") {
                      dispatch(soldProductActions.filterItem([state, timeData]))
                    }
                  }}
                />

              </div>
            </div>
          </Tooltip>

          <Tooltip title="Filter list">
            <IconButton onClick={handleClickDialogOpen}>
              <FilterListIcon color='primary' />
            </IconButton>
          </Tooltip>

        </Toolbar>
        <TableContainer style={{
          direction: ctx.isRtl ? "rtl" : "ltr"
        }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead />
            <TableBody >
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    key={index}
                  >
                    <TableCell padding="checkbox">
                    </TableCell>
                    <TableCell component="th" scope="row" align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }} > {((page - 1) * rowsPerPage) + (index + 1)}</TableCell>
                    <TableCell align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }} >{row.title}</TableCell>
                    <TableCell align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }} >{row.store}</TableCell>
                    <TableCell align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }} >{row.totalAmount}</TableCell>

                    <TableCell align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }} >{row.price} </TableCell>
                    <TableCell align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }} >{row.time} </TableCell>

                    <TableCell align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }}  >
                      <span className={row.statuse === "reject" ? classes.importantType : classes.unImportantType }>
                        {row.statuse === "reject" ? "مرجوع" : "تکمیل"}</span>
                    </TableCell>

                    <TableCell align={ctx.isRtl ? "right" : "left"}   >
                      <Tooltip title="بازگشت" placement="right" arrow>
                        <ReplayIcon
                          color={row.statuse === "complete" ? 'primary' : "disabled"}
                          onClick={() => {
                            if (row.statuse === "complete") {
                              handleRejectModalopen()
                              dispatch(soldProductActions.changeselectedIndex(((page - 1) * rowsPerPage) + (index)))
                            }

                          }}
                        />
                      </Tooltip>
                      <Tooltip title="حذف" placement="right" arrow>
                        <DeleteIcon
                          color={row.statuse === "complete" ? 'primary' : "disabled"}

                          onClick={() => {
                            if (row.statuse === "complete") {
                              dispatch(soldProductActions.deleteItem(((page - 1) * rowsPerPage) + (index)))
                              handleSnackbarClick()
                            }
                          }} />
                      </Tooltip  >
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination count={Math.ceil(rows.length / rowsPerPage)} color="primary" sx={{
          padding: "10px",
          borderTop: "1px solid gray !important", backgroundColor: ctx.skin === "Light" ? "#ededef" : "#343d55"
        }}
          page={page}
          onChange={ChangePage}
        />
      </Paper>

      <Snackbars open={snakbarOpen} handleClose={handleSnackbarClose} alert="success" message={<FormattedMessage id="successAlert" />} />
      <RequestFilter
        open={openFilterModal}
        handleclose={handledialogclose}
        state={state}
        setState={setState}
        timeData={timeData}
        setTimeData={setTimeData}
      />
      <Dialog
        fullWidth={true}
        maxWidth='sm'
        open={openRejectModal}
        onClose={handleRejectModalClose}
      >
        <DialogTitle sx={{ backgroundColor: ctx.skin === "Light" ? '#cccef7' : "#7367f0", height: "6vh", pb: '2rem', textAlign: ctx.isRtl ? "right" : "left" }}  >
          <FormattedMessage id="rejectProduct" />:
        </DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >

            <div style={{ textAlign: "center" }} className={ctx.skin === "Light" ? classes.lightmodalBody : classes.darkmodalBody}>
              <div className={classes.alertInfo}>
                <section style={{ padding: '0.71rem 1rem', }}>
                  شما در حال بازگشت
                  کالا {data[selectedIndex].title}
                  به مقدار {data[selectedIndex].totalAmount}   {data[selectedIndex].counterUnit === "number" ? "عدد" : "kg"}
                  ارسال  شده به {data[selectedIndex].store}
                  در تاریخ   {data[selectedIndex].time}   هستید
                </section>
              </div>
              <p> لطفا دلیل برگشت کالا را ذکر کنید</p>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-name-label">نام</InputLabel>
                <Select style={{ width: "15vw" }}
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  label="نام"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value)
                    setErrorProps(false)
                  }}
                >
                  {
                    reasonsReturn.map((element,index) => (
                      <MenuItem key={index} value={element.value}>{element.titile}</MenuItem>
                    ))
                  }
                </Select>
                <div style={{ color: "red", display: errorProps ? "" : "none" }}>   لطفا نام فروشگاه را انتخاب کنبد</div>
              </FormControl>
            </div>
          </Box>
        </DialogContent>
        <Divider />

        <DialogActions sx={{direction:"flex", justifyContent:"space-around"}}>
          <div >
            <Button variant="contained" color="primary" component="span"
              style={{ margin: "0 2rem" }}

              onClick={() => {

                if (inputValue === "") {
                  setErrorProps(true)
                }
                else {
                  if(inputValue==="A2" || inputValue==="A3" ){
                    dispatch(itemactions.addRejectItem([data[selectedIndex].title,data[selectedIndex].totalAmount ]))
                  }
                  dispatch(soldProductActions.addRejectItem(inputValue))
                  handleSnackbarClick()
                }

                // ** close and clear select
                setInputValue("")
                handleRejectModalClose()
              }}
            >
              <FormattedMessage id="save" />
            </Button>
            <Button variant="contained" color="primary" component="span"
              onClick={() => {
                //close and clear select
                handleRejectModalClose()
                setInputValue("")
              }}
            >
              <FormattedMessage id="close" />

            </Button>
          </div>

        </DialogActions>
      </Dialog>


    </>


  );
}
