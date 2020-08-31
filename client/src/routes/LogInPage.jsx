import React, { useEffect } from "react";

const LogInPage = () => {
  useEffect(() => {
    const cors = "https://cors-anywhere.herokuapp.com/";
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/api", {
        method: "POST",
        body: JSON.stringify({
          query: `query
          {user {
            username
            password
          }
        }`,
          headers: { "Content-Type": "application/json" },
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    };
    fetchData();
  });
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
        <label htmlFor="Login">Login</label>
      </div>
      <div className="form-group">
        <label htmlFor="Username">Username</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>
      <div className="form-group">
        <small>
          <a href="/Register" style={{ textDecoration: "none" }}>
            New User? Register
          </a>
        </small>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default LogInPage;
