import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import {
  BsFillBookmarkCheckFill,
  BsFillBookmarkDashFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import { app } from "./../../base";
import MyTaskBut from "./MyTaskBut";
import { AuthContext } from "./../../Global/AuthProvider";

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const getData = async () => {
    await app
      .firestore()
      .collection("myTask")
      .doc(currentUser.uid)
      .collection("task")
      .onSnapshot((snapshot) => {
        const r = [];
        snapshot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setData(r);
      });
  };

  const getSingle = async () => {
    await app
      .firestore()
      .collection("myUserData")
      .doc(currentUser.uid)
      .get()
      .then((user) => {
        setUserData(user.data());
      });
  };

  useEffect(() => {
    getData();
    getSingle();
  }, [userData]);

  return (
    <Container>
      <Wrapper>
        <h2> Welcome back, {userData?.userName} </h2>
        {data.length === 0 ? (
          <div>Post Your First Task </div>
        ) : (
          data?.map((props) => (
            <Card key={props.id}>
              <Checker>
                {props.done ? (
                  <Icon>
                    <BsFillBookmarkCheckFill />
                  </Icon>
                ) : (
                  <Icon>
                    <BsFillBookmarkDashFill />
                  </Icon>
                )}
              </Checker>
              <Text>{props.task}</Text>

              <MyTaskBut myId={props.id} />
            </Card>
          ))
        )}
      </Wrapper>
    </Container>
  );
};

export default HomeScreen;

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

const Text = styled.div`
  margin-left: 20px;
  font-weight: bold;
  font-size: 25px;
  flex: 1;
`;
const Icon = styled.div``;

const Checker = styled.div`
  font-size: 35px;
  display: flex;
  height: 100%;
  align-items: center;
  margin-left: 10px;
`;

const Card = styled.div`
  margin: 10px 0;
  width: 80%;
  background-color: white;
  border-radius: 5px;
  height: 100px;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #e0e0e0;
  padding-top: 150px;
`;
