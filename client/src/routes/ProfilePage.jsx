import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import background from "../images/background.jpg";
import "./app.css";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { sign_in } from "../actions/index";
import { useHistory } from "react-router-dom";

const ProfilePage = (props) => {
  let history = useHistory();
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [userPosts, setUserPosts] = useState();
  const [picture, setPicture] = useState();
  const [firstPw, setFirstPw] = useState();
  const [secPw, setSecPw] = useState();
  useEffect(() => {
    setPicture(sessionStorage.getItem("picture"));
  }, []);
  const dispatch = useDispatch();

  const handleCloseProfile = () => setShowProfile(false);
  const handleShowProfile = () => setShowProfile(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpdate = async (e) => {
    const response = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{AddPicture(ref_id:"${id}" picture:"${picture}" )
      {
        id
      }}`,
      }),
    })
    sessionStorage.setItem("picture", picture);
    handleCloseProfile();
    const secRes = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{AddPictureToUser(id:"${id}" picture:"${picture}" )
      {
        id
      }}`,
      }),
    });
  };
  useEffect(() => {
    setCurrentUser(sessionStorage.getItem("username"));
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query{accountPosts(ref_id:"${id}")
        {
          id
          post
          date
        }}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setUserPosts(res));
    };
    fetchData();
  }, []);
  const handleSubmit = async () => {
    if (firstPw === secPw) {
      const response = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `mutation{UpdatePassword(id:"${id}" password:"${firstPw}")
      {
        id
      }}`,
        }),
      });
      handleClose();
      alert("Password changes successfully");
    } else alert("Passwords must match");
  };

  const userImg =
    "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png";

  const selectUserImg = [
    "https://image.flaticon.com/icons/svg/1134/1134783.svg",
    "https://image.flaticon.com/icons/svg/1134/1134778.svg",
    "https://image.flaticon.com/icons/svg/1134/1134776.svg",
    "https://image.flaticon.com/icons/svg/1134/1134767.svg",
    "https://image.flaticon.com/icons/svg/1134/1134781.svg",
    "https://image.flaticon.com/icons/svg/1134/1134773.svg",
    "https://image.flaticon.com/icons/svg/1134/1134768.svg",
    "https://image.flaticon.com/icons/svg/1134/1134769.svg",
  ];
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: "100vh",
        width: "1000",
        backgroundSize: "cover",
      }}
    >
      <div className="container">
        <div className=" bg-danger" style={{ height: "100px" }}></div>

        <div>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <a
                className="nav-link active text-white "
                href={`/Home/${id}`}
                style={{ fontSize: "25px" }}
              >
                Home Page
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white"
                href={`/Collection/${id}`}
                style={{ fontSize: "25px" }}
              >
                Collection
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white"
                href={`/Profile/${id}`}
                style={{ fontSize: "25px" }}
              >
                Profile Page
              </a>
            </li>
          </ul>
        </div>
        <div className="row p-0 m-0" style={{ height: "400px" }}>
          <div
            className="col-4 "
            style={{ backgroundImage: "linear-gradient(blue,transparent)" }}
          >
            <div className="card m-4 ">
              <div
                className="card-body mask p-0 m-0"
                style={{ maxWidth: "100px", borderRadius: "50%" }}
                onClick={handleShowProfile}
              >
                <img
                  src={picture}
                  alt="User pic"
                  className="p-0 m-0 card-body "
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <Modal show={showProfile} onHide={handleCloseProfile}>
                <Modal.Header closeButton>
                  <Modal.Title>Change Profile Picture</Modal.Title>
                </Modal.Header>
                <div>
                  {selectUserImg.map((res) => {
                    return (
                      <img
                        alt="User pic"
                        className="m-2 foto"
                        src={res}
                        style={{ height: "100px", width: "100px" }}
                        onClick={(e) => {
                          setPicture(e.target.src);
                          e.target.style.border = " 1px solid black";
                        }}
                        value={res}
                        key={Math.random()}
                      ></img>
                    );
                  })}
                </div>
                <Modal.Footer>
                  <button
                    className="btn btn-danger"
                    onClick={handleCloseProfile}
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      handleUpdate();
                    }}
                  >
                    Save Changes
                  </button>
                </Modal.Footer>
              </Modal>

              <div className="card-body">
                <div className="card-title ">Hello {currentUser}</div>
                <div className="card-text mt-2">
                  <button
                    className="btn btn-primary
                  "
                    onClick={(e) => {
                      handleShow();
                    }}
                  >
                    Change Password
                  </button>
                  <button
                    className="btn btn-danger
                  "
                    onClick={() => {
                      history.push("/");
                      dispatch(sign_in());
                    }}
                  >
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <form className="container">
              <div className="form-group">
                <label htmlFor="password" className="form-text">
                  New password
                </label>
                <input
                  type="password"
                  onChange={(e) => setFirstPw(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-text">
                  Repeat new password
                </label>
                <input
                  type="password"
                  onChange={(e) => setSecPw(e.target.value)}
                />
              </div>
            </form>
            <Modal.Footer>
              <button className="btn btn-danger" onClick={handleClose}>
                Close
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Save Changes
              </button>
            </Modal.Footer>
          </Modal>
          <div
            className="col overflow-auto"
            style={{
              backgroundImage: "linear-gradient(red,transparent)",
              height: "400px",
            }}
          >
            {" "}
            <div className="text-center">
              <h1 style={{ color: "white" }}>Recent Posts:</h1>
            </div>
            {userPosts !== undefined &&
              userPosts.data.accountPosts.map((res) =>
                res.post !== null ? (
                  <div key={res.id} className="card m-4">
                    <div className="card-body m-2 p-0">
                      <p className="card-header">{res.date}</p>
                      <p className="card-text">{res.post}</p>
                    </div>
                  </div>
                ) : (
                  console.log()
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
