import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MainPage from "./MainPage";

const Home = () => {
  const { id } = useParams();
  const isLogged = useSelector((state) => {
    return state.isLogged;
  });
  return (
    <div>
      {isLogged ? <MainPage id={id}></MainPage> : "Page does not exist"}
    </div>
  );
};

export default Home;
