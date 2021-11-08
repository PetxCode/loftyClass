import React, { useState, useContext } from "react";
import styled from "styled-components";
import { app } from "./../../base";
import firebase from "firebase";
import { AuthContext } from "./../../Global/AuthProvider";
import { useNavigate } from "react-router-dom";

const Vendor = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const [toggle, setToggle] = useState(false);

  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState("");

  const [image1, setImage1] = useState("");
  const [avatar1, setAvatar1] = useState("");

  const [image2, setImage2] = useState("");
  const [avatar2, setAvatar2] = useState("");

  const [image3, setImage3] = useState("");
  const [avatar3, setAvatar3] = useState("");

  const [dataUploaded, setDataUploaded] = useState(0);
  const [dataUploaded1, setDataUploaded1] = useState(0);
  const [dataUploaded2, setDataUploaded2] = useState(0);
  const [dataUploaded3, setDataUploaded3] = useState(0);

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

  const uploadImage1 = async (e) => {
    const file = e.target.files[0];
    const saveFile1 = URL.createObjectURL(file);
    setImage1(saveFile1);

    const fileRef = await app.storage().ref();
    const storageRef = fileRef.child("userSignedImage/" + file.name).put(file);
    storageRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const countIt = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setDataUploaded1(countIt);
        console.log(countIt);
      },
      (error) => console.log(error.message),
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((URL) => {
          setAvatar1(URL);
          console.log(URL);
        });
      }
    );
  };

  const uploadImage2 = async (e) => {
    const file = e.target.files[0];
    const saveFile = URL.createObjectURL(file);
    setImage2(saveFile);

    const fileRef = await app.storage().ref();
    const storageRef = fileRef.child("userSignedImage/" + file.name).put(file);

    storageRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const countIt = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setDataUploaded2(countIt);
        console.log(countIt);
      },
      (error) => console.log(error.message),
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((URL) => {
          setAvatar2(URL);
          console.log(URL);
        });
      }
    );
  };

  const uploadImage3 = async (e) => {
    const file = e.target.files[0];
    const saveFile = URL.createObjectURL(file);
    setImage3(saveFile);

    const fileRef = await app.storage().ref();
    const storageRef = fileRef.child("userSignedImage/" + file.name).put(file);
    storageRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const countIt = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setDataUploaded3(countIt);
        console.log(countIt);
      },
      (error) => console.log(error.message),
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((URL) => {
          setAvatar3(URL);
          console.log("avatar3: ", avatar3);
        });
      }
    );
  };

  const onToggle = () => {
    setToggle(!toggle);
  };

  const signUp = async () => {
    const userData = await app;

    if (userData) {
      await app
        .firestore()
        .collection("userDataOfSigned")
        .doc(userData.uid)
        .set({
          avatar,
        });
    }
  };

  const getUserData = async () => {
    await app
      .firestore()
      .collection("userDataOfSigned")
      .doc(currentUser.uid)
      .get()
      .then((profile) => {
        setUsers(profile.data());
        console.log(profile, users, currentUser.uid);
      });
  };

  const [userName, setUserName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [occupation, setOccupation] = useState("");
  const [address, setAddress] = useState("");

  const updateUserData = async () => {
    await app
      .firestore()
      .collection("userDataOfSigned")
      .doc(currentUser.uid)
      .update({
        location,
        address,
        userName,
        phone,
        occupation,
        service,
        avatar,
      });
  };

  const createVendor = async () => {
    await app
      .firestore()
      .collection("vendor")
      .doc(currentUser.uid)
      .collection("vendorSkill")
      .doc()
      .set({
        avatar,
        avatar1,
        avatar2,
        avatar3,
        userName,
        service,
        phone,
        occupation,
        location,
      });
    navigate("/");
  };

  const becomeVendor = async () => {
    await app.firestore().collection("becomeVendor").doc(currentUser.uid).set({
      createdBy: currentUser.uid,
    });
  };

  React.useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Text>
          Welcome {users?.userName}, it seems you want to do some update!
          {/* <span>Sign In Here</span> */}
        </Text>
        <Card>
          <ImageContainer>
            <ImageCont>
              <Image src={image} />
              <ImageLabel htmlFor="pix">Upload Your Image 1</ImageLabel>
              <ImageInput type="file" id="pix" onChange={uploadImage} />
            </ImageCont>
            <ImageCont>
              <Image src={image1} />
              <ImageLabel htmlFor="pix1">Upload Your Image 2</ImageLabel>
              <ImageInput type="file" id="pix1" onChange={uploadImage1} />
            </ImageCont>
            <ImageCont>
              <Image src={image2} />
              <ImageLabel htmlFor="pix2">Upload Your Image 3</ImageLabel>
              <ImageInput type="file" id="pix2" onChange={uploadImage2} />
            </ImageCont>
            <ImageCont>
              <Image src={image3} />
              <ImageLabel htmlFor="pix3">Upload Your Image 4</ImageLabel>
              <ImageInput type="file" id="pix3" onChange={uploadImage3} />
            </ImageCont>
          </ImageContainer>

          <InputHolder>
            <Label>User Name</Label>
            <Input
              placeholder={`${users?.userName}`}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </InputHolder>
          <InputHolder>
            <Label>User Location</Label>
            <Input
              placeholder="Enter User Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </InputHolder>
          <InputHolder>
            <Label>User Address</Label>
            <Input
              placeholder="Enter User Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </InputHolder>
          <InputHolder>
            <Label>User Phone</Label>
            <Input
              placeholder="Enter User Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputHolder>
          <InputHolder>
            <Label>Service</Label>

            <Choice
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <Option value="Prefer not to say">Prefer not to say </Option>
              <Option value="Fashion">Fashion</Option>
              <Option value="Event">Event</Option>
              <Option value="AutoMobile">AutoMobile </Option>
              <Option value="House Maintainance">House Maintainance</Option>
            </Choice>
          </InputHolder>
          <InputHolder>
            <Label>User Occupation</Label>
            <Input
              placeholder="Enter User Occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </InputHolder>

          <Button
            onClick={() => {
              createVendor();
              becomeVendor();
            }}
          >
            Apply for Vendor
          </Button>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Vendor;

const ImageCont = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Option = styled.option``;
const Choice = styled.select`
  width: 300px;
  height: 40px;
  outline: none;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding-left: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  color: #004080;
`;

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
