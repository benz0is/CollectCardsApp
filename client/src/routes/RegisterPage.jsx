import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../context/ContextProvider";
import shortId from "shortid";

const RegisterPage = () => {
  let history = useHistory();
  const { username, setUsername, password, setPassword } = useContext(Context);
  const [api, setApi] = useState([]);
  const userImg =
    "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png";

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query
            {user {
              username
            }
          }`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setApi(res.data.user));
    };
    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    api.map((res) => {
      if (res.username == username) {
        alert("Username already taken");
        return;
      }
    });
    e.preventDefault();
    await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{AddUser(id:"${shortId.generate()}"username:"${username}" password:"${password}" balance:${3000} picture:"${userImg}") {
          id
        }}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
    history.push("/");
  };
  return (
    <form
      className="container p-4 mt-5
    "
      style={{
        width: "300px",
        border: "solid 0.5px black",
        borderRadius: "10px",
      }}
    >
      <a href="/">
        {" "}
        <i
          className="fas fa-arrow-left"
          style={{
            color: "white",
            background: "rgb(36, 160, 237)",
            padding: "6px",
            borderRadius: "50px",
            cursor: "pointer",
          }}
        ></i>
      </a>

      <div className="form-group ">
        <label htmlFor="Register">Please make an account</label>
      </div>
      <div className="form-group">
        <label htmlFor="Username">Username</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="Username">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input
        type="button"
        className="btn btn-primary"
        value="Register"
        onClick={(e) => {
          if (password.length < 6) {
            alert("Password too short");
            return;
          }
          handleSubmit(e);
        }}
      />
    </form>
  );
};

export default RegisterPage;
