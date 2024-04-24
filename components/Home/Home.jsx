import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Box } from "@mui/material";

export default function Home() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setOpen(false), 8000);
  });

  useEffect(() => {
    async function test() {
      const response = await fetchData();
      const json = await response.json();
      setMessage(json);
    }

    test();
  }, []);

  function fetchData() {
    return fetch("http://localhost:8000/main/get");
  }

  function handleClick() {
    const targetUser = message.find(
      (x) => x.password === password && x.login === login
    );
    if (targetUser) {
      if (targetUser.login === "admin") {
        navigate("/admin", { state: targetUser.login });
      } else {
        navigate("/main", { state: targetUser });
      }
    } else {
      setOpen(true);
    }
  }

  return (
    <>
    <div className="form-container">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 400,
          gap: 4,
          marginTop: 50,
          "& .MuiTextField-root": {
            width: "100%",
            borderRadius: "8px",
            border: "2px solid #1c1c1c",
            backgroundColor: "whitesmoke",
            color: "#1c1c1c",
          },
        }}
      >
        <TextField
          id="login"
          name="login"
          label="Логин"
          required
          variant="standard"
          fullWidth
          color="secondary"
          type="text"
          onChange={(e) => setLogin(e.target.value)}
        />

        <TextField
          id="pass"
          name="pass"
          required
          label="Пароль"
          variant="standard"
          fullWidth
          color="secondary"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="btn-container">
          <Button
            color="secondary"
            variant="contained"
            className="btn"
            onClick={handleClick}
            sx={{ height: 50, width: "100%" }}
          >
            Отправить
          </Button>
        </div>

        <Snackbar open={open} autoHideDuration={8000}>
          <Alert sx={{}} severity="error" variant="filled">
            Неверный логин или пароль
          </Alert>
        </Snackbar>
      </Box>
    </div>
    </>
  );
}
