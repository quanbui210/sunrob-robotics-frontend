import * as React from 'react';
import Modal from '@mui/material/Modal';
import CompStepper from './Stepper'
import Box from '@mui/material/Box';
import {useSelector, useDispatch} from 'react-redux'
import { toggleActions } from '../../store/toggle-slice';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 670,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function CheckoutModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
  const dispatch = useDispatch()
  const open = useSelector(state => state.toggle.show)
  console.log(open)
  const handleClose = () => {
    dispatch(toggleActions.hide())
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <CompStepper/> 
        </Box>
      </Modal>
    </div>
  );
}