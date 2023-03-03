import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import styled from 'styled-components'
import { Form, Input, Spin } from 'antd';
import Send from 'assets/icon/button/send.png'
import { DishAddType } from 'Store/Type/DishType';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddDish } from 'Store/dish-actions';

function AdminIotAddDish() {
  const emptyInput: DishAddType = { serialNumber: "", dishName: "", otherNote: "" };
  const [iotData, setIotData] = useState<DishAddType>(emptyInput);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // @ts-ignore
  const loading = useSelector(state => state.dish.loadingState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setIotData({
      ...iotData,
      [event.target.name]: event.target.value
    });
  };

  const handleSendBtnClick = async () => {
    // 1. 냥그릇 등록하기
    // @ts-ignore
    const { status, message } = await dispatch(fetchAddDish(iotData));
    if (status >= 400) {
      Swal.fire(message, '', 'error');
    } else if (status >= 200) {
      Swal.fire('등록되었습니다.', '', 'success')
        .then(() => {
          Swal.fire({
            title: "냥그릇 위치, 이미지 설정하시겠습니까?",
            icon: "question",
            showCancelButton: true,
          }).then(({ isConfirmed }) => {
            isConfirmed && navigate(`/catadmin/catlist/map/0`);
          });
        });
    }
  };

  return (
    <Container>
      <CardDiv>
        <Form
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
            rules={[{ required: true, message: '시리얼 번호를 입력해주세요.' }]}
            validateTrigger={["onSubmit", "onBlur"]}
          >
            <StyledInput
              name="serialNumber"
              value={iotData.serialNumber}
              onChange={handleInputChange}
              maxLength={20}
            />
          </Form.Item>
          <ReferTitle>밥그릇 이름 </ReferTitle>

          <Form.Item
            name="dishName"
            rules={[{ required: true, message: '밥그릇 이름을 입력해주세요.' }]}
            validateTrigger={["onSubmit", "onBlur"]}
          >
            <StyledInput
              name="dishName"
              value={iotData.dishName}
              onChange={handleInputChange}
              maxLength={20}
            />
          </Form.Item>
          <ReferTitle>비고 </ReferTitle>

          <Form.Item
            name="otherNote"
          >
            <Input.TextArea
              style={{ fontSize: " 1.3rem" }}
              rows={5}
              name="otherNote"
              value={iotData.otherNote}
              onChange={handleInputChange}
            />
          </Form.Item>
          <FlexButtonDiv>
            <CancelButton onClick={() => navigate(-1)}>
              취소
            </CancelButton>
            <OKButton type="submit" onClick={handleSendBtnClick} >
              <SendImg src={Send} alt="Send" />
            </OKButton>
          </FlexButtonDiv>
          <div style={{ marginBottom: "8rem" }} />
        </Form>
      </CardDiv>
      {loading && <LoadingDiv><Spin /></LoadingDiv>}
    </Container >
  );
}

export default AdminIotAddDish;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${(props) => props.theme.colors.lightPink};
  ::-webkit-scrollbar {
      display: none;
  }
   ${(props) => props.theme.mobile} {
    width: 100vw;
    }
  `;

const CardDiv = styled.div`
  margin: 2rem 3rem 1rem 3rem;
  @media ${(props) => props.theme.mobile} {
    margin: 2rem;
    }
`;
const StyledInput = styled(Input)`
  padding: 0.5rem 0;
  font-size: 0.9rem;
  width: 100%;
  font-size: 1.3rem;
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
    :hover{
        border: 2px solid ${(props) => props.theme.colors.pink};
    }
`;
const TitleStyle = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.darkGray};
`;

const ReferTitle = styled(TitleStyle)`
 font-family: "BMJUA";
`;

const OKButton = styled.button`
    margin-left: 1rem;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    background-color: ${(props) => props.theme.colors.hotPink};
    width: 60px;
    color: white;
    :hover{
        border: 2px solid ${(props) => props.theme.colors.pink};
    }
`;

const FlexButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    height: 40px;
    font-family: "BMJUA";
`;

const SendImg = styled.img`
  width: 25px;
  height: 25px;
`;

const LoadingDiv = styled.div`
  background-color: rgba(80, 80, 80, 20%);
  margin: auto;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;