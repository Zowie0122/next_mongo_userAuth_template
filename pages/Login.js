import React, { useEffect, useState, useRef } from "react";
import Router from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => {
      res.json().then((res) => {
        if (res.authToken) {
          localStorage.setItem("token", res.authToken);
          Router.push(`/Dashboard/${res.userId}`);
        } else {
          setErrorMessage("Please input correct email and password");
        }
      });
    });
  };

  return (
    <>
      <div>
        <form>
          <label>
            Email:
            <input
              type="text"
              name="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="text"
              name="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <input type="submit" value="Submit" onClick={handleLogin} />
        </form>
      </div>
    </>
  );
}
