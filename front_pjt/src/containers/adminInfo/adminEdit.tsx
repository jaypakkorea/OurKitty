import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Login from "./login";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminUserInfo } from '../../Store/admin-action';
import { Card, Form, Input } from 'antd';
import Load from "../../Component/Load";
import { useNavigate } from 'react-router-dom';
import { UpdateAdminInfo } from 'apis/api/admin';
import Swal from 'sweetalert2';


const AdminEdit: React.FC = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  // @ts-ignore
  const fetchedUser = useSelector(state => state.admin.admin);

  useEffect(() => {
    if (fetchedUser !== undefined) {
      form.setFieldsValue({
        "adminEmail": fetchedUser.adminEmail,
        "adminName": fetchedUser.adminName,
        "groupName": fetchedUser.groupName,
        "adminRole": fetchedUser.adminRole,
        "phone1": (fetchedUser.adminPhone !== undefined && fetchedUser.adminPhone.length >= 8) ? fetchedUser.adminPhone.toString().substring(0, 3) : "",
        "phone2": (fetchedUser.adminPhone !== undefined && fetchedUser.adminPhone.length >= 8) ? fetchedUser.adminPhone.toString().substring(3, 7) : "",
        "phone3": (fetchedUser.adminPhone !== undefined && fetchedUser.adminPhone.length >= 8) ? fetchedUser.adminPhone.toString().substring(7,) : ""
      })
    }
  }, [fetchedUser])

  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      // @ts-ignore
      dispatch(fetchAdminUserInfo())
      setLoading(false);
    }
  }, [dispatch])


  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      setIsLoggedIn(true);
    }
  }, [])

  const handleEditAdmin = async () => {
    let data = {
      "adminEmail": form.getFieldValue("adminEmail"),
      "adminName": form.getFieldValue("adminName"),
      "adminPhone": form.getFieldValue("phone1") + form.getFieldValue("phone2") + form.getFieldValue("phone3"),
      "adminRole": form.getFieldValue("adminRole")
    }

    UpdateAdminInfo(data)
      .then((response: any) => {
        Swal.fire('수정되었습니다.', '', 'success');
        navigate("/catadmin/admin");
      })
      .catch((error: any) => {
        Swal.fire("수정 도중 에러가 발생했습니다.", '', 'error');
      })
  }

  return (
    <Container>
      {isLoggedIn ?
        loading ? <Load /> : <>

          <MainTitle>프로필 수정</MainTitle>
          <Card bordered={false} style={{ marginBottom: '4rem' }}>

            <Layout>

              <Form
                style={{ width: '100%' }}
                name="basic"
                form={form}
                labelCol={{
                  span: 12,
                }}
                wrapperCol={{
                  span: 24,
                }}>
                <SubTitle>이메일</SubTitle>
                <Form.Item name="adminEmail">
                  <ReadOnlyInput name="adminEmail" readOnly={true} />
                </Form.Item>

                <SubTitle>이름</SubTitle>
                <Form.Item name="adminName">
                  <StyledInput name="adminName" />
                </Form.Item>

                <SubTitle>소속</SubTitle>
                <Form.Item name="groupName">
                  <ReadOnlyInput name="groupName" readOnly={true} />
                </Form.Item>

                <SubTitle>직책</SubTitle>
                <Form.Item name="adminRole">
                  <StyledInput name="adminRole" />
                </Form.Item>

                <SubTitle>전화번호</SubTitle>
                <Form.Item name="phone">
                  <PhoneFlexDiv>
                    <Form.Item
                      name="phone1"
                    >
                      <StyledInput
                        name="phone1"
                        maxLength={3}
                      />
                    </Form.Item>&nbsp;-&nbsp;
                    <Form.Item
                      name="phone2"
                    >
                      <StyledInput
                        name="phone2"
                        maxLength={4}
                      />
                    </Form.Item>&nbsp;-&nbsp;
                    <Form.Item
                      name="phone3"
                    >
                      <StyledInput
                        name="phone3"

                        maxLength={4}
                      />
                    </Form.Item>
                  </PhoneFlexDiv>
                </Form.Item>
              </Form>


              <FlexButtonDiv>
                <CancelButton onClick={() => navigate(-1)}>
                  취소
                </CancelButton>
                <OKButton type="submit" onClick={handleEditAdmin}>
                  저장
                </OKButton>
              </FlexButtonDiv>

            </Layout>
          </Card>
        </>
        :
        <Login />
      }
    </Container>
  );
}

export default AdminEdit;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
  
  padding-bottom: 5rem;

  background-color: ${(props) => props.theme.colors.lightPink};

  ::-webkit-scrollbar {
    display: none;
  }

  padding: 16px 24px;
  @media ${(props) => props.theme.mobile} {
    width: 100vw;
    height: 100%;
  }

`;

const PhoneFlexDiv = styled.div`
    display: flex;
    font-size: 1.5rem;
`;

const StyledInput = styled(Input)`
  padding: 0.5rem 0;
  font-size: 0.9rem;
  width: 100%;
  font-size: 1.1rem;
  font-family: "BMJUA";
  :focus,
  :active,
  :hover {
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme.hotPink};
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme.hotPink};
  }
`;

const ReadOnlyInput = styled(Input)`
    padding: 0.5rem 0;
    font-size: 0.9rem;
    width: 100%;
    font-size: 1.1rem;
    font-family: "BMJUA";
    background-color: #f4f4f4;
`

const MainTitle = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  width:100%;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`

const Layout = styled.div`
  display: flex;
  font-family: "BMJUA" !important;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 0px;
  gap: 2rem;
`

const SubTitle = styled.div`
  font-size: 1.1rem;
  font-family: "BMJUA";
  margin-bottom: 0.2rem;
`

const FlexButtonDiv = styled.div`
    display: flex;
    // margin-top : 2rem;
    margin-bottom : 2rem;
    right : 3vw;
    justify-content: end;
    width: 100%;
    height: 3rem;
`;

const OKButton = styled.button`
  padding: 4px;
  margin: 0 2rem;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.hotPink};
  width: fit-content;
  color: white;
  font-weight: bold;

  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;

  :hover {
    border: 2px solid ${(props) => props.theme.colors.pink};
  }
`;

const CancelButton = styled.button`
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;

  background-color: white;
  
  width: fit-content;
  color: ${(props) => props.theme.colors.hotPink};
  font-weight: bold;

  padding: 8px 16px;
  justify-content: center;
  align-items: center;

  :hover {
    border: 2px solid ${(props) => props.theme.colors.pink};
  }
`;
