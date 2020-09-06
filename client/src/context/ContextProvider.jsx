import React from "react";
import { createContext } from "react";
import { useState } from "react";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [currentUser, setCurrentUser] = useState();

  return (
    <Context.Provider
      value={{
        username,
        setUsername,
        password,
        setPassword,
        currentUser,
        setCurrentUser,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
