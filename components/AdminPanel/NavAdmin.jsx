import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NavAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (location.state === undefined || location.state !== "admin") {
      navigate("/");
    }
  });
  return (
    <>
      <Button
        sx={{ marginTop: 5, marginLeft: 5, fontSize: 20 }}
        onClick={() => navigate("/")}
      >
        Выйти
      </Button>
      <Button
        sx={{ marginTop: 5, marginLeft: 5, fontSize: 20 }}
        onClick={() => navigate("/admin/users", location)}
      >
        Пользователи
      </Button>
      <Button
        sx={{ marginTop: 5, marginLeft: 5, fontSize: 20 }}
        onClick={() => navigate("/admin/addnews", location)}
      >
        Добавить/удалить новость
      </Button>
    </>
  );
}
