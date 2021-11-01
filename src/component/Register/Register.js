import React, { useState } from "react";
import styled from "styled-components";
import { app } from "./../../base";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const [error, setError] = useState("");

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      const userData = await app
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (userData) {
        await app
          .firestore()
          .collection("myUserData")
          .doc(userData.user.uid)
          .set({
            userName,
            email,
            password,
            avatar: userName.charAt(0),
          });
      }

      setPassword("");
      setUserName("");
      setEmail("");

      history.push("/");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const signUpWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const userData = await app.auth().signInWithPopup(provider);
    history.push("/");

    if (userData) {
      await app
        .firestore()
        .collection("myUserData")
        .doc(userData.user.uid)
        .set({
          userName: userData.user.displayName,
          email: userData.user.email,
          avatar: userData.user.photoURL,
        });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Card>
          <Input
            placeholder="Enter a new UserName"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <Input
            placeholder="Enter a new Email"
            // type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            placeholder="Enter a new Password"
            // type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div> {error} </div>
          <Button onClick={signUp}>Sign Up</Button>
          <Text>
            or sign up with <span onClick={signUpWithGoogle}>Google</span>
          </Text>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Register;

const Text = styled.div`
  span {
    color: red;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Button = styled.div`
  width: 60%;
  height: 50px;
  border-radius: 5px;
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: red;
  margin: 30px auto;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
  margin: 5px 0;
  padding-left: 5px;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #e0e0e0;
  padding-top: 150px;
`;
