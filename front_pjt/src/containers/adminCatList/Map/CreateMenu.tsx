import styled from 'styled-components'
import Hospital from 'assets/icon/button/hospital.png'
import Iot from 'assets/icon/button/iot.png'
import Close from 'assets/icon/button/close.png'
import { Link } from 'react-router-dom';

function CreateMenu(props: any) {

  return (
    <Container>
      <div onClick={() => { props.openDetail(null, null) }}><CloseButton src={Close} alt="Close" /></div>
      <CreateLink to="/catadmin/iot" state={{ defaultKey: '1' }}>
        <CreateCatList><IconImg src={Iot} alt='Iot' />고양이 급식소 등록</CreateCatList>
      </CreateLink>
      <CreateLink to="/catadmin/iot" state={{ defaultKey: '2' }} >
        <CreateHos><IconImg src={Hospital} alt='Hospital' />지자체 협력 동물 병원 등록</CreateHos>
      </CreateLink>
    </Container>
  );
}

export default CreateMenu;
const Container = styled.div`
  width: 100%;
  height: 15vh;
`;
const CreateLink = styled(Link)`
  :hover{
    color:${(props) => props.theme.colors.hotPink};
  }
`;

const CreateCatList = styled.div`
  background: white;
  font-size: 1.4rem;
  border: 1px solid lightgray;
  height: 50%;
  border-radius: 10px 10px 0 0;
  width: 100%;
  padding: 0.7rem 2rem;
`;
const CreateHos = styled(CreateCatList)`
  border-radius: 0;
`;

const IconImg = styled.img`
width: 25px;
height: 25px;
margin-top: -0.3rem;
margin-right: 0.5rem;
`;


const CloseButton = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  margin-top: 0.5rem;
  left: 93%;
`;
