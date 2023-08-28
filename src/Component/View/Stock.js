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
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CreateItem from './CreateItem'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { itemactions } from '../../Store/Reducers/items-Slice'
import SettingsIcon from '@mui/icons-material/Settings';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Snackbars from '../Ui/SnakBar'
import { useContext, useState, useEffect } from 'react';
import StockFilter from './Filter/StockFilter'

/* ************* table tittle  ******************/

const headCells = [
  { id: 'number', numeric: false, disablePadding: true, label: 'tableRow' },
  { id: 'title', numeric: true, disablePadding: false, label: 'title' },
  { id: 'totalNumber', numeric: true, disablePadding: false, label: 'amount' },
  { id: 'Price', numeric: true, disablePadding: false, label: 'price' },
  { id: 'weight', numeric: true, disablePadding: false, label: 'weight' },
  { id: 'type', numeric: true, disablePadding: false, label: 'importance' },
  { id: 'edit', numeric: true, disablePadding: false, label: 'actions' },

];

/* ************* end table tittle  ******************/


export default function Stock() {
  const data = useSelector(state => state.products.items)
  const dataFilter = useSelector(state => state.products.filter)
  const dataSearch = useSelector(state => state.products.search)
  const [searched, setSearched] = useState("");
  const page = useSelector(state => state.products.page)
  const dispatch = useDispatch()
  const ctx = useContext(ThemeContext)
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openPage, setOpenPage] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  let navigate = useNavigate()
  // ******open filter
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filter, setFilter] = useState({
    type: false,
    price: false,
    amount: false
  })
  const [price, setPrice] = useState({
    min: "",
    max: ""
  })
  const [amount, setAmount] = useState({
    min: "",
    max: "",
  });
  const handleFilterChange = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.checked })
  }
  const handleClickDialogOpen = () => {
    setOpenFilterModal(true);
  };
  const handleDialogClose = () => {
    setOpenFilterModal(false);
  };
  // ******end open filter

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
    dispatch(itemactions.handleChangePage(newPage))
  };

  const isFilter = filter.type || filter.amount || filter.price

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
          {headCells.map((headCell, index) => (
            <TableCell
              sx={{
                color: ctx.skin === "Light" ? "#333" : "#fff",
                textAlign: ctx.isRtl ? "right" : "left"
              }}
              key={index}
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
      {!openPage &&
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
              <Button variant="contained" sx={{
                direction: "ltr", mr: "1rem", backgroundColor: "#7367f0",
                boxShadow: '0 0 10px 1px rgb(115 103 240 / 70%) '
              }} endIcon={<AddIcon />}
                onClick={() => {
                  setOpenPage(true)
                  setIsEdit(false)
                }}
                size="large"

              >
                <FormattedMessage id="add" defaultMessage='add' />
              </Button>
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
                      dispatch(itemactions.searchItem(e.target.value))
                      if (e.target.value === "") {
                        dispatch(itemactions.filterItem([filter, price, amount]))

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
                      <TableCell align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }} >{row.counterUnit === "number" ? row.totalNumber : "_"}</TableCell>
                      <TableCell align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }} >{row.price}</TableCell>

                      <TableCell align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }} >{row.counterUnit === "weight" ? row.weight : "_"} </TableCell>
                      <TableCell align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }} >
                        <span className={`${row.type !== "import" ? classes.unImportantType : classes.importantType}`}>{row.type === "import" ? "کمیاب" : "معمولی"}</span>
                      </TableCell>

                      <TableCell align={ctx.isRtl ? "right" : "left"}   >
                        <Tooltip title="حذف" placement="right" arrow>
                          <DeleteIcon color='primary' onClick={() => {
                            dispatch(itemactions.deleteItem(((page - 1) * rowsPerPage) + (index)))

                          }} />
                        </Tooltip  >

                        <Tooltip title="ویرایش" placement="top" arrow >
                          <EditIcon color='primary' onClick={() => {
                            dispatch(itemactions.handleChangeSelectedItem(row))
                            setOpenPage(true)
                            setIsEdit(true)

                            }} />
                        </Tooltip  >

                        <Tooltip title="مشاهده" placement="left" arrow>
                          <SettingsIcon color='primary' onClick={() => {
                            navigate('show')
                            dispatch(itemactions.handleChangeSelectedItem(row))
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
        </Paper>}
      {openPage && <CreateItem handleCloseBtn={setOpenPage} handleSnackbarClick={handleSnackbarClick}  isEdit={isEdit} />}
      <Snackbars open={snakbarOpen} handleClose={handleSnackbarClose} alert="success" message={<FormattedMessage id="successAlert" />} />
      <StockFilter
        open={openFilterModal}
        handleClose={handleDialogClose}
        handleChange={handleFilterChange}
        filter={filter}
        price={price}
        amount={amount}
        setAmount={setAmount}
        setPrice={setPrice}
      />
    </>


  );
}
