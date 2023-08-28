import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import ThemeContext from '../../Store/ThemeContext'
import Input from '../Ui/Input/Input'
import Counter from '../Ui/Input/Counter'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './style.module.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import Snackbars from '../Ui/SnakBar'
import { soldProductActions } from '../../Store/Reducers/soldProducts-Slice'
import { itemactions } from '../../Store/Reducers/items-Slice'
import { Navigate } from 'react-router-dom';



export default function OrderItem(props) {


    const ctx = React.useContext(ThemeContext)
    const dispatch = useDispatch()
    const [totalAmount, setTotalAmount] = useState(0)
    const data = useSelector(state => state.products.selectedItem)
    const [store, setStore] = useState("")
    const [errorProps, setErrorProps] = useState(false)
    const storesInfo = useSelector(state => state.products.storesInfo)
    const [openDeficits, setOpenDeficits] = useState(false)

    console.log(openDeficits)
    //    ****open amount error
    const [inputErrorNot, setInputErrorNot] = useState(false)

    const handleClickErrorInput = () => {
        setInputErrorNot(true);
    };
    const handleCloseErrorInput = () => {
        setInputErrorNot(false);
    };
    //    ****end open amount error


    //    ****end not sell rare product error

    const [inputErrorSell, setInputErrorSell] = useState(false)

    const handleClickErrorsellProduct = () => {
        setInputErrorSell(true);
    };
    const handleCloseErrorsellProduct = () => {
        setInputErrorSell(false);
    };
    //    ****end not sell rare product error

    const handleAmountClick = (value) => {
        if (value === "add") {
            if (data.totalNumber > totalAmount) {
                setTotalAmount(totalAmount + 1)
            }
            else {
                handleClickErrorInput()
            }

        }
        if (value === "minus" && totalAmount > 0) {
            setTotalAmount(totalAmount - 1)
        }
    }

    const style = {
        position: 'absolute',
        top: '30%',
        left: '35%',
        width: 400,
        backgroundColor: ctx.skin === 'Light' ? "white" : "#283046",
        boxShadow: '0 5px 20px 0 rgb(34 41 47 / 10%) !important',
        border: ctx.skin === 'Light' ? "1px solid #eee" : "1px solid #7367f0",
        borderRadius: "5px"
    };
    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <div className={ctx.skin === 'Light' ? classes.lightModalHeader : classes.darkModalHeader}
                        style={{ direction: ctx.isRtl ? "rtl" : "ltr" }}
                    >سفارش</div>
                    <section style={{ textAlign: 'center' }}   >
                        <div >
                            <span style={{ marginBottom: "7px" }}> مبلغ کل: </span>
                            <section style={{ color: "#7367f0" }}>{totalAmount * data.price} تومان</section>
                        </div>
                        <div style={{
                            display: data.counterUnit === "number" ? "" : "none"
                        }}>
                            <Counter amount={totalAmount} handleAmountClick={handleAmountClick} />
                        </div>

                        <div style={{
                            display: data.counterUnit === "number" ? "none" : ""
                        }}>
                            <p style={{ marginBottom: "7px" }}>وزن سفارش (حداکثر وزن {data.weight}kg ) </p>
                            <Input
                                type="text"
                                value={data.counterUnit === "weight" ? totalAmount : ""}

                                className={classes.input}
                                placeholder="وزن"
                                onChange={e => {
                                    if (Number(e.target.value) <= Number(data.weight)) setTotalAmount(e.target.value)
                                    else {
                                        handleClickErrorInput()
                                    }
                                }}

                            />
                        </div>


                        <div>
                            <p >  ارسال به فروشگاه </p>
                            <FormControl style={{ marginBottom: "1rem" }}>
                                <InputLabel id="demo-mutiple-name-label">فروشگاه</InputLabel>
                                <Select
                                    style={{ width: "11vw" }}
                                    labelId="demo-mutiple-name-label"
                                    id="demo-mutiple-name"
                                    label="قروشگاه"
                                    value={store}
                                    onChange={(e) => {
                                        setStore(e.target.value)
                                    }}
                                >
                                    {
                                        storesInfo.map((element) => (
                                            <MenuItem value={element.name}>{element.name}</MenuItem>
                                        ))
                                    }

                                </Select>
                                <div style={{ color: "red", display: errorProps ? "" : "none" }}>   لطفا نام فروشگاه را انتخاب کنبد</div>
                            </FormControl>
                        </div>

                    </section>
                    <section className={classes.modalFooter}>

                        <Button variant="contained" color="primary" component="span"
                            onClick={() => {
                                const index = storesInfo.findIndex(element => element.name === store)
                                if (store === "") {
                                    setErrorProps(true)
                                }
                                else {

                                    if (storesInfo[index].concession === "golden") {
                                        dispatch(soldProductActions.addItem({
                                            store: store,
                                            totalAmount: totalAmount,
                                            data: data
                                        }))
                                        dispatch(itemactions.editItem(["soldItem", totalAmount]))

                                        props.handleClose()
                                        setStore("")
                                        setTotalAmount(0)
                                        props.handleClickOrder()
                                    }
                                    if (storesInfo[index].concession !== "golden") {

                                        if (data.type === "import") {
                                            handleClickErrorsellProduct()
                                        }
                                        if (data.type === "notImport") {
                                            dispatch(soldProductActions.addItem({
                                                store: store,
                                                totalAmount: totalAmount,
                                                data: data
                                            }))
                                            dispatch(itemactions.editItem(["soldItem", totalAmount]))
                                            props.handleClose()
                                            setStore("")
                                            setTotalAmount(0)
                                            props.handleClickOrder()

                                        }

                                    }

                                }
                            }}
                        >
                            ثبت
                        </Button>
                            <Button variant="contained" color="primary" component="span"
                                onClick={() => {
                                    props.handleClose()
                                    setOpenDeficits(true)

                                }}
                            >
                                درخواست شارژ کالا
                            </Button>
                        <Button variant="contained" color="error" component="span"
                            onClick={() => {

                                props.handleClose()

                            }}
                        >
                            بستن
                        </Button>
                    </section>

                </Box>
            </Modal>
            {openDeficits && <Navigate to='/deficits' state={{ title: data.title, store: store }} />}
            <Snackbars open={inputErrorNot} handleClose={handleCloseErrorInput} alert="error" message="به علت بالاتر بودن مقدار از وزن کلی  ثبت این مقدار امکان پذیر نمیباشد" />
            <Snackbars open={inputErrorSell} handleClose={handleCloseErrorsellProduct} alert="error" message="ارسال این کالا به فروشگاه انتخابی امکان پذیر نمیباشد" />

        </div>
    );
}