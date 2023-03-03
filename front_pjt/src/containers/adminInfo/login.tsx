import React from 'react'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Swal from 'sweetalert2';



const AdminLogin: React.FC = () => {

    const onFinish = (event: any) => {
        // event.preventDefault();

        axios({
            method: 'post',
            url: 'https://ourkitty.site/auth/login',
            data: {
                "adminEmail": event.username,
                "adminPassword": event.password
            }
        })
            .then(res => {
                localStorage.setItem('adminToken', res.data.token)
                localStorage.setItem('adminRefresh', res.data.adminRefresh)
                window.location.replace("/catadmin/home");
            })
            .catch(err => {
                Swal.fire('아이디와 비밀번호를 확인해주세요', '', 'error');
            });
    };



    return (
        <Container>
            <CardDiv>
                <LoginTitle>
                    로그인
                </LoginTitle>
                <FormBottom
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '아이디를 입력해주세요!!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="아이디" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="비밀번호"
                        />
                    </Form.Item>


                    <Form.Item style={{ padding: "-1rem" }}>
                        <Button type="primary" htmlType="submit" style={{ marginTop: "1rem", fontFamily: "BMJUA", fontSize: '1rem', }} className="login-form-button">
                            로그인
                        </Button>
                        <br />
                        <a href="/catadmin/admin/signup" style={{ marginTop: "-0.5rem", color: "gray", fontFamily: "BMJUA", fontSize: '0.8rem' }}>관리자 등록</a>
                    </Form.Item>

                </FormBottom>
            </CardDiv>
        </Container >
    );
}

export default AdminLogin;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding-top: 40%;
    background-color: ${(props) => props.theme.colors.lightPink};
`;


const CardDiv = styled.div`
    width: 80%;
    height: 70%;
    background-color: white;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    gap: 15px;
    border-radius: 16px;
    box-shadow:  2px 2px 2px  lightgray;
`;

const LoginTitle = styled.div`
    font-size: 1.6rem;
    font-weight: bold;
    letter-spacing: -0.04em;
    text-shadow: 2px 2px 2px darkgray;
    margin-bottom: 2rem;
`;

const FormBottom = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    .ant-form-item-control-input-content{
        display : flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin-bottom : -1rem;
    }
    .css-dev-only-do-not-override-1n7nwfa .ant-btn-primary{
        background-color : #FFAAC7 !important;
        color : black;
    }
    .ant-form-item-control-input-content{
        margin-bottom: 10px;
    }
    .ant-input-affix-wrapper-status-error{
        margin-top: 1.2rem
    }
`
