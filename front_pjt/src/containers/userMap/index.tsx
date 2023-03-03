import styled from 'styled-components';
import KakaoMap from './kakaoMap';
import Header from 'Component/Header';


function Map() {

  return (
    <Container>
      <Header />
      <KakaoMap />
    </Container>
  );
}

export default Map;

const Container = styled.div`
  width: 100%;
  height: 100%;
  @media ${(props) => props.theme.mobile} {
    height: 100vh;
  }
`;
