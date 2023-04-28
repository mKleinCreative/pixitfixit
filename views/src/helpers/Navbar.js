import React, { useState } from "react";
import {Button, ButtonGroup, Drawer, Modal, Box, TextField} from "@mui/material"

export default function Navbar() {

 const [open, setOpen] = useState(false);
 const [openLoginModal, setLoginModalOpen] = useState(false);
 const [openRegisterModal, setRegisterModalOpen] = useState(false);


 const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
        <React.Fragment>
          <Button variant="contained" onClick={() => {setOpen(true); console.log(open)}}>=</Button>
          <Drawer
          PaperProps={{
            sx: {
              width: 250,
              p: 2
            },
          }}
            open={open}
          >
            <ButtonGroup orientation="vertical" variant="text" aria-label="outlined primary button group">
                <Button onClick={() => setLoginModalOpen(true)}>Login</Button>
                <Modal
                    open={openLoginModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <form>
                        <TextField sx={{mr: 2}} id="standard-basic" label="Email" variant="standard" />
                        <TextField id="standard-basic" label="Password" variant="standard" />
                        </form>
                        <Button sx={{mt: 3}} color="error" variant="outlined" onClick={() => setLoginModalOpen(false)}>close</Button>
                    </Box>
                    </Modal>
                <Button onClick={() => setRegisterModalOpen(true)}>Register</Button>
                <Modal
                    open={openRegisterModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <form>
                            <TextField sx={{mr: 2}} id="standard-basic" label="Email" variant="standard" />
                            <TextField id="standard-basic" label="Password" variant="standard" />
                            <TextField sx={{mr: 2}} id="standard-basic" label="Age" variant="standard" />
                            <TextField id="standard-basic" label="Zip Code" variant="standard" />
                        </form>
                        <Button sx={{mt: 3}} color="error" variant="outlined" onClick={() => setRegisterModalOpen(false)}>close</Button>
                    </Box>
                    </Modal>
                <Button><a href="/admin">Admin</a></Button>
            </ButtonGroup>
            
            <Button color="error" variant="outlined" onClick={() => setOpen(false)}>close</Button>
          </Drawer>
        </React.Fragment>
  );
}