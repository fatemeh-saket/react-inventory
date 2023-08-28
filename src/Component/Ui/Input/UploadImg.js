import { useState } from "react"
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ThemeContext from '../../../Store/ThemeContext'
import { useContext } from 'react';

const UploadImg = ({ field, form, ...props }) => {
    const [urlName, setUrlName] = useState("")
    const ctx = useContext(ThemeContext)

    return (
        <div style={{ direction: ctx.isRtl ? "rtl" : "ltr" }}>
            <span style={{ color: "#7367f0", margin: "1rem" }}> لود عکس محصول :</span>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                name={field.name}
                type="file"
                onChange={e => {
                    form.setFieldValue(field.name, URL.createObjectURL(e.target.files[0]))
                    setUrlName(e.target.files[0].name)
                }}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span"
                    startIcon={<CloudUploadIcon sx={{ m: ".5rem" }} />}>
                    Upload
                </Button>

            </label>
            <span style={{ margin: "10px", color: "#7367f0" }}>{urlName}</span>
        </div>
    )
}
export default UploadImg