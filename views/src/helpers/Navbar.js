import React, { useState } from "react";
import {Button, ButtonGroup, Drawer} from "@mui/material"
import {BsList} from "react-icons"


export default function Navbar() {

 const [open, setOpen] = useState(false);

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
                <Button>Login</Button>
                <Button>Register</Button>
                <Button>Admin</Button>
            </ButtonGroup>
            
            <Button color="error" variant="outlined" onClick={() => setOpen(false)}>close</Button>
          </Drawer>
        </React.Fragment>
  );
}