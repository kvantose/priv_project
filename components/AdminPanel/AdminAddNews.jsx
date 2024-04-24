import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import NavAdmin from "./NavAdmin";
import "./Admin.css";

export default function AdminAddNews() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [reqTitle, setReqTitle] = useState("");
  const [reqImage, setReqImage] = useState("");
  const [resText, setReqText] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state === undefined || location.state !== "admin") {
      navigate("/");
    }
  });

  const handleAdd = () => {
    fetch("http://localhost:8000/addnews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, image: image, text: text }),
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:8000/getnews")
        .then((response) => response.json())
        .then((data) => setReqText(data));
    };
    fetchData();
  });

  return (
    <>
      <NavAdmin />
      <div className="form-container">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 700,
            gap: 4,
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
            name="title"
            sx={{ marginTop: 10 }}
            className="input"
            id="filled-basic"
            label="Заголовок"
            variant="filled"
            fullWidth
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            name="image"
            className="input"
            id="filled-basic"
            label="Изображение"
            variant="filled"
            fullWidth
            onChange={(e) => setImage(e.target.value)}
          />
          <TextField
            name="text"
            className="input"
            id="outlined-multiline-static"
            label="Новость"
            variant="filled"
            multiline
            rows={14}
            fullWidth
            required
            onChange={(e) => setText(e.target.value)}
          />
          <Button sx={{ height: 50 }} onClick={handleAdd} variant="contained">
            Добавить
          </Button>
        </Box>
      </div>
      <div className="news-container">
        {Array.isArray(resText) && resText.length > 0 ? (
          resText.map((x) => (
            <div key={x.id} className="news">
              <Button
                onClick={() =>
                  fetch(`http://localhost:8000/deletenews` + x.id, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: x.id }),
                  })
                }
              >
                <DeleteIcon />
              </Button>
              <Button
                onClick={() =>
                  navigate("/admin/addnews/editnews/" + x.id, location)
                }
              >
                <EditIcon />
              </Button>
              <div className="news-text">
                <h1>{x.title}</h1>
                <p>{x.message}</p>
                <img className="img" src={x.img} />
              </div>
            </div>
          ))
        ) : (
          <h1>Новостей пока нет</h1>
        )}
      </div>
    </>
  );
}
