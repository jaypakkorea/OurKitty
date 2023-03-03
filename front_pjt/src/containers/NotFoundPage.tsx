import Layout from "../Component/Layout/Layout";
import styled from "styled-components";
import Original from "../assets/images/original.gif"
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Layout>
      <ContentDiv>
        페이지를 찾을 수 없습니다.
        <img src={Original} />
      </ContentDiv>
      <LinkDiv>
        <Link to={""}>홈으로 이동</Link>
      </LinkDiv>
    </Layout>
  );
}

export default NotFoundPage;

const ContentDiv = styled.div`
  width: 100%;
  text-align: center;
  
  margin-top: 10rem;
  
  font-size: 1.5rem;
  
  img{
    width: 100%;
  }
`

const LinkDiv = styled.div`
  width: 100%;
  text-align: center;
`
