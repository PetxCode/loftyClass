import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { app } from "./../base";

const HomePage = () => {
  const [allData, setAllData] = useState([]);

  const getData = async () => {
    await app
      .firestore()
      .collection("vendor")
      .onSnapshot((snapshot) => {
        const r = [];
        snapshot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setAllData(r);
      });
  };

  useEffect(() => {
    getData();
    console.log("Data: ", allData);
  });
  return (
    <Container>
      <Wrapper>
        <CardHover>
          <Image />
          <Content>
            <Text>text</Text>
            <Others>Others</Others>
          </Content>
        </CardHover>
      </Wrapper>
    </Container>
  );
};

export default HomePage;

const Image = styled.img`
  width: 100%;
  height: 60%;
  background-color: coral;
`;
const Content = styled.div`
  padding: 20px 10px;
`;
const Text = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 20px;
`;
const Others = styled.div``;
const CardHover = styled.div`
  width: 350px;
  height: 350px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  border-radius: 5px;
  overflow: hidden;
`;

const Wrapper = styled.div`
  padding-top: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Container = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;
