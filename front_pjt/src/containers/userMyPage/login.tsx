import React from 'react'
import Layout from "Component/Layout/Layout";
import styled from 'styled-components'

import googlelogin from "assets/images/google.png";
import naverlogin from "assets/images/naver.png";
import kakaologin from "assets/images/kakao.png";


const Login: React.FC = () => {


  return (
    <Layout>
      <LoginForm>
        <Title>
          로그인 <AndSpan> 및 </AndSpan> 회원가입
        </Title>
        <LoginButton>
          <a href='https://ourkitty.site/auth/oauth2/authorization/kakao'>
            <LoginButtonImg src={kakaologin} alt="카카오로 로그인" />
          </a>
        </LoginButton>
        <LoginButton>
          <a href='https://ourkitty.site/auth/oauth2/authorization/naver'>
            <LoginButtonImg src={naverlogin} alt="네이버로 로그인" />
          </a>
        </LoginButton>
        <LoginButton>
          <a href="https://ourkitty.site/auth/oauth2/authorization/google">
            <LoginButtonImg src={googlelogin} alt="구글로 로그인" />
          </a>
        </LoginButton>
      </LoginForm>
    </Layout>
  );
}

export default Login;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const Title = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 4rem;
`
const AndSpan = styled.span`
  font-size: 1rem;
  text-align: center;
  margin-bottom: 2rem;
  margin-right: 1rem;
  margin-left: 1rem;
`
const LoginButtonImg = styled.img`
  display: flex;

  ::-webkit-scrollbar {
    display: none;
  }
`;
const LoginButton = styled.div`
  height: 5%;
  margin: 0.8rem;
`