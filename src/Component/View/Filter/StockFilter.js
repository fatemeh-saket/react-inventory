import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ThemeContext from '../../../Store/ThemeContext'
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '../../Ui/Input/Input'
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react';
import classes from '../style.module.css'
import { useDispatch } from 'react-redux';
import { itemactions } from '../../../Store/Reducers/items-Slice'

export default function StockFilter(props) {
    const didMountPrice = React.useRef(false);
    const didMountAmount = React.useRef(false);
    const didMountFilter = React.useRef(false);

    const ctx = React.useContext(ThemeContext)
    const dispatch = useDispatch()

    const [maxPriceBigger, setMaxPriceBigger] = useState(true)
    const [maxAmountBigger, setMaxAmountBigger] = useState(true)
    const { filter, price, amount, handleChange, setAmount, setPrice } = props

    useEffect(() => {
        //***************بررسی بیشتر نبودن ماکس از مین  */
        if (didMountPrice.current) {
            // console.log("hhhhh")
            if (price.min !== "" & price.max !== "" & Number(price.min) > Number(price.max)) {
                setMaxPriceBigger(false)
            }
            if (Number(price.min) < Number(price.max)) {
                dispatch(itemactions.filterItem([filter, price, amount]))
                setMaxPriceBigger(true)
            }
            if (price.min === "" || price.max === "") {
                dispatch(itemactions.filterItem([filter, price, amount]))

            }

        }
        else {
            didMountPrice.current = true;
        }
    }, [price])

    useEffect(() => {
        //***************بررسی بیشتر نبودن ماکس از مین  */
        if (didMountAmount.current) {
            if (amount.min !== "" & amount.max !== "" & Number(amount.min) > Number(amount.max)) {
                setMaxAmountBigger(false)
            }
            if (Number(amount.min) < Number(amount.max)) {
                dispatch(itemactions.filterItem([filter, price, amount]))
                setMaxAmountBigger(true)
            }
            if (amount.min === "" || amount.max === "") {
                dispatch(itemactions.filterItem([filter, price, amount]))
            }
        }
        else {
            didMountAmount.current = true
        }

    }, [amount])

    useEffect(() => {
        //*************** مشخص کردن سرچ و فیلتر*/
        if (didMountFilter.current) {
            // console.log("yhgfdyhsdgcb")
            if (!filter.amount) {
                setMaxAmountBigger(true)
                setAmount({ min: "", max: "" })
            }
            if (!filter.price) {
                setMaxPriceBigger(true)
                setPrice({ min: "", max: "" })

            }
            dispatch(itemactions.filterItem([filter, price, amount]))

        }
        else {
            didMountFilter.current = true
        }
    }, [filter])


    return (
        <React.Fragment>

            <Dialog
                fullWidth={true}
                maxWidth='sm'
                open={props.open}
                onClose={props.handleClose}
            >
                <DialogTitle sx={{ backgroundColor: ctx.skin === "Light" ? '#cccef7' : "#7367f0", height: "6vh", pb: '2rem', textAlign: ctx.isRtl ? "right" : "left" }}  >Optional sizes</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: '1rem',
                            direction: ctx.isRtl ? "rtl" : "ltr"
                        }}
                    >
                        <FormGroup>
                            <FormControlLabel sx={{ direction: ctx.isRtl ? "ltr" : "rtl" }}
                                control={<Switch
                                    name="type"
                                    color="primary"
                                    checked={filter.type}
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                />}
                                label="کمیاب" />
                        </FormGroup>
                        <Divider />
                        <FormGroup>
                            <FormControlLabel sx={{ direction: ctx.isRtl ? "ltr" : "rtl" }}
                                control={<Switch
                                    name="price"
                                    color="primary"
                                    checked={filter.price}
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                />}
                                label="قیمت" />

                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel sx={{ direction: ctx.isRtl ? "ltr" : "rtl", ml: "2rem", mr: "2rem" }}
                                control={< Input
                                    value={price.min}
                                    disabled={filter.price ? false : true}
                                    onChange={e => {
                                        setPrice({ ...price, min: e.target.value })
                                    }}
                                    className={filter.price ? classes.input : classes.inputDisable}

                                />}
                                label=" : کمترین" />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel sx={{ direction: ctx.isRtl ? "ltr" : "rtl", ml: "2rem", mr: "2rem" }}
                                control={< Input
                                    value={price.max}
                                    disabled={filter.price ? false : true}
                                    onChange={(e) => {
                                        setPrice({ ...price, max: e.target.value })
                                    }}
                                    className={filter.price ? maxPriceBigger ? classes.input : classes.inputError : classes.inputDisable}
                                />}
                                label=" : بیشترین" />
                            <p style={{ display: maxPriceBigger ? "none" : "inline-block", color: "red", margin: "0.5rem 2rem", fontSize: "10px" }}>مقدار وارد شده کمتر از ماکسیمم مقدار است</p>

                        </FormGroup>

                        <Divider />
                        <FormGroup>
                            <FormControlLabel sx={{ direction: ctx.isRtl ? "ltr" : "rtl" }}
                                control={<Switch
                                    name="amount"
                                    color="primary"
                                    checked={filter.amount}
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                />}
                                label="تعداد" />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel sx={{ direction: ctx.isRtl ? "ltr" : "rtl", ml: "2rem", mr: "2rem" }}
                                control={< Input
                                    value={amount.min}
                                    disabled={filter.amount ? false : true}
                                    onChange={e => {
                                        setAmount({ ...amount, min: e.target.value })
                                    }}
                                    className={filter.amount ? classes.input : classes.inputDisable}
                                />}
                                label=" : کمترین" />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel sx={{ direction: ctx.isRtl ? "ltr" : "rtl", ml: "2rem", mr: "2rem" }}
                                control={< Input
                                    value={amount.max}
                                    disabled={filter.amount ? false : true}
                                    onChange={e => {
                                        setAmount({ ...amount, max: e.target.value })
                                    }}
                                    className={filter.amount ? maxAmountBigger ? classes.input : classes.inputError : classes.inputDisable}
                                />}
                                label=" : بیشترین" />
                            <p style={{ display: maxAmountBigger ? "none" : "inline-block", color: "red", margin: "0.5rem 2rem", fontSize: "10px" }}>مقدار وارد شده کمتر از ماکسیمم مقدار است</p>
                        </FormGroup>
                    </Box>
                </DialogContent>

            </Dialog>
        </React.Fragment>
    );
}