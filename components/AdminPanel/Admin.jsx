import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import NavAdmin from "./NavAdmin";

const style = {
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  transform: "translate(170%, 100%)",
  borderRadius: "10px",
  
};

export default function Admin() {
  const [userLogin, setUserLogin] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState([]);
  const [login, setLogin] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (location.state === undefined || location.state !== "admin") {
      navigate("/");
    }
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    fetch("http://localhost:8000/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: rowSelectionModel }),
    });
  };

  const handleAdd = () => {
    fetch("http://localhost:8000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login: userLogin, password: password }),
    });
    handleClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:8000/main/get")
        .then((response) => response.json())
        .then((data) => setMessage(data));
    };
    fetchData();
  });

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "login", headerName: "Login", width: 200 },
    { field: "password", headerName: "Password", width: 200 },
  ];

  return (
    <>
      <NavAdmin />
      <div>
        <div
          style={{ height: 400, width: "50%", margin: "auto", marginTop: 100 }}
        >
          <DataGrid
            rows={message.map((x) => ({
              id: x.id,
              login: x.login,
              password: x.password,
            }))}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              color: "primary.main",
              boxShadow: 2,
              border: 2,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
            {...rowSelectionModel}
          />
          <Button onClick={handleClick}>Delete user</Button>
          <div>
            <Button onClick={handleOpen}>Add user</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <TextField
                  sx={{ marginBottom: 2 }}
                  id="outlined-basic"
                  label="Login"
                  name="login"
                  onChange={(e) => setUserLogin(e.target.value)}
                />
                <TextField
                  sx={{ marginBottom: 2 }}
                  id="outlined-basic"
                  label="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  sx={{ marginBottom: 2, fontSize: 16, width: 220 }}
                  onClick={handleAdd}
                  variant="contained"
                >
                  Add
                </Button>
              </Box>
            </Modal>
          </div>
        </div>
        <h1>{login}</h1>
      </div>
    </>
  );
}
