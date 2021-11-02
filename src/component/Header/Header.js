import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AiFillHome } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AuthContext } from "./../../Global/AuthProvider";
import { app } from "./../../base";

export const Header = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const [userData, setUserData] = useState({});

  const getUser = async () => {
    await app
      .firestore()
      .collection("myUserData")
      .doc(currentUser?.uid)
      .get()
      .then((user) => {
        setUserData(user.data());
      });
  };

  React.useEffect(() => {
    getUser();
    console.log("This is User", userData);
  }, [userData]);

  return (
    <Container>
      <Wrapper>
        <Logo />

        <Navigation>
          <NavHolder to="/">
            <Icon>
              <AiFillHome />
            </Icon>
            <Nav>Home</Nav>
          </NavHolder>

          {currentUser ? (
            <NavHolder to="/task">
              <Icon>
                <FaTasks />
              </Icon>
              <Nav>Create a Task</Nav>
            </NavHolder>
          ) : null}
        </Navigation>

        <Register>
          {currentUser ? (
            <div>
              <Logo src={userData?.avatar} />
              <div>{userData?.userName} </div>
            </div>
          ) : null}

          {currentUser ? (
            <NavHolder1
              onClick={() => {
                app.auth().signOut();
              }}
            >
              <Icon>
                <BiLogIn />
              </Icon>
              <Nav>Log Out</Nav>
            </NavHolder1>
          ) : (
            <NavHolder to="/register">
              <Icon>
                <BiLogIn />
              </Icon>
              <Nav>Log In</Nav>
            </NavHolder>
          )}
        </Register>
      </Wrapper>
    </Container>
  );
};

const Register = styled.div`
  display: flex;
`;

const NavHolder1 = styled.div`
  text-decoration: none;

  display: flex;
  color: white;
  align-items: center;
  margin: 0 10px;
  padding: 10px 20px;
  border-radius: 5px;
  transition: all 350ms;

  :hover {
    background-color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
  }
`;
const NavHolder = styled(Link)`
  text-decoration: none;

  display: flex;
  color: white;
  align-items: center;
  margin: 0 10px;
  padding: 10px 20px;
  border-radius: 5px;
  transition: all 350ms;

  :hover {
    background-color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
  }
`;
const Icon = styled.div`
  font-size: 25px;
  margin-top: 5px;
  margin-right: 5px;
`;
const Nav = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
`;

const Navigation = styled.div`
  display: flex;
  flex: 1;
`;

const Logo = styled.img`
  margin: 0 50px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: white;
  object-fit: cover;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  flex-direction: row;
`;
const Container = styled.div`
  width: 100%;
  height: 80px;
  background: red;
`;
