import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { app } from "./../../base";
import { AuthContext } from "./../../Global/AuthProvider";

const MyTaskBut = ({ myId }) => {
  const { mgs } = useContext(AuthContext);

  const getDataUpdate = async (myId) => {
    await app.firestore().collection("myTask").doc(myId).update({
      done: true,
    });
  };

  useEffect(() => {
    // getDataUpdate(myId);
  }, []);

  return (
    <Button
      onClick={() => {
        getDataUpdate(myId);
        console.log("Heelooooo ID: ", myId);
      }}
    >
      <Icon>
        <BsFillCheckCircleFill />
      </Icon>
    </Button>
  );
};

export default MyTaskBut;
const Icon = styled.div``;
const Button = styled.div`
  display: flex;
  color: green;
  align-items: center;
  margin: 0 10px;
  padding: 10px 20px;
  border-radius: 5px;
  transition: all 350ms;
  font-size: 30px;

  :hover {
    /* background-color: rgba(0, 0, 0, 0.6); */
    cursor: pointer;
  }
`;
