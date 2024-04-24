import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import NavAdmin from "./NavAdmin";

export default function EditNews() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [img, setImg] = useState("");
  const [news, setNews] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://localhost:8000/getnews/${params.id}`)
        .then((response) => response.json())
        .then((data) => setNews(data));
    };
    fetchData();
  });

  const handleSave = () => {
    fetch(`http://localhost:8000/savenews/${params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        message: message,
        img: img,
      }),
    });
  }

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
            marginTop: 10 ,
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
            id="outlined-multiline-static"
            label="Title"
            multiline
            rows={2}
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={
              Array.isArray(news) && news.length > 0 && news[0].title
            }
          />
          <TextField
            name="message"
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows={20}
            onChange={(e) => setMessage(e.target.value)}
            defaultValue={
              Array.isArray(news) && news.length > 0 && news[0].message
            }
          />
          <TextField
            name="img"
            id="outlined-multiline-static"
            label="Image"
            multiline
            rows={2}
            onChange={(e) => setImg(e.target.value)}
            defaultValue={Array.isArray(news) && news.length > 0 && news[0].img}
          />
          <Button variant="contained" sx={{ height: 50 }} onClick={handleSave}>Сохранить</Button>
        </Box>
      </div>
    </>
  );
}
