import { Modal } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

function IotModal(props: any) {
  const { modalOpen, modalClose, data } = props;

  return (
    <ContainerModal
      open={modalOpen}
      destroyOnClose={true}
      centered
      closable={false}
      footer={null}>
      <ContentDiv>
        <img src={data.imgUrl} alt="noticeImg" width="100%" />
        <MainTitle>{data.dish.otherNote}</MainTitle>
      </ContentDiv>
      <FooterDiv>
        <FooterLeftDiv>
          <Link to={`/map/dish/${data.dish.id}/1`}>
            <SubTitle>{data.dish.dishName}</SubTitle>
          </Link>
          <SubTitle>{data.createdDate.split('T')[0]} {data.createdDate.substr(11, 5)}</SubTitle>
        </FooterLeftDiv>
        <CancelButton onClick={modalClose}>닫기</CancelButton>
      </FooterDiv>
    </ContainerModal >

  )
}
export default IotModal;

const ContainerModal = styled(Modal)`
  .ant-modal-content {
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.lightPink};
    padding: 1em;
  }
`
const ContentDiv = styled.div`
margin: 1rem 0 2rem;
`

const FooterLeftDiv = styled.div`
margin: 0;
`
const MainTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;

  font-family: "BMJUA";
`;

const SubTitle = styled.div`
    font-size: 1.2rem;

  font-family: "BMJUA";
`
const FooterDiv = styled.div`
  display: flex;
  margin-top: 1em;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  background-color: white;
  
  width: 60px;
  height: 40px;
  margin-top: auto;
  
  color: ${(props) => props.theme.colors.hotPink};
  font-weight: bold;

  :hover {
    border: 2px solid ${(props) => props.theme.colors.pink};
  }
`;

