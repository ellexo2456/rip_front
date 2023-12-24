/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { loginUser } from "../core/api/auth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (!login.email || !login.password) {
      return;
    }
    loginUser(login).then(() => navigate("/rip_front/"));
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input
          placeholder="Почта"
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
          style={{
            borderRadius: "10px",
            border: "0.5px solid black",
            padding: "5px",
            marginTop: "20px",
          }}
        ></input>
        <input
          placeholder="Пароль"
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
          style={{
            borderRadius: "10px",
            border: "0.5px solid black",
            padding: "5px",
            marginTop: "20px",
          }}
          type="password"
        ></input>
        <Button
          type="submit"
          style={{ borderRadius: "10px", padding: "5px", marginTop: "20px" }}
        >
          Логин
        </Button>
      </form>
    </div>
  );
};
