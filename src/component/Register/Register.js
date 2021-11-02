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

  const [percentage, setPercentage] = useState(0);

  const [agree, setAgree] = useState(false);

  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const saveFile = URL.createObjectURL(file);
    setImage(saveFile);

    const fileRef = await app.storage().ref();
    const storageRef = fileRef.child("userImage/" + file.name).put(file);

    storageRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const count = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentage(count);
        console.log(count);
      },
      (err) => console.log(err),
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((URL) => {
          setAvatar(URL);
          console.log(URL);
        });
      }
    );
  };

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
            avatar: avatar ? avatar : userName.charAt(0),
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
          {percentage > 0 && percentage <= 99.99 ? (
            <div>Loading.....</div>
          ) : null}
          <Image src={image} />
          <ImageLabel htmlFor="Pix"> Upload your Image </ImageLabel>
          <ImageInput type="file" id="Pix" onChange={uploadImage} />

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
          <input
            type="checkbox"
            value={agree}
            onChange={(e) => {
              setAgree(true);
            }}
          />
          <Button
            onClick={() => {
              console.log(agree);
            }}
            disabled={!agree}
          >
            Sign Up
          </Button>
          <Text>
            or sign up with <span onClick={signUpWithGoogle}>Google</span>
          </Text>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Register;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  background-color: red;
`;
const ImageLabel = styled.label`
  padding: 10px 20px;
  border-radius: 30px;
  background-color: coral;
  color: white;
  margin: 20px 0;
  cursor: pointer;
  font-weight: bold;
  transition: all 350ms;
  transform: scale(1);

  :hover {
    transform: scale(0.97);
  }
`;
const ImageInput = styled.input`
  display: none;
`;

const Text = styled.div`
  span {
    color: red;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Button = styled.button`
  outline: none;
  border: 0;
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
