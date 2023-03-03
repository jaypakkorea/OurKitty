import styled from 'styled-components';
import Close from "../../assets/icon/button/close.png";
import Check from "../../assets/icon/hospital-check.png"

function HospitalDetail(props: any) {
  const hospital = props.detailHospital;

  return (
    <Container>
      <TextContainer>
        <Name>
          {hospital.hospitalName}
          {hospital.hospitalState === 1 && <CheckImg src={Check} />}
        </Name>
        <OtherText>{hospital.address}</OtherText>
        <OtherText>{hospital.hospitalPhone}</OtherText>
      </TextContainer>
      <div>
        <HeaderButton onClick={() => {
          props.openDetail(null, null)
        }}><CloseButton src={Close} alt="Close" /></HeaderButton>
      </div>
    </Container>
  );
}

export default HospitalDetail;

const Container = styled.div`
  width: 100%;
  height: 100%;

  background-color: #BEEDEF;

  padding: 5%;

  border-radius: 15px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15999999821186066);

  display: flex;
  justify-content: space-between;
`;

const TextContainer = styled.div`
  margin-left: 6%;
  margin-top: 0.2rem;
`;

const Name = styled.div`
  font-size: 0.95em;
  margin-bottom: 0.05rem;
  font-family: "BMHANNAPro";

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CheckImg = styled.img`
  margin-left: 0.5rem;
  
  width: 1.1rem;
  height: 1.1rem;
`

const OtherText = styled.div`
  font-size: 0.7em;
  margin-bottom: 0.05rem;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const HeaderButton = styled.div`
  border: 0;
  background: transparent;

  padding-bottom: 0.2rem;

  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const CloseButton = styled.img`
  width: 1rem;
  height: 1rem;
`;
