// @flow
import { useEffect, useState } from 'react';
import { LayoutFlex } from "Component/Layout/LayoutFlex";
import styled from "styled-components";
import Layout from "Component/Layout/Layout";
import Header from 'Component/Header'
import TabDiv from './TabDiv'
import { useNavigate } from 'react-router';
import { FormOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'
import { InfiniteScrollCommunity } from "../../Component/InfiniteScrollCommunity";


function MapDish3() {
  const [tag, setTag] = useState(0)
  const movePage = useNavigate();

  // 로그인 여부 확인
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    if (typeof localStorage.getItem('token') === 'string') {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const url = window.location.href.split("/");
  const dishId: number = Number(url[url.length - 2])

  function goCreate() {
    if (isLoggedIn) {
      movePage(`/map/dish/${dishId}/3/add`);
    } else {
      Swal.fire('로그인 해주세요~', '', 'error');
    }
  }

  const onClickTag = (tagId: number) => {
    setTag(tagId)
  }

  return (
    <Container>
      <Header />
      <TabDiv dishId={dishId} />
      <LayoutContainer>
        <LayoutFlex gap={"0.4rem"}>
          <TagButton onClick={() => onClickTag(0)} style={tag === 0 ? {
            background: '#D9D9D9',
            marginRight: "0.1rem"
          } : { background: '#F2F2F2' }}
          >전체</TagButton>
          <TagButton onClick={() => onClickTag(1)} style={tag === 1 ? {
            background: '#D9D9D9',
            marginRight: "0.1rem",
            marginLeft: "0.1rem"
          } : { background: '#F2F2F2' }}
          >찬반토론 </TagButton>
          <TagButton onClick={() => onClickTag(2)} style={tag === 2 ? {
            background: '#D9D9D9',
            marginRight: "0.1rem",
            marginLeft: "0.1rem"
          } : { background: '#F2F2F2' }}
          >자유 게시판 </TagButton>
          <TagButton onClick={() => onClickTag(3)} style={tag === 3 ? {
            background: '#D9D9D9',
            marginRight: "0.1rem"
          } : { background: '#F2F2F2' }}
          >고양이 자랑 </TagButton>
        </LayoutFlex>

        <InfiniteScrollCommunity type={"Dish"} dishId={dishId} tagId={tag} />

      </LayoutContainer>
      <CreateDiv onClick={goCreate}>
        글쓰러 가기
        <FormOutlined />
      </CreateDiv>
    </Container>
  );
};
export default MapDish3;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  margin-bottom: 100px;
  @media ${(props) => props.theme.mobile} {
    width: 100vw;
    height: 100vh;
  }
`;
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 16px;
  gap: 24px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${(props) => props.theme.colors.lightPink};
  ::-webkit-scrollbar {
      display: none;
  }
  @media ${(props) => props.theme.mobile} {
    /* width: 100vw; */
  }
`

const TagButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: 1px solid #D9D9D9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const CreateDiv = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 1.2rem;
  position: absolute;
  right: 1rem;
  bottom: 2rem;
  cursor: pointer;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 0.5rem 1rem;
 @media ${(props) => props.theme.mobile} {
    bottom: 20vh;
  }

`
