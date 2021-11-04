import React, { useState } from "react";
import styled from "styled-components";
import { app } from "./../../base";
import firebase from "firebase";

const Register = () => {
  const [toggle, setToggle] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState("");

  const [dataUploaded, setDataUploaded] = useState(0);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const saveFile = URL.createObjectURL(file);
    setImage(saveFile);

    const fileRef = await app.storage().ref();
    const storageRef = fileRef.child("userSignedImage/" + file.name).put(file);
    storageRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const countIt = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setDataUploaded(countIt);
        console.log(countIt);
      },
      (error) => console.log(error.message),
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((URL) => {
          setAvatar(URL);
          console.log(URL);
        });
      }
    );
  };

  const onToggle = () => {
    setToggle(!toggle);
  };

  const signUp = async () => {
    const userData = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (userData) {
      await app
        .firestore()
        .collection("userDataOfSigned")
        .doc(userData.user.uid)
        .set({
          avatar,
          userName,
          email,
        });
    }
  };

  const signIn = async () => {
    await app.auth().signInWithEmailAndPassword(email, password);
  };

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const userData = await app.auth().signInWithPopup(provider);

    if (userData) {
      await app
        .firestore()
        .collection("userDataOfSigned")
        .doc(userData.user.uid)
        .set({
          avatar: userData.user.photoURL,
          userName: userData.user.displayName,
          email: userData.user.email,
        });
    }
  };

  return (
    <Container>
      {toggle ? (
        <Wrapper>
          <Text>
            Already have an Account,{" "}
            <span
              onClick={() => {
                onToggle();
              }}
            >
              Sign In Here
            </span>
          </Text>
          <Card>
            <Image src={image} />
            <ImageLabel htmlFor="pix">Upload Your Image </ImageLabel>
            <ImageInput type="file" id="pix" onChange={uploadImage} />

            <InputHolder>
              <Label>User Name</Label>
              <Input
                placeholder="Enter User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </InputHolder>
            <InputHolder>
              <Label>User Email</Label>
              <Input
                placeholder="Enter User Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputHolder>
            <InputHolder>
              <Label>User Password</Label>
              <Input
                placeholder="Enter User Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputHolder>

            <Button onClick={signUp}>Sign Up</Button>

            <Text>
              Or sign up with <span onClick={signInWithGoogle}>Google</span>
            </Text>
          </Card>
        </Wrapper>
      ) : (
        <Wrapper>
          <Text>
            Don't have an Account,{" "}
            <span
              onClick={() => {
                onToggle();
              }}
            >
              Sign Up Here
            </span>
          </Text>
          <Card>
            <InputHolder>
              <Label>User Email</Label>
              <Input
                placeholder="Enter User Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputHolder>
            <InputHolder>
              <Label>User Password</Label>
              <Input
                placeholder="Enter User Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputHolder>

            <Button onClick={signIn}>Sign In</Button>

            <Text>
              Or sign up with <span onClick={signInWithGoogle}>Google</span>
            </Text>
          </Card>
        </Wrapper>
      )}
    </Container>
  );
};

export default Register;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  padding: 20px;
  background-color: #004080;
  color: white;
  border-radius: 3px;
  font-weight: bold;
  transition: all 350ms;
  transform: scale(1);
  margin-top: 30px;

  :hover {
    transform: scale(0.97);
    cursor: pointer;
  }
`;
const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
  color: #004080;
`;
const Input = styled.input`
  width: 300px;
  height: 40px;
  outline: none;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding-left: 10px;
  margin-bottom: 20px;
`;

const InputHolder = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 200px;
  height: 150px;
  border-radius: 5px;
  object-fit: cover;
`;
const ImageLabel = styled.label`
  padding: 10px 20px;
  background-color: #004080;
  border-radius: 30px;
  color: white;
  margin: 20px 0;
  transform: scale(1);
  transition: all 350ms;
  margin-bottom: 40px;

  :hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const Card = styled.div`
  padding: 20px 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 50%;
  min-height: 500px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #004080;
  margin: 20px 0;

  span {
    color: red;
    cursor: pointer;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Wrapper = styled.div`
  padding-top: 100px;
  width: 100%;
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
`;
