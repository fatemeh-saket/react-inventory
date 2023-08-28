import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ThemeContext from '../../Store/ThemeContext'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbars(props) {
    const ctx = React.useContext(ThemeContext)

    return (
        <Stack spacing={2} sx={{ width: '100%', direction: "ltr" }}>
            <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose} anchorOrigin={{ vertical: 'top', horizontal: ctx.isRtl ? 'left' : 'right' }}>
                <Alert onClose={props.handleClose} severity={props.alert} sx={{ width: '100%' }}>
                    {props.message}
                </Alert>
            </Snackbar>

        </Stack>
    );
}