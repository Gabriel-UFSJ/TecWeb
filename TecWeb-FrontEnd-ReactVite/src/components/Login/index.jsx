
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";

import Swal from "sweetalert2";

export function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.error) {
        //alert(data.error);
        Swal.fire({
          icon: "error",
          title: "Erro ao fazer login!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        //alert("Usuário logado com sucesso!");
        Swal.fire({
          icon: "success",
          title: "Usuário logado com sucesso!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
      const token = data.token;
      localStorage.setItem("token", token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <Link to="/register" className={styles.link}>
        Sign Up
      </Link>
    </div>
  );
}