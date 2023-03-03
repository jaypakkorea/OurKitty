import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TestCat from 'assets/images/testCat.png';
import Close from 'assets/icon/button/close.png'

function DishDetail(props: any) {
  const dish = props.detailDish;

  const navigate = useNavigate();

  const handleDetailBtn = () => {
    navigate(`/catadmin/catlist/${dish.id}`, { state: dish });
  }

  return (
    <Container>
      <ImgContainer src={dish.dishImg} alt="catFeet" width="100px" height="100px" />
      <TextContainer>
        <Name onClick={handleDetailBtn}>{dish.dishName}</Name>
        <OtherText>{dish.loadAddress}</OtherText>
        <OtherText>{dish.date}</OtherText>
        <OtherText>사료량 : {dish.food_weight}%</OtherText>
      </TextContainer>
      <HeaderButton onClick={() => { props.openDetail(null, null) }}><CloseButton src={Close} alt="Close" /></HeaderButton>
    </Container>
  );
}

export default DishDetail;

const Container = styled.div`
  width: 100%;
  height: 100%;

  background-color: ${(props) => props.theme.colors.pink};

  padding: 5%;

  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.43);

  display: flex;

  overflow: hidden;
`;

const ImgContainer = styled.img`
border: 1px solid #AFB1B6;
border-radius: 10px;
  width:35%;
  height: auto;
`;

const CloseButton = styled.img`
width: 1rem;
height: 1rem;
`;

const TextContainer = styled.div`
  margin-left: 6%;
  width: 80%;

  font-family: "BMYEONSUNG";
`;


const Name = styled.div`
  font-size: 0.95em;
  margin-bottom: 0.05rem;
  font-family: "BMHANNAPro";

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
  &:hover{
    cursor: pointer;
  }
`;

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

  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;
