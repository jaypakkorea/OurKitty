import { Link } from 'react-router-dom';
import styled from 'styled-components'
import CatFeet from 'assets/icon/catFeet.png'
import LeftDiv from 'assets/images/leftDiv.png'
import { QRCode } from 'antd';

function LeftPage() {
  return (
    <Container>
      <TopDiv />
      <QRCodeDiv
        errorLevel="H"
        value="https://ourkitty.site/"
        icon={CatFeet}
      />
    </Container >
  );
}

export default LeftPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #DEDBDB;
  padding-top: 10%;
`;

const TopDiv = styled.div`
  margin: 0 5rem;
  background-image: url(${LeftDiv});
  height: 45rem;
  background-repeat: no-repeat;
`;

const QRCodeDiv = styled(QRCode)`
margin-top: -15rem;
margin-left: 60%;
`;
