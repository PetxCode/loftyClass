import React, { useContext } from "react";
import styled from "styled-components";
import { AiFillSetting, AiFillHome } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiFamilyHouse } from "react-icons/gi";
import { AuthContext } from "./../Global/AuthProvider";
import { Link } from "react-router-dom";
import { app } from "./../base";

const ProjectHeader = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Container>
      <Wrapper>
        <Logo />

        <Navigation>
          <Nav to="/">
            <Icon>
              <AiFillHome />
            </Icon>
            <span>Home</span>
          </Nav>
          <Nav to="/">
            <Icon>
              <BsFillPeopleFill />
            </Icon>
            <span>People</span>
          </Nav>
          <Nav to="/">
            <Icon>
              <GiFamilyHouse />
            </Icon>
            <span>Rent</span>
          </Nav>
          {currentUser ? (
            <Nav to="/setting">
              <Icon>
                <AiFillSetting />
              </Icon>
              <span>Settings</span>
            </Nav>
          ) : null}
        </Navigation>

        <Space />

        {currentUser ? (
          <Create>
            <Button
              onClick={() => {
                app.auth().signOut();
              }}
            >
              Log Out
            </Button>
          </Create>
        ) : (
          <Create>
            <Nav to="/register">Create an Account</Nav>
          </Create>
        )}
      </Wrapper>
    </Container>
  );
};

export default ProjectHeader;

const Space = styled.div`
  flex: 1;
`;
const Create = styled.div`
  margin-right: 20px;
`;
const Button = styled.div`
  padding: 20px;
  background-color: white;
  color: #004080;
  border-radius: 3px;
  font-weight: bold;
  transition: all 350ms;
  transform: scale(1);

  :hover {
    transform: scale(0.97);
    cursor: pointer;
  }
`;

const Logo = styled.img`
  margin: 0 20px;
  width: 100px;
  border-radius: 5px;
  height: 50px;
  background-color: white;
`;

const Navigation = styled.div`
  display: flex;
`;
const Nav = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  justify-content: center;
  border-radius: 3px;
  transition: all 350ms;
  margin: 0 10px;

  span {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 13px;
  }

  :hover {
    background-color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
  }
`;
const Icon = styled.div`
  margin-right: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 100px;
  background-color: #004080;
  color: white;
`;

// <Text>
// Already have an Account,{" "}
// <span
//   onClick={() => {
//     onToggle();
//   }}
// >
//   Sign In Here
// </span>
// </Text>
