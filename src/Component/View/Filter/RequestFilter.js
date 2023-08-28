import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ThemeContext from '../../../Store/ThemeContext'
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import {  useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { soldProductActions } from '../../../Store/Reducers/soldProducts-Slice'
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import InputIcon from "react-multi-date-picker/components/input_icon"
import transition from "react-element-popper/animations/transition"
import Checkbox from '@mui/material/Checkbox';

export default function RequestFilter(props) {
    const didMountAmount = React.useRef(false);
    const didMountState = React.useRef(false);

    const ctx = React.useContext(ThemeContext)
    const dispatch = useDispatch()


    const { state, setState, timeData, setTimeData } = props

    useEffect(() => {
        //*************** مشخص کردن سرچ و فیلتر*/
        if (didMountState.current) {
            if (!state.time) {
                setTimeData({ end: "", start: "" })
            }
            dispatch(soldProductActions.filterItem([state, timeData]))
        }
        else {
            didMountState.current = true
        }
    }, [state])


    useEffect(() => {
        //*************** مشخص کردن سرچ و فیلتر*/
        if (didMountAmount.current) {
            dispatch(soldProductActions.filterItem([state, timeData]))
        }
        else {
            didMountAmount.current = true
        }
    }, [timeData])




    return (
        <React.Fragment>

            <Dialog
                fullWidth={true}
                maxWidth='sm'
                open={props.open}
                onClose={props.handleclose}
            >
                <DialogTitle sx={{ backgroundColor: ctx.skin === "Light" ? '#cccef7' : "#7367f0", height: "6vh", pb: '2rem', textAlign: ctx.isRtl ? "right" : "left" }}  >Optional sizes</DialogTitle>
                <DialogContent 
                // sx={{backgroundColor: ctx.skin === "Light" ? '#fff' : "#283046"}} 
                >
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: '1rem',
                            direction: ctx.isRtl ? "rtl" : "ltr",
                            
                        }}
                    >

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.storeA}
                                    onChange={(event) => setState({ ...state, storeA: event.target.checked })}
                                    name="storeA"
                                    color="primary"
                                />
                            }
                            label="فروشگاه 1"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.storeB}
                                    onChange={(event) => setState({ ...state, storeB: event.target.checked })}
                                    name="storeB"
                                    color="primary"
                                />
                            }
                            label="فروشگاه 2"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.storeC}
                                    onChange={(event) => setState({ ...state, storeC: event.target.checked })}
                                    name="storeC"
                                    color="primary"
                                />
                            }
                            label="فروشگاه 3"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.storeD}
                                    onChange={(event) => setState({ ...state, storeD: event.target.checked })}
                                    name="storeD"
                                    color="primary"
                                />
                            }
                            label="فروشگاه 4"
                        />
                        <Divider />

                        <FormGroup>
                            <FormControlLabel sx={{ direction: ctx.isRtl ? "ltr" : "rtl" }}
                                control={<Switch
                                    name="rejectOrder"
                                    color="primary"
                                    checked={state.rejectOrder}
                                    onChange={(event) => setState({ ...state, rejectOrder: event.target.checked, compeleteOrder: false })}
                                />}
                                label="مرجوعی" />
                            <FormControlLabel sx={{ direction: ctx.isRtl ? "ltr" : "rtl" }}
                                control={<Switch
                                    name="compeleteOrder"
                                    color="primary"
                                    checked={state.compeleteOrder}
                                    onChange={(event) => setState({ ...state, compeleteOrder: event.target.checked, rejectOrder: false })}
                                />}
                                label="ارسال شده" />
                        </FormGroup>
                        <Divider />
                        <FormControlLabel sx={{ direction: ctx.isRtl ? "rtl" : "ltr" }}
                            control={<Switch
                                name="time"
                                color="primary"
                                checked={state.time}
                                onChange={(event) => setState({ ...state, time: event.target.checked })}
                            />}
                            label="تاریخ" />
                        <div style={{ marginRight: "30px" }}>
                            <label style={{ color: " #7367f0 ", padding: "5px" }}>از :</label>
                            <DatePicker
                                animations={
                                    [transition({ duration: 800, from: 35 })]
                                }
                                format="YYYY/M/D"
                                value={timeData.start}
                                onChange={date => {
                                    setTimeData({ ...timeData, start: date.format() })
                                }}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                render={<InputIcon />}
                                disabled={state.time ? false : true}
                            />
                            <br /><br />
                            <label style={{ color: " #7367f0 ", padding: "5px" }}>تا :</label>
                            <DatePicker
                                format="YYYY/M/D"
                                value={state.time ? timeData.end : ""}
                                onChange={date => {
                                    setTimeData({ ...timeData, end: date.format() })
                                }}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                render={<InputIcon />}
                                disabled={state.time ? false : true}

                            />
                            {/* <p style={{ display: maxAmountBigger ? "none" : "", color: "red", paddingRight: "30%", margin: "0", fontSize: "10px" }}>مقدار وارد شده کمتر از مقدار ماکسیمم می باشد</p> */}

                        </div>


                    </Box>
                </DialogContent>

            </Dialog>
        </React.Fragment>
    );
}