// @flow
import { useState } from "react";
import Layout from "Component/Layout/Layout";
import Header from 'Component/Header'
import TabDiv from './TabDiv'
import { InfiniteScrollIot } from "../../Component/InfiniteScrollIot";
import styled from "styled-components";


function MapDish2() {

  const url = window.location.href.split("/");
  const dishId: number = Number(url[url.length - 2])
  const [width, setWidth] = useState('32%');


  return (
    <>
      <Header />
      <TabDiv dishId={dishId} />
      <Layout>
        {width === '32%' ? <Sbutton onClick={() => setWidth('50%')}>크게보기</Sbutton> : <Sbutton onClick={() => setWidth('32%')}>작게보기</Sbutton>}
        <InfiniteScrollIot dishId={dishId} width={width} />
      </Layout>
    </>
  );
};
export default MapDish2;

const Sbutton = styled.div`
  margin-top: -10px;
  cursor: pointer;
  border: 1px solid gray;
  padding: 0.5rem 1rem;
  margin-left: 70%;
  border-radius: 5px;
  :hover{
    border: 2px solid gray;

  }
`
