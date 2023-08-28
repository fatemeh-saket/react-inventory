import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ThemeContext from '../../../Store/ThemeContext'
import { useContext } from 'react';

const MyRadio = ({ field, form, ...props }) => {

    const ctx = useContext(ThemeContext)
    return (
        <div style={{ direction: ctx.isRtl ? 'rtl' : 'ltr', marginTop: "3rem" }}>
            <FormControl component="fieldset" sx={{
                direction: ctx.isRtl ? 'rtl' : 'ltr', textAlign: "right"
                , display: props.isShow ? "none" : ""
            }}>
                <FormLabel component="legend"> محاسبه محصول بر اساس :</FormLabel>
                <RadioGroup value={field.value} onChange={(e) => {
                    form.setFieldValue(field.name, e.target.value)
                }}>
                    <FormControlLabel value="number" control={<Radio />} label='مقدار' />
                    <FormControlLabel value="weight" control={<Radio />} label='وزن' />
                </RadioGroup>
            </FormControl>
        </div>

    )
}
export default MyRadio