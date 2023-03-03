import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useEffect } from "react";


interface ImageDivProps {
  img: string
}

const MapListDishDetail = () => {
  //@ts-ignore
  const selectedDish = useSelector(state => state.dish.selectedDish);

  const navigate = useNavigate();

  const handleDetailBtn = () => {
    navigate(`/catadmin/catlist/${selectedDish.id}`, { state: selectedDish });
  }

  const handleModifyBtn = () => {
    navigate(`/catadmin/catlist/map/edit/${selectedDish.id}`, { state: selectedDish });
  }

  return (
    <Container>
      {
        selectedDish.id === "" || !selectedDish.id ?
          <TextContainer>
            <ModalBoldText>
              기기를 선택해주세요.
            </ModalBoldText>
          </TextContainer>
          :
          <>
            <DetailDiv>
              <DetailImageDiv img={selectedDish.dishImg} />
              <DetailInfoDiv>
                <DetailInfoTextDiv>이름 : {selectedDish.dishName}</DetailInfoTextDiv>
                <DetailInfoTextDiv>주소지 : {selectedDish.loadAddress}</DetailInfoTextDiv>
                <DetailInfoTextDiv>비고 : {selectedDish.otherNote}</DetailInfoTextDiv>
              </DetailInfoDiv>
            </DetailDiv>
            <FlexButtonDiv>
              <Button onClick={handleDetailBtn}>상세보기</Button>
              <Button onClick={handleModifyBtn}>수정하기</Button>
            </FlexButtonDiv>
          </>
      }
    </Container>
  )
};

export default MapListDishDetail;

const Container = styled.div`
  width: 100%;
  height: 185px;
  background-color: lightgray;
  border-radius: 0.5rem;
  position: relative;

`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

`;

const DetailDiv = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  padding: 1rem 1rem 0 1rem;

`;

const DetailImageDiv = styled.div<ImageDivProps>`
  width: 40%;
  height: 100%;
  display: flex;
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;

`;

const DetailInfoDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 0.5rem;
  overflow-y: scroll;

`;

const DetailInfoTextDiv = styled.div`
  overflow-wrap: break-word;
  
`;

const FlexButtonDiv = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.8rem;
  padding-right: 1.5rem;
  margin-top: 5px;

`;
const Button = styled.button`
  border: 0;
  font-weight: bold;
  background-color: transparent;
  &:hover {
    color: ${(props) => props.theme.colors.hotPink};
  }

`;

const ModalBoldText = styled.div`
  font-size: 1.5rem;
  font-family: "BMJUA";
`;
