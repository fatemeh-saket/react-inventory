import { Formik, Form, Field } from 'formik'
import * as Yup from "yup"
import PerfectScrollbar from 'react-perfect-scrollbar'
import Box from '@mui/material/Box';
import classes from './style.module.css'
import IconButton from '@mui/material/IconButton';
import { useContext, useState } from 'react';
import ThemeContext from '../../Store/ThemeContext'
import MyInput from '../Ui/Input/MyInput'
import MySelect from '../Ui/Input/MySelect'
import Paper from '@mui/material/Paper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Button from '@mui/material/Button';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { unavailableItemactions } from '../../Store/Reducers/deficits-slice'
import Snackbars from '../Ui/SnakBar'

const CreateNewDeficit = (props) => {
    const ctx = useContext(ThemeContext)
    const numberRegExp = /^[0-9]+$/
    const dispatch = useDispatch()
    const data = useSelector(state => state.products.items)
    const [openErrorSnak, setOpenErrorSnak] = useState(false);

    const statusList = [
        { value: "B1", label: "ضروری" },
        { value: "B2", label: "غیر ضروری" },
    ]
    const dataStore = [
        { value: 'A1', label: 'قروشگاه 1' },
        { value: 'A2', label: 'فروشگاه 2' },
        { value: 'A3', label: 'قروشگاه 3' },
        { value: 'A4', label: 'قروشگاه 4' }
    ];
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenErrorSnak(false)
    };
    const SignupSchema = Yup.object().shape({
        title: Yup.string().required("لطفا نام کالا را وارد نمایید"),
        store: Yup.string().required("لطفا نام فروشگاه را وارد نمایید"),
        amount: Yup.string().matches(numberRegExp, 'لطف مقدار معتبر را وارد نمایید').required("لطفا مقدار را وارد نمایید"),
        status: Yup.string().required("لطفا نوع کالا را وارد نمایید"),
    })

    const initialValues = {
        title: props.title === undefined ? "" : props.title,
        store: props.store === undefined ? "" : props.store,
        amount: "",
        status: ""
    }

    return (
        <Paper sx={{
            backgroundColor: ctx.skin === 'Light' ? '#fff' : '#283046', direction: ctx.isRtl ? "rtl" : "ltr",
            borderRadius: '20px',
            boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        }} >
            <section className={classes[`Item-header`]} >
                <div >
                    <h1>
                        <FormattedMessage id="add" />
                    </h1>
                </div>

                <div >
                    <IconButton color="primary" onClick={() => props.handleCloseBtn(false)}>
                        {ctx.isRtl ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
                    </IconButton>
                </div>

            </section>
            <PerfectScrollbar className='scroll-area' options={{ wheelPropagation: true, suppressScrollX: true }} >
                <Box sx={{ width: 1, mt: 2, height: "64.8vh", paddingRight: "20px" }} >
                    <Formik
                        initialValues={initialValues}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validationSchema={SignupSchema}
                        onSubmit={values => {
                            let indexInProduct = data.findIndex(element => element.title == values.title)
                            if (indexInProduct !== -1) {
                                let storeIndex = dataStore.findIndex(element => element.value === values.store)
                                let statuseIndex = statusList.findIndex(element => element.value === values.status)

                                let newDeficit = {
                                    title: values.title,
                                    amount: values.amount,
                                    counterUnit: data[indexInProduct].counterUnit,
                                    status: statusList[statuseIndex].label,
                                    store: dataStore[storeIndex].label,
                                    time: new Date().toLocaleDateString('fa-IR'),
                                }
                                dispatch(unavailableItemactions.addItem(newDeficit))
                               props.handleCloseBtn()
                               props.handleSnackbarClick()
                            
                            }
                            if (indexInProduct === -1){
                                setOpenErrorSnak(true)
                            }
                        }
                        }
                    >
                        {(props) => {
                            return (
                                <Form>

                                    <Field
                                        style={{ marginTop: "1rem" }}
                                        type='text' id='title' name='title'
                                        label="نام"
                                        errors={props.errors.title}
                                        component={MyInput}
                                    />
                                    <Field
                                        style={{ marginTop: "1rem" }}
                                        type='text' id='amount' name='amount'
                                        label="مقدار"
                                        errors={props.errors.amount}
                                        component={MyInput}
                                    />

                                    <Field
                                        style={{
                                            width: "18%", marginTop: "1rem",
                                            textAlign: ctx.isRtl ? "right" : "left"
                                        }}
                                        errors={props.errors.store}
                                        id='store'
                                        name='store'
                                        label="فروشگاه"
                                        menuItem={dataStore}
                                        component={MySelect}
                                    />

                                    <Field
                                        style={{
                                            width: "18%", marginTop: "1rem",
                                            textAlign: ctx.isRtl ? "right" : "left"
                                        }}
                                        errors={props.errors.status}
                                        id='status'
                                        name='status'
                                        label="اهمیت"
                                        component={MySelect}
                                        menuItem={statusList}

                                    />
                                    <Button style={{ margin: "8px 0" }}
                                        type="submit" variant="contained" color="primary" >
                                        save
                                    </Button>
                                </Form>

                            )
                        }}
                    </Formik>

                </Box>
            </PerfectScrollbar>
            <Snackbars open={openErrorSnak} handleClose={handleSnackbarClose} alert="error" message={<FormattedMessage id="ErrorAlertOrder" />} />

        </Paper>
    )
}
export default CreateNewDeficit