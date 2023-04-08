import React, { useState } from "react";
import { login } from "../../Redux/apiCalls";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    if (username && password) {
      login(dispatch, { username, password });
    }
  };
  return (
    <form
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 10 }}
        type="text"
        placeholder="userName"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 10 }}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={{ padding: 10, width: 100 }} onClick={submitHandler}>
        Login
      </button>
    </form>
  );
};

export default Login;
