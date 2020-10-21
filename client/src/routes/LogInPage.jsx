import React, { useEffect, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Context } from "../context/ContextProvider";
import { useHistory } from "react-router-dom";
import { sign_in } from "../actions/index";

const LogInPage = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { username, setUsername, password, setPassword } = useContext(Context);
  const [errorMsg, setErrorMsg] = useState(false);
  const [api, setApi] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query
          {user {
            id
            username
            password
            picture
            balance
          }
        }`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setApi(res));
    };
    fetchData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    api.data.user.map((res) => {
      if (res.username === username && res.password === password) {
        dispatch(sign_in());
        sessionStorage.setItem("logged", "true");
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("picture", res.picture);
        sessionStorage.setItem("balance", res.balance);
        history.push(`/Home/${res.id}`);
      } else setErrorMsg(true);
    });
  };

  return (
    <form
      className="container p-4 mt-5"
      style={{
        width: "300px",
        border: "solid 0.5px black",
        borderRadius: "10px",
      }}
    >
      <div className="form-group">
        <label htmlFor="Login">
          {errorMsg ? "User not found" : "Please Login"}
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="Username">Username</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <small>
          <a href="/Register" style={{ textDecoration: "none" }}>
            New User? Register
          </a>
        </small>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default LogInPage;
