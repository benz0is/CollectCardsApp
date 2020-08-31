import React from "react";
import { useHistory } from "react-router-dom";

const RegisterPage = () => {
  let history = useHistory();
  return (
    <form
      className="container p-4"
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
        <input type="text" className="form-control" placeholder="Username" />
      </div>
      <div className="form-group">
        <label htmlFor="Username">Password</label>
        <input type="text" className="form-control" placeholder="Password" />
      </div>
      <input type="button" className="btn btn-primary" value="Register" />
    </form>
  );
};

export default RegisterPage;
