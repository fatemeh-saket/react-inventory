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
import Pagination from '@mui/material/Pagination';
import ThemeContext from '../../Store/ThemeContext'
import classes from './style.module.css'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CreateNewDeficit from './CreateNewDeficit'
import { useDispatch } from 'react-redux';
import { itemactions } from '../../Store/Reducers/items-Slice'
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import Snackbars from '../Ui/SnakBar'
import { useContext, useState, useEffect } from 'react';
import { soldProductActions } from '../../Store/Reducers/soldProducts-Slice'
import {unavailableItemactions} from '../../Store/Reducers/deficits-slice'
import { useLocation } from 'react-router-dom';


/* ************* table tittle  ******************/

const headCells = [
  { id: 'number', numeric: false, disablePadding: true, label: 'tableRow' },
  { id: 'title', numeric: true, disablePadding: false, label: 'title' },
  { id: 'store', numeric: true, disablePadding: false, label: 'store' },
  { id: 'totalnumber', numeric: true, disablePadding: false, label: 'request-amount' },
  { id: 'time', numeric: true, disablePadding: false, label: 'requestTime' },
  { id: 'type', numeric: true, disablePadding: false, label: 'importance' },
  { id: 'edit', numeric: true, disablePadding: false, label: 'actions' },
];

/* ************* end table tittle  ******************/


export default function Deficits(props) {
  const rows = useSelector(state => state.unavailableProducts.items)
  const allItems = useSelector(state => state.products.items)
  const page = useSelector(state => state.unavailableProducts.page)
  const dispatch = useDispatch()
  const ctx = useContext(ThemeContext)
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const sendData = useLocation();
  const [openPage, setOpenPage] = useState(sendData.state === null ? false : true)

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
    dispatch(unavailableItemactions.handleChangePage(newPage))
  };

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
                }}
                size="large"

              >
                <FormattedMessage id="add" defaultMessage='add' />
              </Button>
            </Typography>


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
                  const indexItem = allItems.findIndex(element => element.title === row.title)


                  return (
                    <TableRow
                      key={index}
                    >
                      <TableCell padding="checkbox">
                      </TableCell>
                      <TableCell component="th" scope="row" align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }} > {((page - 1) * rowsPerPage) + (index + 1)}</TableCell>
                      <TableCell align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }} >{row.title}</TableCell>
                      <TableCell align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }} >{row.store}</TableCell>
                      <TableCell align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }} >{row.amount}
                        <span style={{ display: row.counterUnit !== "number" ? "inlineblock" : "none" }}>Kg</span>
                        <span style={{ display: row.counterUnit === "number" ? "inlineblock" : "none" }}>عدد</span>
                      </TableCell>

                      <TableCell align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }} >{row.time} </TableCell>
                      <TableCell align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }} >
                        <span className={`${row.status !== "ضروری" ? classes.unImportantType : classes.importantType}`}>{row.status}</span>
                      </TableCell>

                      <TableCell align={ctx.isRtl ? "right" : "left"}   >
                        {
                          allItems[indexItem].counterUnit === "number" ? allItems[indexItem].totalNumber : allItems[indexItem].weight >= Number(row.amount) &&
                            <Button variant="outlined" color="primary"
                              onClick={() => {
                                dispatch(soldProductActions.addItem({
                                  store: row.store,
                                  totalAmount: row.amount,
                                  data: allItems[indexItem]
                                }))
                                dispatch(itemactions.handleChangeSelectedItem(allItems[indexItem]))
                                dispatch(itemactions.editItem(["soldItem", row.amount]))
                                dispatch(unavailableItemactions.deleteItem(  ((page - 1) * rowsPerPage) + index   ))
                                handleSnackbarClick()
                              }}
                            >
                              پرداخت
                            </Button>
                        }
                        {
                          allItems[indexItem].counterUnit === "number" ? allItems[indexItem].totalNumber : allItems[indexItem].weight < Number(row.amount) &&
                            <Button variant="outlined" disabled >
                              موجودی ناکافی
                            </Button>
                        }
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
      {openPage && <CreateNewDeficit handleCloseBtn={setOpenPage} handleSnackbarClick={handleSnackbarClick} title={sendData.state?.title} store={sendData.state?.store} />}
      <Snackbars open={snakbarOpen} handleClose={handleSnackbarClose} alert="success" message={<FormattedMessage id="successAlert" />} />
    </>


  );
}
