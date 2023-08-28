import { Formik, Form, Field } from 'formik'
import * as Yup from "yup"
import PerfectScrollbar from 'react-perfect-scrollbar'
import Box from '@mui/material/Box';
import classes from './style.module.css'
import IconButton from '@mui/material/IconButton';
import { useContext, useState } from 'react';
import ThemeContext from '../../Store/ThemeContext'
import MyInput from '../Ui/Input/MyInput'
import UploadImg from '../Ui/Input/UploadImg'
import MyRadio from '../Ui/Input/MyRadio'
import MySelect from '../Ui/Input/MySelect'
import Paper from '@mui/material/Paper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Button from '@mui/material/Button';
import MyTextEara from "../Ui/Input/MyTextEara"
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { itemactions } from '../../Store/Reducers/items-Slice'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

const CreateItem = (props) => {

    const ctx = useContext(ThemeContext)
    const numberRegExp = /^[0-9]+$/
    const dispatch = useDispatch()
    const data = useSelector(state => state.products.selectedItem)
    const allItems = useSelector(state => state.products.items)
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate()

    const handleCloseModal = () => {
        setOpenModal(false)
    }
    const handleOpenModal = () => {
        setOpenModal(true)

    }
    const SignupSchema = Yup.object().shape({
        title: Yup.string().required("لطفا نام را وارد نمایید"),
        price: Yup.string().matches(numberRegExp, 'لطف مقدار معتبر را وارد نمایید').required("لطفا مقدار را وارد نمایید"),
        totalNumber: Yup.string().matches(numberRegExp, 'لطف مقدار معتبر را وارد نمایید'),
        type: Yup.string().required("لطفا نوع کالا را وارد نمایید"),
        weight: Yup.string().matches(numberRegExp, 'لطف وزن معتبر را وارد نمایید')
    })

    const initialValues = {
        title: "",
        price: "",
        counterUnit: "number",
        totalNumber: "0",
        image: "",
        weight: "0",
        type: "",
        description: "",
        detail: []
    }
    const currentValue = {
        title: data.title,
        price: data.price,
        counterUnit: data.counterUnit,
        totalNumber: data.totalNumber,
        image: data.image,
        weight: data.weight,
        type: data.type,
        description: data.description,
        detail: []
    }
    const { isEdit } = props


    const menuItem = [
        {
            value: 'notImport',
            label: 'معمولی',
        },
        {
            value: 'import',
            label: 'کمیاب',
        }
    
    ];
    return (
        <Paper sx={{
            backgroundColor: ctx.skin === 'Light' ? '#fff' : '#283046', direction: ctx.isRtl ? "rtl" : "ltr",
            borderRadius: '20px',
            boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        }} >
            <section className={classes[`Item-header`]} >
                <div >
                    <h1>
                        {isEdit ? <FormattedMessage id="edit" /> : <FormattedMessage id="add" />}
                    </h1>
                </div>

                <div >
                    <IconButton color="primary" onClick={() => props.handleCloseBtn(false)}>
                        {ctx.isRtl ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
                    </IconButton>
                </div>

            </section>
            <PerfectScrollbar className='scroll-area' options={{ wheelPropagation: true, suppressScrollX: true }} >
                <Box sx={{ width: 1, mt: 2, height: "64.8vh", padding: "20px" }} >
                    <Formik
                        initialValues={isEdit ? currentValue : initialValues}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validationSchema={SignupSchema}
                        onSubmit={values => {

                            // if (values.counterUnit === "number") {
                            //     values.weight = "0"
                            // }
                            // if (values.counterUnit === "weight") {
                            //     values.totalNumber = "0"
                            // }
                            if (!isEdit) {
                                // ** find a index of product that have a same name which enter
                                const index = allItems.findIndex(element => element.title === values.title)
                                // ** when have a new name
                                if (index === -1) {
                                    dispatch(itemactions.addItem(values))
                                    props.handleCloseBtn()  // close page
                                    props.handleCloseBtn(false)
                                    props.handleSnackbarClick()

                                }
                                // ** when have a Duplicate name
                                if (index !== -1) {
                                    dispatch(itemactions.handleChangeSelectedItem(allItems[index]))   //change seletitem for open that product
                                    handleOpenModal()
                                }

                            }
                            if (isEdit) {
                                dispatch(itemactions.editItem(["editLastValue", values]))
                                props.handleCloseBtn(false)
                                props.handleSnackbarClick()
                            }
                        }
                        }
                    >
                        {(props) => {
                            const {
                                errors,

                            } = props;
                            return (
                                <Form>
                                    <Field
                                        style={{ marginTop: "3rem" }}
                                        id='image' name='image'
                                        component={UploadImg}
                                    />
                                    <Field
                                        style={{ marginTop: "3rem" }}
                                        type='text' id='title' name='title'
                                        label="نام محصول"
                                        errors={errors.title}
                                        component={MyInput}
                                    />
                                    <Field
                                        style={{ marginTop: "3rem" }}
                                        type='text' id='price' name='price'
                                        label="قیمت"
                                        errors={errors.price}
                                        component={MyInput}
                                    />
                                    <Field
                                        type='text'
                                        id='counterUnit'
                                        name='counterUnit'
                                        component={MyRadio}
                                        isShow={isEdit}
                                    />

                                    <Field
                                        style={{ marginTop: "1rem" }}
                                        type='text' id='totalNumber' name='totalNumber'
                                        label="تعداد"
                                        errors={errors.totalNumber}
                                        component={MyInput}
                                        disabled={props.values.counterUnit !== "number" || isEdit}

                                    />
                                    <Field
                                        style={{ marginTop: "1rem" }}
                                        type='text' id='weight' name='weight'
                                        label="مقدار"
                                        errors={errors.weight}
                                        component={MyInput}
                                        disabled={props.values.counterUnit !== "weight" || isEdit}
                                    />
                                    <Field
                                         style={{ width: "23%", marginTop: "4rem",
                                         textAlign:ctx.isRtl?"right":"left" }}
                                        errors={errors.type}
                                        id='type'
                                        name='type'
                                        label="نوع کالا"
                                        menuItem={menuItem}
                                        component={MySelect}
                                    />

                                    <Field
                                        style={{ marginTop: "1rem" }}
                                        type='text' id='description' name='description'
                                        label="توضیحات"
                                        component={MyTextEara}
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
            <Dialog
                fullWidth={false}
                maxWidth='sm'
                open={openModal}
                onClose={handleCloseModal}
            >
                <DialogTitle sx={{ backgroundColor: ctx.skin === "Light" ? '#cccef7' : "#7367f0", height: "6vh", pb: '2rem', textAlign: ctx.isRtl ? "right" : "left", color: "red" }}  >
                    کالای مورد نظر موجود می باشد
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.alertDescrib}>
                        برای مشاهده ی اطلاعات کالا بر روی دکمه مشاهده کلیک فرمایید
                    </DialogContentText>

                </DialogContent>
                <DialogActions sx={{ direction: "flex", justifyContent: "space-around" }}>
                    <Button variant="contained" color="primary" component="span"
                        onClick={() => navigate("/stock/show")}>
                        Close
                    </Button>
                    <Button variant="contained" color="error" component="span"
                        onClick={props.handleCloseModal}><FormattedMessage id="close" /></Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}
export default CreateItem