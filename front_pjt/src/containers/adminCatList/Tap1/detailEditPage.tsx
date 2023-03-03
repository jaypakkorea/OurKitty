
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

import styled from 'styled-components'
import AdminHeader from 'Component/AdminHeader';
import { Form, Input, Modal } from 'antd';
import Send from 'assets/icon/button/send.png'

function DetailEditPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const cancelModal = () => {
    setIsModalOpen(false);
  };

  interface DataType {
    serialNumber: string;
    bowlName: string;
    note: string;
  }


  const [iotData, setIotData] = useState<DataType>();


  const iotCreateButton = (values: any) => {

    try {
      setIotData({
        serialNumber: values.serialNumber,
        bowlName: values.bowlName,
        note: values.note
      })

    } catch (error) {
      Swal.fire('다시 한번 시도해주세요.', '', 'error');
    }
  };


  return (
    <Container>
      <AdminHeader />
      <CardDiv>
        <Form
          onFinish={iotCreateButton}
          name="basic"
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
        >
          <ReferTitle>시리얼 번호 </ReferTitle>
          <Form.Item
            name="serialNumber"
          >
            <StyledInput
              name="serialNumber"
            />
          </Form.Item>
          <ReferTitle>밥그릇 이름 </ReferTitle>

          <Form.Item
            name="bowlName"
          >
            <StyledInput
              name="bowlName"
            />
          </Form.Item>
          <ReferTitle>비고 </ReferTitle>

          <Form.Item
            name="note"
          >
            <Input.TextArea
              style={{ fontSize: " 1.3rem" }}
              rows={5}
              name="note"
            />
          </Form.Item>
          <FlexButtonDiv>
            <CancelButton onClick={() => navigate(-1)}>
              취소
            </CancelButton>
            <OKButton type="submit">
              <SendImg src={Send} alt="Send" />
            </OKButton>
          </FlexButtonDiv>
          <FlexButtonDiv>
            <DeleteButton onClick={showModal}>냥그릇 삭제</DeleteButton>
          </FlexButtonDiv>
        </Form>
      </CardDiv>
      <SModal open={isModalOpen}
        centered
        closable={false}
        footer={null}>
        <ModalBoldText>정말로 삭제하시겠습니까?</ModalBoldText>
        <DeleteButtonDiv>
          <CancelButton onClick={cancelModal}>
            취소
          </CancelButton>
          <OKButton>
            확인
          </OKButton>
        </DeleteButtonDiv>
      </SModal>
    </Container>
  );
}

export default DetailEditPage
const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: auto;
    background-color: ${(props) => props.theme.colors.lightPink};
    ::-webkit-scrollbar {
        display: none;
    }
    padding-bottom: 60px;
`;
const CardDiv = styled.div`
  margin: 5rem 3rem 3rem 3rem;
  
`;
const StyledInput = styled(Input)`
  padding: 0.5rem 0;
  font-size: 0.9rem;
  width: 100%;
  font-size: 1.3rem;
  font-family: "BMHANNAPro";
  :focus,
  :active,
  :hover {
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme.hotPink};
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme.hotPink};
  }
`;

const CancelButton = styled.button`
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    background-color: white;
    width: 60px;
    color: ${(props) => props.theme.colors.hotPink};
    font-weight: bold;
    :hover{
        border: 2px solid ${(props) => props.theme.colors.pink};
    }
`;
const TitleStyle = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.darkGray};
`;

const ReferTitle = styled(TitleStyle)``;

const OKButton = styled.button`
    margin: 0 1rem;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    background-color: ${(props) => props.theme.colors.hotPink};
    width: 60px;
    color: white;
    font-weight: bold;
    :hover{
        border: 2px solid ${(props) => props.theme.colors.pink};
    }
`;

const FlexButtonDiv = styled.div`
    display: flex;
    margin: 3rem 0;
    justify-content: end;
    height: 40px;
`;

const SendImg = styled.img`
  width: 25px;
  height: 25px;
`;

const DeleteButton = styled.button`
    margin: 0 1rem;
    border: 1px solid  ${(props) => props.theme.colors.hotPink};
    border-radius: 12px;
    background-color: ${(props) => props.theme.colors.lightPink};
    width: 120px;
    color: ${(props) => props.theme.colors.hotPink};
    font-weight: bold;
    :hover{
        border: 2px solid ${(props) => props.theme.colors.pink};
    }
`;

const SModal = styled(Modal)`
.ant-modal-content{
  background-color: ${(props) => props.theme.colors.lightPink};
  padding: 3rem 0 2rem 0;
}
.ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select{
  width: 70%;
  margin-left: 15%;
  height: 200px;
  overflow: hidden;
}
`;

const ModalBoldText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  width: 70%;
  margin: 1rem auto;
`;
const DeleteButtonDiv = styled.div`
    display: flex;
    margin: 3rem auto;
    /* justify-content: space-around; */
    height: 40px;
    width: 150px;
`;