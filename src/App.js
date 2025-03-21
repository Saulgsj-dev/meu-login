// src/App.js
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, updateProfile } from "firebase/auth";
import "./App.css";


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      setUser(userCredential.user);
      alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      alert("Login realizado com sucesso!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("E-mail de recuperação enviado!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Bem-vindo, {user.displayName}!</h1>
          <button onClick={handleLogout}>Sair</button>
        </div>
      ) : (
        <div>
          <h1>{isRegistering ? "Cadastro" : "Login"}</h1>
          {isRegistering && (
            <div>
              <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="number" placeholder="Idade" value={age} onChange={(e) => setAge(e.target.value)} />
              <label>
                <input type="checkbox" required /> Li e aceito os termos
              </label>
            </div>
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          {isRegistering ? (
            <button onClick={handleRegister}>Cadastrar</button>
          ) : (
            <button onClick={handleLogin}>Entrar</button>
          )}
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Já tem uma conta? Faça login" : "Não tem conta? Cadastre-se"}
          </button>
          <button onClick={handleResetPassword}>Esqueci minha senha</button>
        </div>
      )}
    </div>
  );
}

export default App;
