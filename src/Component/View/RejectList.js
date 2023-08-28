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
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import ThemeContext from '../../Store/ThemeContext'
import classes from './style.module.css'
import { useDispatch } from 'react-redux';
import { soldProductActions } from '../../Store/Reducers/soldProducts-Slice'
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useContext, useState } from 'react';



/* ************* table tittle  ******************/

const headCells = [
  { id: 'number', numeric: false, disablePadding: true, label: 'tableRow' },
  { id: 'title', numeric: true, disablePadding: false, label: 'title' },
  { id: 'store', numeric: true, disablePadding: false, label: 'store' },
  { id: 'totalAmount', numeric: true, disablePadding: false, label: 'request-amount' },
  { id: 'reguestTime', numeric: true, disablePadding: false, label: 'requestTime' },
  { id: 'returnTime', numeric: true, disablePadding: false, label: 'returnTime' },
  { id: 'reason', numeric: true, disablePadding: false, label: 'reason' },
  { id: 'status', numeric: true, disablePadding: false, label: 'OrderStatus' },

];

/* ************* end table tittle  ******************/


export default function RejectList() {
  const soldProducts = useSelector(state => state.soldProducts.items)
  const data = useSelector(state => state.soldProducts.returnIrem)
  const dataSearch = useSelector(state => state.soldProducts.search)
  const [searched, setSearched] = useState("");
  const page = useSelector(state => state.soldProducts.rejectPage)
  const dispatch = useDispatch()
  const ctx = useContext(ThemeContext)
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const reasonsReturn = useSelector(state => state.soldProducts.reasonsReturn)

  const ChangePage = (event, newPage) => {
    dispatch(soldProductActions.handleChangeRejectPage(newPage))
  };

  const findTitleOfSelect = (value) => {
    const selectObject = reasonsReturn.find(element => element.value === value)
    return selectObject.titile
  }

  const rows = searched === "" ? data : dataSearch

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
                    dispatch(soldProductActions.searchRejectItem(e.target.value))
                  }}
                />

              </div>
            </div>
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

                    <TableCell align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }} >{row.ordertime} </TableCell>
                    <TableCell align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }} >{row.returnTime} </TableCell>

                    <TableCell align={ctx.isRtl ? "right" : "left"} sx={{ color: ctx.skin === "Light" ? "#333" : "#fff" }}  >{findTitleOfSelect(row.reason)} </TableCell>

                    <TableCell align={ctx.isRtl ? "right" : "left"}   >
                      <span
                        className={row.productReturn ? classes.unImportantType : classes.importantType}>
                        {row.productReturn ? "بازگشت به انبار" : " حذف کالا"}
                      </span>
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
    </>


  );
}
