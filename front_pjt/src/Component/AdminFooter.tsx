import { NavLink } from 'react-router-dom'
import { HomeOutlined, WifiOutlined, SmileOutlined, CommentOutlined } from '@ant-design/icons';
import styled from 'styled-components'

function AdminFooter() {
  const adminToken = localStorage.getItem('adminToken');
  const loginUrl = "/catadmin/login";
  const urls = ["/catadmin/home", "/catadmin/iot", "/catadmin/catlist/map/0", "/catadmin/admin"];

  return (
    <Container>
      <MenuDiv to={urls[0]}>
        <HomeOutlined />
        <IconText>홈</IconText>
      </MenuDiv>
      <MenuDiv to={adminToken ? urls[1] : loginUrl}>
        <WifiOutlined />
        <IconText>등록</IconText>
      </MenuDiv>
      <MenuDiv to={adminToken ? urls[2] : loginUrl}>
        <CommentOutlined />
        <IconText>리스트</IconText>
      </MenuDiv>
      <MenuDiv to={adminToken ? urls[3] : loginUrl}>
        <SmileOutlined />
        <IconText>{adminToken ? "내 정보" : "로그인"}</IconText>
      </MenuDiv>
    </Container >
  );
}

export default AdminFooter;

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
  text-align: center;
  background:white;
  padding-top: 5px;

  :hover {
      color:${(props) => props.theme.colors.hotPink};
      font-weight: bold;
  }

`;