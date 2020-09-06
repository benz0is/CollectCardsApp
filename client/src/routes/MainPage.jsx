import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import background from "../images/background.jpg";
import "./app.css";

const MainPage = (props) => {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState();
  const [post, setPost] = useState();
  const [apiResponse, setApiResponse] = useState();
  const [api, setApi] = useState();
  const [picture, setPicture] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query
          {user {
            id
            picture
          }
        }`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setApi(res.data.user));
    };
    fetchData();
    setPicture(sessionStorage.getItem("picture"));
  }, []);
  useEffect(() => {
    setCurrentUser(sessionStorage.getItem("username"));
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query{userInfo {
            id
          ref_id
          username
          post
          picture
          date
        }}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setApiResponse(res));
    };

    fetchData();
  });
  //ee
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{AddPost(ref_id:"${id}" username:"${currentUser}" picture:"${picture}" post:"${post}" date:"${new Date()
          .toISOString()
          .slice(0, 10)}") {
          id
        }}`,
      }),
    }).then((res) => res.json());
    console.log(response);
    setPost("");
  };
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div className="container">
        <div className=" bg-danger" style={{ height: "100px" }}></div>

        <div>
          <ul
            className="nav justify-content-center"
            style={{ borderBottom: "solid 1px red" }}
          >
            <li className="nav-item">
              <a
                className="nav-link active text-white rgba-blue-grey-strong"
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
        <div className="d-flex justify-content-center">Hello</div>
        <div className="d-flex justify-content-center">
          <img
            src={picture}
            alt="User pic"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          ></img>
          <div className="form-group">
            <label htmlFor="Intro"></label>
            <textarea
              className="form-control"
              name=""
              id=""
              cols="30"
              rows="10"
              style={{
                width: "500px",
                maxHeight: "150px",
                minHeight: "50px",
              }}
              placeholder="Tell us what you think!"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            ></textarea>
            <button
              className="btn btn-primary mt-1"
              onClick={(e) => {
                if (post !== undefined) {
                  handleSubmit(e);
                } else alert("Cant post empty post");
              }}
            >
              Post
            </button>
          </div>
        </div>

        {apiResponse !== undefined &&
          apiResponse.data.userInfo.map((res) => {
            return (
              <div className="d-flex justify-content-center mt-3" key={res.id}>
                <div>
                  <img
                    src={res.picture}
                    alt="User pic"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  ></img>
                  <div className="card mt-3">
                    <div className="card-header row" style={{ width: "500px" }}>
                      <div className="col text-left">
                        {res.username} has posted:
                      </div>

                      <div className=" col text-right">{res.date}</div>
                    </div>
                    <div className="container card-text m-3">{res.post}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MainPage;
