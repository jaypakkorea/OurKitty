import styled from 'styled-components';
import { Modal } from 'antd';


function DishHistoryShowModal(props: any) {

  const { modalOpen, modalClose, dishHistory } = props;

  return (
    <HistoryAddModal
      open={modalOpen}
      destroyOnClose={true}
      centered
      closable={false}
      footer={null}>
      <StateDiv>
        <MainText>
          {
            dishHistory.state === 0 ? (<GreenCircle></GreenCircle>)
              : dishHistory.state === 1 ? (<YellowCircle></YellowCircle>)
                : (<RedCircle></RedCircle>)
          }
        </MainText>
      </StateDiv>
      <ContentDiv>
        <MainText>{dishHistory.content}</MainText>
      </ContentDiv>
      <FlexButtonDiv>
        <FooterDiv>
          <SubText>{dishHistory.adminName}</SubText>
          <SubText>{dishHistory.createdDate}</SubText>
        </FooterDiv>
        <CancelButton onClick={modalClose}>닫기</CancelButton>
      </FlexButtonDiv>
    </HistoryAddModal>
  )
}

export default DishHistoryShowModal;

const HistoryAddModal = styled(Modal)`
  .ant-modal-content {
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.lightPink};
    padding: 2em;
  }
`

const StateDiv = styled.div`
  display: flex;
`

const SubText = styled.div`

  font-family: "BMJUA"; 
`;

const MainText = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  
  font-family: "BMYEONSUNG";
`

const ContentDiv = styled.div`
  margin: 1rem 0 1rem;
`

const FooterDiv = styled.div`
  margin: 0;
`

const FlexButtonDiv = styled.div`
  display: flex;
  margin-top: 1em;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  border: none;
  
  width: 60px;
  height: 40px;
  
  margin-top: 8%;
  
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  background-color: white;
  color: ${(props) => props.theme.colors.hotPink};
  font-weight: bold;

  :hover {
    border: 2px solid ${(props) => props.theme.colors.pink};
  }
`;


const GreenCircle = styled.div`
  border-radius: 50%;
  border: black solid 0.5px;
  background-color: lawngreen;

  height: 2.5vh;
  width: 2.5vh;
`

const YellowCircle = styled.div`
  border-radius: 50%;
  border: black solid 0.5px;
  background-color: yellow;

  height: 2.5vh;
  width: 2.5vh;
`

const RedCircle = styled.div`
  border-radius: 50%;
  border: black solid 0.5px;
  background-color: red;

  height: 2.5vh;
  width: 2.5vh;
`
