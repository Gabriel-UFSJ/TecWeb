import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./register.module.css";

import Swal from "sweetalert2";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        //alert(data.error);
        Swal.fire({
          icon: "error",
          title: "Erro ao cadastrar usuário!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        //alert("Usuário cadastrado com sucesso!");
        Swal.fire({
          icon: "success",
          title: "Usuário cadastrado com sucesso!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.title}>Cadastre-se</p>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
          />
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
            Cadastrar
          </button>
        </form>
        <Link to="/login" className={styles.link}>
          Já tem uma conta? Faça login!
        </Link>
      </div>
    </div>
  );
}