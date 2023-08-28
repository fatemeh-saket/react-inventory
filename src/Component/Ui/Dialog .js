import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ThemeContext from '../../Store/ThemeContext'

export default function MaxWidthDialog(props) {
    const ctx = React.useContext(ThemeContext)

  return (
    <React.Fragment>
 
      <Dialog
        fullWidth={true}
        maxWidth='sm'
        open={props.open}
        onClose={props.handleClose}
      >
        <DialogTitle sx={{ backgroundColor:ctx.skin === "Light" ? '#cccef7' : "#7367f0", height:"6vh", pb:'2rem', textAlign:ctx.isRtl?"right":"left"}}  >Optional sizes</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText> */}
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
           
           {props.content}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}