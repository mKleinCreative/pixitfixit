import React, { useState } from "react";
import {Button, ButtonGroup, Drawer, Modal, Box, TextField} from "@mui/material"
import { display } from "@mui/system";

export default function Navbar() {

 const [open, setOpen] = useState(false);
 const [openLoginModal, setLoginModalOpen] = useState(false);
 const [openRegisterModal, setRegisterModalOpen] = useState(false);
 const [openAdminModal, setAdminModalOpen] = useState(false);


 const removeUser = (id) => {
    //TODO axios call here
    console.log(id)
 }


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

  const adminStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 600,
    alignText: 'center',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const mockData = [
    {
        _id: '1',
        username: 'tommy',
    },
    {
        _id: '2',
        username: 'john',
    },
    {
        _id: '3',
        username: 'amanda',
    },
    {
        _id: '4',
        username: 'sexton',
    },
  ]

  return (
        <React.Fragment>
          <Button variant="contained" onClick={() => {setOpen(true)}}>=</Button>
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
                            <TextField sx={{mr: 2}} id="standard-basic" label="First Name" variant="standard" />
                            <TextField sx={{mr: 2}} id="standard-basic" label="Last Name" variant="standard" />
                            <TextField sx={{mr: 2}} id="standard-basic" label="Email" variant="standard" />
                            <TextField id="standard-basic" label="Password" variant="standard" />
                            <TextField sx={{mr: 2}} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} type="number" label="Age" variant="standard" />
                        </form>
                        <Button sx={{mt: 3}} color="error" variant="outlined" onClick={() => setRegisterModalOpen(false)}>close</Button>
                    </Box>
                    </Modal>
                <Button onClick={() => setAdminModalOpen(true)}>Admin</Button>
                <Modal
                    open={openAdminModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={adminStyle}>
                        <h1>Admin portal</h1>
                        {mockData.map((e, i) => {
                            return (
                                <div style={{display: 'flex', marginBottom: '1rem'}}>
                                    <p style={{marginRight: '1rem'}} key={i}>{e.username}</p>
                                    <Button key={i+1} onClick={() => removeUser(e._id)} color="error" variant="outlined">Delete</Button>
                                </div>
                            
                            )
                        })}
                        <Button sx={{mt: 3}} color="error" variant="outlined" onClick={() => setAdminModalOpen(false)}>close</Button>
                    </Box>
                    </Modal>
            </ButtonGroup>
            
            <Button color="error" variant="outlined" onClick={() => setOpen(false)}>close</Button>
          </Drawer>
        </React.Fragment>
  );
}