import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { HomeOutlined, CompassOutlined, SmileOutlined, CommentOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components'

function UserFooter() {
  return (
    <Container>
      <MenuDiv to="/">
        <HomeOutlined />
        <IconText>홈</IconText>
      </MenuDiv>
      <MenuDiv to="/map">
        <CompassOutlined />
        <IconText>지도</IconText>
      </MenuDiv>
      <MenuDiv to="/notice">
        <SmileOutlined />
        <IconText>해피 투게더</IconText>
      </MenuDiv>
      {localStorage.getItem('token') ?
        <MenuDiv to="/user">
          <UserOutlined />
          <IconText>내 정보</IconText>
        </MenuDiv>
        :
        <MenuDiv to="/user/login">
          <UserOutlined />
          <IconText>로그인</IconText>
        </MenuDiv>
      }
    </Container>
  );
}

export default UserFooter;

const Container = styled.div`
    width: 410px;
    height: 60px;
    display: flex;
    position: fixed;
    bottom: 0;
    z-index: 10;
    @media ${(props) => props.theme.mobile} {
      width: 100%;
    }
`;

const IconText = styled.div`
font-size: 0.8rem;
`;
const MenuDiv = styled(NavLink)`
width: 25%;
height: 100%;
text-align: center;
background:white;
padding-top: 5px;
&.active{
  font-weight: bold;
  background:${(props) => props.theme.colors.lightPink};
  font-size: 1.2rem;
  padding-top: 4px;
}
:hover {
    color:${(props) => props.theme.colors.hotPink};
    font-weight: bold;
}
`;