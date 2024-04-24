import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Main.css";

export default function Main() {
  const [resText, setReqText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  });

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
      <Navigation />
      <div className="news-container">
      <h1>Новости компании</h1>
        {Array.isArray(resText) && resText.length > 0 ? (
          resText.map((x) => (
            <div key={x.id} className="news">
              <h1>{x.title}</h1>
              <p>{x.message}</p>
              <img className="img" src={x.img} />
            </div>
          ))
        ) : (
          <h1>Новостей пока нет</h1>
        )}
      </div>
    </>
  );
}
