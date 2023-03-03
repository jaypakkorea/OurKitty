import styled from 'styled-components'
import { WifiOutlined } from '@ant-design/icons';


function AdminHome() {
  return (
    <Container>
      <TitleDiv>
        관리자 인증 절차
      </TitleDiv>
      <SubDiv>
        1. <span style={{ marginLeft: "0.5rem" }}>회원가입을 한다</span>
      </SubDiv>
      <SubDiv>
        2. <span style={{ marginLeft: "0.5rem" }}> 시스템 관리자에게 승인을 요청 후  </span>
        <div style={{ marginLeft: "1.5rem" }}>기다린다.</div>
      </SubDiv>
      <SubDiv>
        3.  <span style={{ marginLeft: "0.5rem" }}>시스템 관리자의 인증을 받으면</span>
        <br />  <div style={{ marginLeft: "1.5rem" }}>
          관리자 권한 사용이 가능하다.</div>
      </SubDiv>
      <TitleDivMid>
        관리자 인증 절차
      </TitleDivMid>
      <SubDiv>
        1.  <span style={{ marginLeft: "0.5rem" }}>설치 장소로 이동해 IOT 기기를 켠다.</span>
      </SubDiv>
      <SubDiv>
        2. <span style={{ marginLeft: "0.5rem" }}> 등록(<WifiOutlined style={{ padding: "0.2rem", verticalAlign: 'initial' }} />) 탭을 클릭한다. </span>
      </SubDiv>
      <SubDiv>
        3. <span style={{ marginLeft: "0.5rem" }}>시리얼 번호와 급식소 이름 및 </span>
        <div style={{ marginLeft: "1.5rem" }}>비고 정보를 입력한다.</div>
      </SubDiv>
      <SubDiv>
        4.  <span style={{ marginLeft: "0.5rem" }}>설치 위치를 확인 후 </span>
        <div style={{ marginLeft: "1.5rem" }}>해당 급식소의 사진을 촬영하면</div>
      </SubDiv>
      <SubDivFinal>
        5.  <span style={{ marginLeft: "0.5rem" }}>냥그릇 등록 완료! </span>
      </SubDivFinal>
      <div style={{ marginBottom: "8rem" }} />

    </Container>
  );
}

export default AdminHome;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: auto;
    background-color: ${(props) => props.theme.colors.lightPink};
    ::-webkit-scrollbar {
        display: none;
    }
    padding: 60px;
    @media ${(props) => props.theme.mobile} {
    width: 100vw;
    height: 100%;
  }
`;

const TitleDiv = styled.div`
  font-size: 1.5rem;
  margin-top: 2rem;
`;

const TitleDivMid = styled.div`
  font-size: 1.5rem;
  margin-top: 3rem;
`;


const SubDiv = styled.div`
  margin-left: 2rem;
  margin-top: 1rem;
`;

const SubDivFinal = styled.div`
  margin-left: 2rem;
  margin-top: 1rem;
  margin-bottom : 3rem;
`;

