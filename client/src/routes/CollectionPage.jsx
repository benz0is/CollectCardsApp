import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import background from "../images/background.jpg";
import "./app.css";

const Players = [
  "giannis",
  "jonas",
  "jordan",
  "kevin durant",
  "kyrie",
  "kobe",
  "lebron james",
  "luka",
  "simmons",
  "steph curry",
];
const PlayersBoosted = [
  "giannis",
  "jonas",
  "jordan",
  "kevin durant",
  "kyrie",
  "kobe",
  "kobe",
  "kobe",
  "lebron james",
  "lebron james",
  "lebron james",
  "luka",
  "simmons",
  "steph curry",
];

const AllCards = [
  "https://i.ibb.co/h2ttg35/giannis.jpg",
  "https://i.ibb.co/RjrT21F/jonas.jpg",
  "https://i.ibb.co/Y8YjLdW/jordan.jpg",
  "https://i.ibb.co/3WxCfY6/kevin-durant.jpg",
  "https://i.ibb.co/X7g6nzd/kyrie.jpg",
  "https://i.ibb.co/9TR0YjW/kobe.jpg",
  "https://i.ibb.co/bdWR2QW/lebron-james.jpg",
  "https://i.ibb.co/q1jQ739/luka.jpg",
  "https://i.ibb.co/q1ZhBzf/simmons.jpg",
  "https://i.ibb.co/K7q2CbX/steph-curry.jpg",
];

const AllCardsBoosted = [
  "https://i.ibb.co/h2ttg35/giannis.jpg",
  "https://i.ibb.co/RjrT21F/jonas.jpg",
  "https://i.ibb.co/Y8YjLdW/jordan.jpg",
  "https://i.ibb.co/3WxCfY6/kevin-durant.jpg",
  "https://i.ibb.co/X7g6nzd/kyrie.jpg",
  "https://i.ibb.co/9TR0YjW/kobe.jpg",
  "https://i.ibb.co/9TR0YjW/kobe.jpg",
  "https://i.ibb.co/9TR0YjW/kobe.jpg",
  "https://i.ibb.co/bdWR2QW/lebron-james.jpg",
  "https://i.ibb.co/bdWR2QW/lebron-james.jpg",
  "https://i.ibb.co/bdWR2QW/lebron-james.jpg",
  "https://i.ibb.co/q1jQ739/luka.jpg",
  "https://i.ibb.co/q1ZhBzf/simmons.jpg",
  "https://i.ibb.co/K7q2CbX/steph-curry.jpg",
];

const CollectionPage = (props) => {
  const [balance, setBalance] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [cards, setCards] = useState();
  const [picture, setPicture] = useState();

  useEffect(() => {
    setBalance(sessionStorage.getItem("balance"));
    setPicture(sessionStorage.getItem("picture"));
  });
  const { id } = useParams();
  useEffect(() => {
    setCurrentUser(sessionStorage.getItem("username"));
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query{returnCards(ref_id:"${id}") {
            id
          cards
        }}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setCards(res));
    };
    fetchData();
    const fetchBalance = async () => {
      const response = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query{userBalance(id:"${id}") {
            balance
        }}`,
        }),
      })
        .then((res) => res.json())
        .then((res) =>
          sessionStorage.setItem("balance", res.data.userBalance[0].balance)
        );
    };
    fetchBalance();
  });
  //e
  const handleRegularSubmit = async (e) => {
    e.preventDefault();
    if (balance - 500 < 0) {
      alert("Balance is too low");
      return;
    }
    const number = Math.floor(Math.random() * 10);
    const card = AllCards[number];
    const player = Players[number];

    alert(`You just received ${player}`);
    const response = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{AddPost(ref_id:"${id}" username:"${currentUser}" picture:"${picture}" post:"I just received:${player}" cards:"${card}"date:"${new Date()
          .toISOString()
          .slice(0, 10)}") {
          id
        }}`,
      }),
    });
    const secondRes = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{UpdateBalance(id:"${id}" balance:"${balance - 500}") {
          id
        }}`,
      }),
    });
  };
  const handleBoostedSubmit = async (e) => {
    e.preventDefault();
    if (balance - 1500 <= 0) {
      alert("Balance is too low");
      return;
    }
    const number = Math.floor(Math.random() * 14);
    const card = AllCardsBoosted[number];
    const player = Players[number];
    alert(`You just received ${player}`);
    const response = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{AddPost(ref_id:"${id}" username:"${currentUser}" picture:"${picture}" post:"I just received:${player}" cards:"${card}"date:"${new Date()
          .toISOString()
          .slice(0, 10)}") {
          id
        }}`,
      }),
    });
    const secondRes = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{UpdateBalance(id:"${id}" balance:"${balance - 1500}") {
          id
        }}`,
      }),
    });
  };
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
          <ul
            className="nav justify-content-center"
            style={{ borderBottom: "solid 1px red" }}
          >
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
              <div className="card-body">
                <div className="card-text mt-2"> Balance:{balance}</div>
              </div>
              <div className="card">
                <div className="card-header">
                  500${" "}
                  <button
                    type="button"
                    className="m-2 btn-warning"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="1 in 10 chance to get a rare!"
                    onClick={(e) => handleRegularSubmit(e)}
                  >
                    Buy Cheap Pack
                  </button>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  1500${" "}
                  <button
                    type="button"
                    className="m-2 btn-danger"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="4 in 10 chance to get a rare!"
                    onClick={(e) => handleBoostedSubmit(e)}
                  >
                    Buy Premium Pack
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col overflow-auto"
            style={{
              backgroundImage: "linear-gradient(red,transparent)",
              height: "400px",
            }}
          >
            <div className="text-center">
              <h1 style={{ color: "white" }}>My Collection:</h1>
            </div>
            <div className="row row-cols-3 ">
              {cards !== undefined &&
                cards.data.returnCards.map((res) =>
                  res.cards !== null ? (
                    <div key={res.id} className="m-3">
                      <div className="card bg-primary m-3 container">
                        <img src={res.cards} alt="Player card" />
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
    </div>
  );
};

export default CollectionPage;
