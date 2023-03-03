import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux';
import {fetchAdminUserInfo} from '../../Store/admin-action';
import {Modal, Card, List, Avatar} from 'antd';
import axios from 'axios';
import Load from "../../Component/Load";
import {useNavigate} from 'react-router-dom';


const Admin: React.FC = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // @ts-ignore
    const fetchedUser = useSelector(state => state.admin.admin);

    useEffect(() => {
        if (localStorage.getItem('adminToken')) {
            // @ts-ignore
            dispatch(fetchAdminUserInfo())
            setIsLoggedIn(true);

        }
    }, [dispatch])

    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    const onLogoutModal = () => {
        setLogoutModalOpen(true)
    };

    const onCloseLogoutModal = () => {
        setLogoutModalOpen(false)
    };

    const handleModify = () => {
        navigate(`/catadmin/admin/edit`);
    }


    const onLogout = () => {
        localStorage.clear();
        window.location.replace("/catadmin/home");
        // setLogoutModalOpen(false)
    };

    const [loading, setLoading] = useState(true)
    const [myCatList, setMyCatList] = useState([])
    const userToken = localStorage.getItem('adminToken')
    useEffect(() => {
        if (isLoggedIn) {
            axios({
                method: 'get',
                url: 'https://ourkitty.site/api/dishes/admin-groups',
                headers: {
                    Authorization: userToken,
                },
            })
                .then(res => {
                    setMyCatList(res.data)
                    setLoading(false)
                })
                .catch(err => {
                    alert(err)
                });
        }
    }, [isLoggedIn, userToken])


    return (
        <Container>
            {loading ? <Load/> : <>

                <MainTitle>프로필</MainTitle>
                <Card bordered={false}>

                    <Layout>
                        <div style={{width: '100%'}}>
                            <SubTitle>이메일</SubTitle>
                            <Divider/>
                            <Content>{fetchedUser.adminEmail}</Content>
                        </div>


                        <div style={{width: '100%'}}>
                            <SubTitle>이름</SubTitle>
                            <Divider/>
                            <Content>{fetchedUser.adminName}</Content>
                        </div>

                        <div style={{width: '100%'}}>
                            <SubTitle>소속</SubTitle>
                            <Divider/>
                            <Content>{fetchedUser.groupName}</Content>
                        </div>
                        {fetchedUser.adminRole ?
                            <div style={{width: '100%'}}>
                                <SubTitle>직책</SubTitle>
                                <Divider/>
                                <Content>{fetchedUser.adminRole}</Content>
                            </div> : <></>
                        }

                        <div style={{width: '100%'}}>
                            <SubTitle>전화번호</SubTitle>
                            <Divider/>
                            {fetchedUser.adminPhone !== null && fetchedUser.adminPhone !== "" && fetchedUser.adminPhone.length >= 8 ?
                                <Content>{fetchedUser.adminPhone.toString().substring(0, 3)}-{fetchedUser.adminPhone.toString().substring(3, 7)}-{fetchedUser.adminPhone.toString().substring(7,)}</Content>
                                : <Content>미등록</Content>
                            }
                        </div>

                        {myCatList.length === 0 ?
                            <Exception> 등록한 <p></p> 급식소가 없어요~</Exception>
                            :
                            <>
                                <div style={{width: '100%'}}>
                                    <SubTitle>담당 길고양이 급식소</SubTitle>
                                    <Divider/>
                                    <CustomList itemLayout="horizontal"
                                                pagination={{position: "bottom", pageSize: 4}}
                                                dataSource={myCatList}
                                                renderItem={(item: any) => (
                                                    <List.Item key={item.id}>
                                                        <List.Item.Meta
                                                            avatar={(item.dishImg !== null) ?
                                                                <Avatar src={item.dishImg}/> :
                                                                <Avatar src="https://joeschmoe.io/api/v1/random"/>}
                                                            title={<a
                                                                onClick={() => navigate(`/catadmin/catlist/${item.id}`, {state: item})}>{item.dishName}</a>}
                                                            description={item.otherNote}
                                                        />
                                                    </List.Item>
                                                )}
                                    />


                                    {/* {myCatList.map((content : any) => (
                    <Content>{content.dishName}</Content>
                  ))} */}
                                </div>
                            </>
                        }


                    </Layout>
                </Card>
                <FlexButtonDiv>
                    <CancelButton onClick={handleModify}>
                        프로필 편집
                    </CancelButton>
                    <OKButton onClick={onLogoutModal}>
                        로그아웃
                    </OKButton>
                </FlexButtonDiv>
                <LogoutModal open={logoutModalOpen}
                             centered
                             closable={false}
                             footer={null}
                >
                    <LogoutToggle>
                        <p>로그아웃하시겠습니까? </p>
                    </LogoutToggle>
                    <LogoutToggleButton>
                        <CancelButton onClick={onCloseLogoutModal}>아니요</CancelButton>
                        <OKButton onClick={onLogout}>네</OKButton>
                    </LogoutToggleButton>

                </LogoutModal>
            </>
            }
        </Container>
    );
}

export default Admin;

const CustomList = styled(List)`

  .ant-list-item {
    font-family: "BMJUA" !important;
  }

  .ant-pagination {
    text-align: center;
  }

  .ant-pagination-item {
    color: gray;
  }

  .ant-pagination-item-active {
    color: black;
    background: transparent;
    border: none;
  }

`

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

const MainTitle = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  width: 100%;
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
  margin-bottom: 0.2rem;
`

const Divider = styled.div`
  width: 18rem;
  height: 1px;
  width: 100%;
  background-color: #f4f4f4;
  border-radius: 1px;
  margin: 0.2rem 0;
`

const Content = styled.div`
  font-size: 1rem;
`

const LogoutModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${(props) => props.theme.colors.lightPink};
    padding: 3rem 0 2rem 0;
  }

  .ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select {
    width: 70%;
    margin-left: 15%;
    overflow: hidden;
  }
`;
const LogoutToggleSpan = styled.span`
  text-align: center;
  margin-bottom: 2rem;
  margin-left: 2rem;
  font-family: BMJUA;
  color: #FF4081;
`
const LogoutToggleButton = styled.div`
  font-size: 1rem;
  text-align: center;
  margin-bottom: 2rem;
  margin-right: 1rem;
  margin-left: 1rem;
  font-family: BMJUA;
  color: gray;
`

const LogoutToggle = styled.div`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
  margin-right: 1rem;
  margin-left: 1rem;
  font-family: BMJUA;
  line-height: 0.6;
`

const FlexButtonDiv = styled.div`
  display: flex;
  margin-top: 3rem;
  margin-bottom: 8rem;
  right: 3vw;
  justify-content: end;
  width: 100%;
  height: 3rem;
`;

const OKButton = styled.button`
  padding: 4px;
  margin: 0 0.8rem;
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

const Exception = styled.div`
  font-size: 3rem;
  text-align: center;
  width: 100%;
  margin: auto 0;
  font-family: BMJUA;
`