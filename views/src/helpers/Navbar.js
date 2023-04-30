import React, { useState, useEffect } from "react";
import {Button, ButtonGroup, Drawer, Modal, Box, TextField} from "@mui/material"
import { display } from "@mui/system";
import axios from 'axios'

export default function Navbar() {

 const [open, setOpen] = useState(true);
 const [openLoginModal, setLoginModalOpen] = useState(true);
 const [openRegisterModal, setRegisterModalOpen] = useState(false);
 const [openAdminModal, setAdminModalOpen] = useState(false);
 const [loggedIn, setLoggedIn] = useState(false)
 const [newUser, setNewUser] = useState({})
 const [users, setUsers] = useState([])

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

 useEffect(() => {
   const getUsers = async () => {
     const users = await axios.get("/userRoutes/users");
     setUsers(users.data.users)
   }
   getUsers()
 }, [])

 const removeUser = async (id) => {
    await axios.get(`/userRoutes/deleteUser/${id}`)
    const users = await axios.get('/userRoutes/users')
    setUsers(users.data.users)
 }

  const handleRegister = async () => {
    // TODO: Validate that newuser has all required fields
    console.log('newUser State',newUser)
    const newUserCreated = await axios.post("/userRoutes/register", newUser);
    setUsers([...users, newUserCreated])
    return newUserCreated

  }

  const handleLogin = async (username, password) => {
  // Perform your authentication logic here
    // if (/* authentication is successful */) {
      sessionStorage.setItem("user", username);
      setLoggedIn(true);
      setOpen(false);
    // }
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        =
      </Button>
      <Drawer
        PaperProps={{
          sx: {
            width: 250,
            p: 2,
          },
        }}
        open={open}
      >
        <ButtonGroup
          orientation="vertical"
          variant="text"
          aria-label="outlined primary button group"
        >
          {!sessionStorage.user ? (
            <>
              <Button onClick={() => setLoginModalOpen(true)}>Login</Button>
              <Modal
                open={openLoginModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <form>
                    <TextField
                      sx={{ mr: 2 }}
                      id="standard-basic"
                      label="Email"
                      variant="standard"
                    />
                    <TextField
                      id="standard-basic"
                      label="Password"
                      variant="standard"
                    />
                  </form>
                  <Button
                    sx={{ mt: 3 }}
                    color="error"
                    variant="outlined"
                    onClick={() => setLoginModalOpen(false)}
                  >
                    close
                  </Button>
                  <Button
                    sx={{ mt: 3 }}
                    color="primary"
                    variant="outlined"
                    onClick={() => setLoginModalOpen(false)}
                  >
                    login
                  </Button>
                </Box>
              </Modal>

              <Button onClick={() => setRegisterModalOpen(true)}>
                Register
              </Button>
              <Modal
                open={openRegisterModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <form>
                    <TextField
                      value={newUser.firstName}
                      sx={{ mr: 2 }}
                      id="standard-basic"
                      label="First Name"
                      onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                      variant="standard"
                      required
                    />
                    <TextField
                      value={newUser.lastName}
                      sx={{ mr: 2 }}
                      id="standard-basic"
                      label="Last Name"
                      onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                      variant="standard"
                      required
                    />
                    <TextField
                      value={newUser.email}
                      sx={{ mr: 2 }}
                      id="standard-basic"
                      label="Email"
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      variant="standard"
                      required
                    />
                    <TextField
                      value={newUser.password}
                      id="standard-basic"
                      label="Password"
                      variant="standard"
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      required
                    />
                    <TextField
                      value={newUser.age}
                      sx={{ mr: 2 }}
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      type="number"
                      label="Age"
                      variant="standard"
                      onChange={(e) =>
                        setNewUser({...newUser,  age: e.target.value })
                      }
                      required
                    />
                    <TextField
                      value={newUser.zipcode}
                      sx={{ mr: 2 }}
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      type="number"
                      label="Zipcode"
                      variant="standard"
                      onChange={(e) =>
                        setNewUser({...newUser,  zipcode: e.target.value })
                      }
                      required
                    />
                  </form>
                  <Button
                    sx={{ mt: 3 }}
                    color="error"
                    variant="outlined"
                    onClick={() => setRegisterModalOpen(false)}
                  >
                    close
                  </Button>
                  <Button
                    sx={{ mt: 3 }}
                    color="primary"
                    variant="outlined"
                    onClick={() => handleRegister()}
                  >
                    register
                  </Button>
                </Box>
              </Modal>
            </>
          ) : null}
          {sessionStorage.admin ? (
            <>
              <Button onClick={() => setAdminModalOpen(true)}>Admin</Button>
              <Modal
                open={openAdminModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={adminStyle}>
                  <h1>Admin portal</h1>
                  {users.map((e, i) => {
                    return (
                      <div style={{ display: "flex", marginBottom: "1rem" }}>
                        <p style={{ marginRight: "1rem" }} key={i}>
                          {`${e.email}: ${e.firstName}, ${e.lastName}`}
                        </p>
                        <Button
                          key={i + 1}
                          onClick={() => removeUser(e._id)}
                          color="error"
                          variant="outlined"
                        >
                          Delete
                        </Button>
                      </div>
                    );
                  })}
                  <Button
                    sx={{ mt: 3 }}
                    color="error"
                    variant="outlined"
                    onClick={() => setAdminModalOpen(false)}
                  >
                    close
                  </Button>
                </Box>
              </Modal>
            </>
          ) : null}
        </ButtonGroup>
        {sessionStorage.user ? (
          <>
            <Button
              color="error"
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              close
            </Button>
          </>
        ) : null}
      </Drawer>
    </React.Fragment>
  );
}