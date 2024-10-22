import { useState } from "react";
import { LoginForm } from "../LoginForm";
import { RegisterForm } from "../RegisterForm";

import "./AuthForm.css";

export const AuthForm = () => {
  const [authType, setAuthType] = useState("auth");

  const handleClick = () => {
    setAuthType((prevState) =>
      prevState === "registration" ? "auth" : "registration",
    );
  };

  return (
    <div>
      <h2>
        {authType === "registration" ? "Регистрация" : "Авторизация"}
      </h2>
      {authType === "registration" ? <RegisterForm /> : <LoginForm />}
      <div className="auth-choose">
        <span>
          {authType === "registration" ? "Уже есть аккаунт?" : "Ещё нет аккаунта?"}
        </span>
        <button onClick={handleClick}>
          {authType === "registration" ? "Войти" : "Создать аккаунт"}
        </button>
      </div>
    </div>
  );
};
