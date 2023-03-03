import { useEffect } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroupsList } from 'Store/admin-action';
import { LoginAdmin, SignUpAdmin } from 'apis/api/admin';


function AdminSignUp() {
  const passRegExp = /(?=.*\d{1,24})(?=.*[a-zA-Z]{1,24}).{8,24}$/;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // @ts-ignore
  const groupsList: Array<string> = useSelector(state => state.admin.groups);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchGroupsList());

  }, [dispatch])

  const handleSignupButton = (values: any) => {

    let adminPhone = ''
    adminPhone = values.phone1 + values.phone2 + values.phone3

    let data = {
      "adminEmail": values.adminEmail,
      "adminPassword": values.adminPassword,
      "groupName": values.groupId,
      "adminName": values.adminName,
      "adminPhone": adminPhone,
      "adminRole": values.adminRole
    };

    SignUpAdmin(data)
      .then((res: any) => {
        let loginData = {
          "adminEmail": values.adminEmail,
          "adminPassword": values.adminPassword
        };

        LoginAdmin(loginData)
          .then((res: any) => {
            window.location.replace("/catadmin/home");
            Swal.fire('회원가입이 완료됐습니다.', '', 'success');
          })
          .catch((err: any) => {
            alert(err.message);
          })
      })
      .catch((err: any) => {
        if (err.response.status === 400) {
          Swal.fire('이미 가입된 아이디입니다.', '', 'error')
        } else {
          Swal.fire('다시 한번 시도해주세요.', '', 'error')
        }
      });
  };

  return (
    <Container>
      <MainTitle>
        관리자 등록
      </MainTitle>
      <Form
        onFinish={handleSignupButton}
        name="signUp"
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 24,
        }}
        autoComplete="off"
      >
        <FormTitle>이메일 </FormTitle>
        <Form.Item
          name="adminEmail"
          hasFeedback
          rules={[
            {
              type: 'email',
              message: '이메일 형식이 올바르지 않습니다.',
            },
            {
              required: true,
              message: '이메일은 필수 정보입니다.',
            },
          ]}
        >
          <StyledInput
            name="email-value"
            placeholder="아이디로 사용할 이메일 입력"
          />
        </Form.Item>
        <StyledFormItem>
          <FormTitle>비밀번호 </FormTitle>
          <Form.Item
            name="adminPassword"
            hasFeedback
            rules={[
              {
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(
                      new Error('비밀번호는 필수 정보입니다.'),
                    );
                  }
                  if (value.search(/\s/) !== -1) {
                    return Promise.reject(
                      new Error('공백은 입력할 수 없습니다.'),
                    );
                  }
                  if (!passRegExp.test(value)) {
                    return Promise.reject(
                      new Error('8 ~ 24자의 영문자와 숫자를 포함하세요.'),
                    );
                  }
                  if (value.length >= 24) {
                    return Promise.reject(new Error('24자 이하로 입력하세요.'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <StyledInput
              type="password"
              name="new-password"
              placeholder="영문, 숫자 조합 최소 8자"
            />
          </Form.Item>
          <FormTitle>비밀번호 확인 </FormTitle>
          <Form.Item
            name="pass2"
            dependencies={['adminPassword']}
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(
                      new Error('확인을 위한 비밀번호를 다시 입력하세요.'),
                    );
                  }
                  if (getFieldValue('adminPassword') !== value) {
                    return Promise.reject(
                      new Error('비밀번호가 일치하지 않습니다.'),
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <StyledInput
              type="password"
              name="new-password"
              placeholder="비밀번호 재입력"
            />
          </Form.Item>
          <FormTitle>이름 (실명) </FormTitle>
          <Form.Item
            hasFeedback
            name="adminName"
            rules={[
              {
                required: true,
                message: '이름을 입력해주세요',
              },
            ]}
          >
            <StyledInput
              name="adminName"
            // placeholder="이름을 입력해주세요"
            />
          </Form.Item>
          <FormTitle>소속 </FormTitle>
          <Form.Item
            hasFeedback
            name="groupId"
            rules={[{ required: true, message: '소속을 선택해주세요' }]}
          >
            <Select
              showSearch
              placeholder="소속을 선택해 주세요"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={(groupsList || []).map((d) => ({
                value: d,
                label: d
              }))}
            >

            </Select>
          </Form.Item>

          <ReferTitle>직책 </ReferTitle>
          <Form.Item
            name="adminRole"
            hasFeedback
          >
            <StyledInput
              name="adminRole"
            />
          </Form.Item>
          <ReferTitle>전화번호 </ReferTitle>
          <PhoneFlexDiv>
            <Form.Item
              name="phone1"
              hasFeedback
            >
              <StyledInput
                name="phone1"
                maxLength={3}
              />
            </Form.Item>&nbsp;-&nbsp;
            <Form.Item
              name="phone2"
              hasFeedback
            >
              <StyledInput
                name="phone2"
                maxLength={4}
              />
            </Form.Item>&nbsp;-&nbsp;
            <Form.Item
              name="phone3"
              hasFeedback
            >
              <StyledInput
                name="phone3"
                maxLength={4}
              />
            </Form.Item>
          </PhoneFlexDiv>
        </StyledFormItem>
        <FlexButtonDiv>
          <CancelButton onClick={() => navigate(-1)}>
            취소
          </CancelButton>
          <OKButton type="submit">
            확인
          </OKButton>
        </FlexButtonDiv>
      </Form>
    </Container >
  );
}

export default AdminSignUp;

const Container = styled.div`
        padding: 2rem 2rem 4rem 2rem;
        height: 100vh;
        overflow: auto;
        background-color: ${(props) => props.theme.colors.lightPink};
        ::-webkit-scrollbar {
            display: none;
    }
    /* .css-dev-only-do-not-override-1i9hnpv.ant-input-affix-wrapper {
            width: 350px;
    } */
        `;
const MainTitle = styled.div`
        display: flex;
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 1rem;

        `;
const TitleStyle = styled.div`
        font-size: 0.9rem;
        color: ${(props) => props.theme.colors.darkGray};
        `;


const FormTitle = styled(TitleStyle)`
        ::before {
            content: '*';
        position: relative;
        top: 3px;
        right: 3px;
        font-size: 20px;
        color: ${(props) => props.theme.colors.danger};
  }
        `;
const StyledForm = styled(Form)`
        /* width: 21.5rem; */
        padding: 0.5rem;
        `;

const StyledFormItem = styled(StyledForm.Item)`
        margin-bottom: 15px;

        `;
const StyledInput = styled(Input)`
        padding: 0.5rem 0;
        font-size: 0.9rem;
        width: 100%;
        :focus,
        :active,
        :hover {
            box-shadow: none;
        border-bottom: 2px solid ${(props) => props.theme.hotPink};
        box-shadow: none;
        border-bottom: 2px solid ${(props) => props.theme.hotPink};
  }
        `;
const ReferTitle = styled(TitleStyle)``;
// const SubTitle = styled.div`
//     font-size: 0.8rem;
//     color: gray;
//     margin: 0.8rem 0 0.3rem 0;
// `;

const PhoneFlexDiv = styled.div`
        display: flex;
        font-size: 1.5rem;
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
const OKButton = styled.button`
        margin-left: 1rem;
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
        margin: 2rem 0;
        justify-content: end;
        height: 40px;
        `;


