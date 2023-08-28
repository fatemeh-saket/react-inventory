
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PerfectScrollbar from 'react-perfect-scrollbar'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ThemeContext from '../../Store/ThemeContext'
import IconButton from '@mui/material/IconButton';
import { useContext } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { ButtonBase } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import Counter from '../Ui/Input/Counter'
import Add from '@mui/icons-material/Add';

import classes from './style.module.css'
import defaultImage from '../../assets/image/images.jfif'
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Input from '../Ui/Input/Input'
import { itemactions } from '../../Store/Reducers/items-Slice'
import Snackbars from '../Ui/SnakBar'

import OrderItem from './Order'
const DetailItem = () => {
    const ctx = useContext(ThemeContext)
    const data = useSelector(state => state.products.selectedItem)
    const [dialog, setDialog] = useState(false)
    const [amount, setAmount] = useState(0)
    const [weight, setWeight] = useState(0)
    const [openSuccSnak, setOpenSuccSnak] = useState(false);
    const [openErrorSnak, setOpenErrorSnak] = useState(false);
    const dispatch = useDispatch()

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccSnak(false);
        setOpenErrorSnak(false)
    };

    const handleAmountClick = (value) => {
        if (value === "add") {
            setAmount(amount + 1)
        }
        if (value === "minus" && amount > 0) {
            setAmount(amount - 1)
        }
    }


    const handleClickOpenDialog = () => {
        setDialog(true);
    };

    const handleCloseDialog = () => {
        setDialog(false);
    };

    let navigate = useNavigate()
    return (
        <Paper sx={{
            backgroundColor: ctx.skin === 'Light' ? '#fff' : '#283046', direction: ctx.isRtl ? "rtl" : "ltr",
            borderRadius: '20px',
            boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        }}
            style={{ height: "73.5vh" }}

        >
            <section className={classes[`Item-header`]} >
                <div >
                    <h1>
                        <FormattedMessage id="show" />
                    </h1>
                </div>
                <div>
                    <IconButton color="primary" onClick={() => {
                        navigate("/stock")
                    }}>
                        {ctx.isRtl ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
                    </IconButton>
                </div>
            </section>
            <Paper
                className={classes.paper}
                sx={{
                    backgroundColor: ctx.skin === 'Light' ? '#fff' : '#283046',
                    color: ctx.skin === 'Light' ? "#333" : "#fff"
                }}

            >
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" accept=".jpg,.jpeg,.jfif,.png"
                                src={data.image ? data.image : defaultImage}
                            />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={7} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>

                                <Typography gutterBottom variant="subtitle1">
                                    <span>   <FormattedMessage id="title" />: </span>
                                    <span>{data?.title}</span>
                                </Typography>
                                <Typography variant="body2" gutterBottom
                                    sx={{ display: data?.counterUnit === "weight" ? "none" : "" }}
                                >
                                    <span>   <FormattedMessage id="amount" />: </span>
                                    <span>{data?.totalNumber}</span>
                                </Typography>
                                <Typography variant="body2" gutterBottom
                                    sx={{ display: data?.counterUnit === "weight" ? "" : "none" }}
                                >
                                    <span>   <FormattedMessage id="weight" />: </span>
                                    <span>{data?.weight}</span>
                                </Typography>
                                <Typography gutterBottom variant="subtitle1">
                                    <span>   <FormattedMessage id="price" />: </span>
                                    <span>{data?.price}</span>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <span>   <FormattedMessage id="importance" />: </span>
                                    <span>{data?.type === "notImport" ? "معمولی" : "کمیاب"}</span>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <span>   <FormattedMessage id="description" />: </span>
                                    <span>{data?.description}</span>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary"
                                    style={{ padding: " 10px 100px " }}
                                    startIcon={<AddShoppingCartIcon />}
                                    className={classes.lightButtom}
                                    onClick={handleClickOpenDialog}
                                >
                                    <span style={{ margin: "3px" }}><FormattedMessage id="order" /></span>
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={5} style={{
                            borderRight: ctx.isRtl ? "1px solid #7367f0" : "",
                            borderLeft: ctx.isRtl ? "" : "1px solid #7367f0", padding: "10px", textAlign: 'center'
                        }}>
                            <Typography variant="subtitle1"> <FormattedMessage id="addItemForProudoct" />:</Typography>

                            <Counter handleAmountClick={handleAmountClick} amount={amount} disable={data?.counterUnit !== "number" ? true : false} />
                            <br />
                            <Input
                                value={weight}
                                className={data?.counterUnit === "weight" ? classes.input : classes.inputDisable}
                                disabled={data?.counterUnit !== "weight" ? true : false}
                                size="10"
                                placeholder="وزن"
                                onChange={e => setWeight(e.target.value)}
                            />
                            <br />
                            <Button variant="contained" color="primary"
                                startIcon={<Add />}
                                className={classes.lightButtom}
                                onClick={() => {
                                    let value = data?.counterUnit !== "weight" ? amount : weight
                                    if (value > 0) {
                                        dispatch(itemactions.editItem(["newValue", value]))
                                        setWeight(0)
                                        setAmount(0)
                                        setOpenSuccSnak(true)
                                    }
                                    else {
                                        setOpenErrorSnak(true)
                                    }
                                }}
                            >
                                <span style={{ margin: "3px" }}
                                ><FormattedMessage id="add" /></span>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Accordion defaultExpanded
                sx={{
                    backgroundColor: ctx.skin === 'Light' ? '#fff' : '#283046', color: ctx.skin === 'Light' ? "#333" : "#fff", borderRadius: "0 0 30px 30px",
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon color="primary" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography><FormattedMessage id="detail" /></Typography>
                </AccordionSummary>

                <PerfectScrollbar className='scroll-area' options={{ wheelPropagation: true }} >
                    <AccordionDetails style={{ height: "14vh" }}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <ul>
                                        {data.detail?.length >= 0 ? data.detail?.map((element, index) =>
                                            <Typography variant="body2" gutterBottom key={index}>
                                                <li
                                                    style={{
                                                        display: element.number !== "" || element.price !== "" ||
                                                            element.title !== "" || element.type !== ""
                                                            ? "" : "none"
                                                    }}
                                                >
                                                    <span > در تاریخ {element.time}</span>
                                                    <span style={{ display: element.number > 0 && element.number !== undefined ? "" : "none" }}>
                                                        مقدار {element.number} {data.counterUnit !== "weight" ? "عدد" : "کیلوگرم"}  به محصول اضافه شد.
                                                    </span>
                                                    <span style={{ display: element.price !== "" && element.price !== undefined ? "" : "none" }}>
                                                        مبلغ کالا به {element.price} تومن تغییر پیدا کرد.
                                                    </span>
                                                    <span style={{ display: element.title !== "" && element.title !== undefined ? "" : "none" }}>
                                                        نام کالا به {element.title} تغییر پیدا کرد.
                                                    </span>
                                                    <span style={{ display: element.type !== "" && element.type !== undefined ? "" : "none" }}>
                                                        نوع کالا به {element.type === "import" ? "کمیاب" : "معمولی"} تغییر پیدا کرد.
                                                    </span>
                                                </li>
                                            </Typography>

                                        ) : ""}
                                    </ul>

                                </Grid>
                            </Grid>

                        </Grid>
                    </AccordionDetails>
                </PerfectScrollbar>

            </Accordion>
            <Snackbars open={openSuccSnak} handleClose={handleSnackbarClose} alert="success" message={<FormattedMessage id="successAlert" />} />
            <Snackbars open={openErrorSnak} handleClose={handleSnackbarClose} alert="error" message={<FormattedMessage id="ErrorAlertDetail" />} />
            <OrderItem open={dialog}
                handleClose={handleCloseDialog} 
                handleClickOrder={()=>setOpenSuccSnak(true)}
                />
        </Paper>
    )
}
export default DetailItem