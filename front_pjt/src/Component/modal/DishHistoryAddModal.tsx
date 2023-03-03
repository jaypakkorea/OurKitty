import styled from 'styled-components';
import { Input, Modal, Select } from 'antd';
import { useState } from "react";
import Swal from "sweetalert2";
import { addHistory } from "../../apis/api/dishHistory";


function DishHistoryAddModal(props: any) {

  const { modalOpen, modalClose, dishId, addHandler } = props;

  const [content, setContent] = useState<string>("");
  const [stateValue, setStateValue] = useState<any>(-1);

  const handleOkBtnClick = () => {

    if (stateValue === -1) {
      Swal.fire("상태를 선택해주세요.", "", "error").then().catch();
      return;
    }

    if (content.length === 0) {
      Swal.fire("내용을 입력해주세요.", "", "error").then().catch();
      return;
    }

    addHistory({
      dishId,
      state: stateValue,
      content
    })
      .then(addHandler)
      .catch((error) => console.error(error));
  }

  const handleWriteContent = (value: string) => {
    if (value.length > 20) {
      return;
    }

    setContent(value);
  }

  return (
    <HistoryAddModal
      open={modalOpen}
      destroyOnClose={true}
      centered
      closable={false}
      footer={null}>
      <StateDiv>
        <MainTitle>상태</MainTitle>
        <StateSelect placeholder={"상태"} onSelect={(value) => setStateValue(value)}>
          <Select.Option value={0} children={<SelectChildren>정상<GreenCircle /></SelectChildren>} />
          <Select.Option value={1} children={<SelectChildren>경고<YellowCircle /></SelectChildren>} />
          <Select.Option value={2} children={<SelectChildren>나쁨<RedCircle /></SelectChildren>} />
        </StateSelect>
      </StateDiv>
      <ContentDiv>
        <MainTitle>내용</MainTitle>
        <ContentInput placeholder={"내용"} value={content}
          onChange={(value) => handleWriteContent(value.target.value)} />
        <ContentLengthDiv>{content.length} / 20</ContentLengthDiv>
      </ContentDiv>
      <FlexButtonDiv>
        <CancelButton onClick={modalClose}>취소</CancelButton>
        <OKButton onClick={handleOkBtnClick}>확인</OKButton>
      </FlexButtonDiv>
    </HistoryAddModal>
  )
}

export default DishHistoryAddModal;

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

const MainTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;

  font-family: "BMJUA";
`;

const StateSelect = styled(Select)`
  width: 7rem;

  margin-left: 2rem;
`

const SelectChildren = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;

  font-family: "BMYEONSUNG";
`

const ContentDiv = styled.div`
  margin: 1rem 0 2rem;
`

const ContentInput = styled(Input)`
  font-family: "BMYEONSUNG";

  margin-top: 0.5rem;
`

const ContentLengthDiv = styled.div`
  font-size: 0.7rem;
  font-family: "BMYEONSUNG";

  display: flex;
  margin-top: 0.3rem;
  justify-content: end;
`


const FlexButtonDiv = styled.div`
  display: flex;
  margin-top: 1em;
  justify-content: end;
  height: 40px;
`;

const CancelButton = styled.button`
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  background-color: white;
  width: 60px;
  color: ${(props) => props.theme.colors.hotPink};
  font-weight: bold;

  :hover {
    border: 2px solid ${(props) => props.theme.colors.pink};
  }
`;

const OKButton = styled.button`
  margin-left: 1rem;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.hotPink};
  width: 60px;
  color: white;
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
