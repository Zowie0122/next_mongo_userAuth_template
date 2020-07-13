import React, { useState } from "react";

export default function Register() {
  const [name, setName] = useState("your name");
  const [email, setEmail] = useState("your email");
  const [password, setPassword] = useState("your password");

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) =>
        res.json().then((res) => {
          if (res.authToken) {
            localStorage.setItem("token", res.authToken);
            Router.push(`/Dashboard/${res.userId}`);
          }
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
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
        <input type="submit" value="Submit" onClick={handleRegister} />
      </form>
    </div>
  );
}
