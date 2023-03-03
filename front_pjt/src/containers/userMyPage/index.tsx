import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { MenuProps, Dropdown, Avatar, Tabs, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { LogoutOutlined, PlusOutlined, CameraOutlined, FileTextOutlined } from '@ant-design/icons';
import Layout from "Component/Layout/Layout";
import Container from 'Component/Layout/Container';
import { useNavigate } from 'react-router';
import catFeet from "assets/icon/catFeet.png";
import {
  fetchProfileUserCommunityListCount,
  fetchProfileUserDishList,
  fetchProfileUserLikeCatPhoto,
  fetchUserInfo
} from '../../Store/user-action';
import Load from "../../Component/Load";
import { LayoutFlex } from "../../Component/Layout/LayoutFlex";
import { IotImages } from "../../Store/Type/iotImagesType";
import IotImageCard from "../../Component/iotImageCard";
import { LikeIot } from "../../apis/api/iot";
import { iotActions } from "../../Store/iot-slice";
import { InfiniteScrollCommunity } from "../../Component/InfiniteScrollCommunity";
import useSelectorTyped, { useAppDispatch } from "../../Store";


const MyPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    fetchedUser,
    userCommunityCount,
    isGettingUserLikeCatPhoto,
    isGettingUserDishList
  } = useSelectorTyped(state => ({
    fetchedUser: state.user.user,
    userCommunityCount: state.community.userCommunityCount,
    isGettingUserLikeCatPhoto: state.user.isGettingUserLikeCatPhoto,
    isGettingUserDishList: state.user.isGettingUserDishList
  }));

  const userId = fetchedUser.userId
  const userLikeCatPhoto = fetchedUser.userLikeCatPhoto
  const userLikeDishList = fetchedUser.userDishList;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUserInfo())
    }
  }, [dispatch])

  useEffect(() => {
    if (userId && userId !== 0) {
      dispatch(fetchProfileUserDishList(userId));
      dispatch(fetchProfileUserCommunityListCount(userId))
      dispatch(fetchProfileUserLikeCatPhoto(userId))
    }
  }, [dispatch, userId])

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const onLogoutModal = () => {
    setLogoutModalOpen(true)
  };

  const onCloseLogoutModal = () => {
    setLogoutModalOpen(false)
  };

  const onLogout = () => {
    localStorage.clear();
    window.location.replace("/");
    // setLogoutModalOpen(false)
  };


  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a href='user/scrap'> <FontAwesomeIcon icon={faBookmark} /> 저장한 글</a>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={onLogoutModal}><LogoutOutlined /> 로그아웃</div>
      ),
    },
  ];

  const onChangeLike = (iotId: number) => {
    // 좋아요 안한 상태
    LikeIot(iotId).then(() => dispatch(iotActions.isImagesLikeOn(iotId)));
  };


  return (
    <Container>
      <Layout>
        <SDiv>
          <FlexboxFirst>
            <NameContent>{fetchedUser.userName}</NameContent>
            <Dropdown menu={{ items }}>
              <FontAwesomeIcon icon={faBars} style={{ cursor: 'pointer', fontSize: '1.3rem' }} />
            </Dropdown>
          </FlexboxFirst>

          <FlexboxFirst>
            {fetchedUser.userPicture ?
              <UserProfilImg src={fetchedUser.userPicture} alt={catFeet} />
              :
              <MyAvatar size={64}
                icon={<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#FFAAC7"
                  stroke="#FFAAC7">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                    stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0"
                      fill="#121212"></path>
                  </g>
                </svg>} />
            }

            <UserInfoDiv>
              <div>{userCommunityCount}</div>
              <div>게시물</div>
            </UserInfoDiv>
            <UserInfoDiv>
              <div>{userLikeDishList.length}</div>
              <div>관심 냥그릇</div>
            </UserInfoDiv>
          </FlexboxFirst>

          <EditProfileDiv onClick={() => navigate('/user/edit')}>프로필 편집</EditProfileDiv>


          {
            isGettingUserDishList ? <Load /> :

              (userLikeDishList.length === 0) ?
                <>
                  <FlexboxFirst>
                    <UserInfoDiv>
                      <NullLikedDish> <PlusOutlined /> </NullLikedDish>
                      <div>-</div>
                    </UserInfoDiv>
                  </FlexboxFirst>
                </>
                :
                <FlexboxDish>
                  {userLikeDishList && userLikeDishList.map((element: any) => (
                    <MyLink to={`/map/dish/${element.id}/1`}>
                      <MainProfilImg src={element.dishImg} alt={catFeet} />
                      <DishInfoDiv> {element.dishName} </DishInfoDiv>
                    </MyLink>
                  ))}
                </FlexboxDish>
          }

          <MyTap>
            <Tabs.TabPane tab={<FileTextOutlined
              style={{ fontSize: '150%', marginLeft: "5rem", marginRight: "7rem" }} />} key="tab1">
              {userId && <InfiniteScrollCommunity type={"Profile"} userId={userId} />}
            </Tabs.TabPane>
            <Tabs.TabPane tab={<CameraOutlined style={{ fontSize: '150%', }} />} key="tab2">
              <LayoutFlex justify={"flex-start"} flexWrap={"wrap"}>
                {
                  isGettingUserLikeCatPhoto ? <Load /> :
                    userLikeCatPhoto.length !== 0 ?
                      userLikeCatPhoto.map((iotImage: IotImages) =>
                      (<IotImageCard key={iotImage.id} like={onChangeLike}
                        iotData={iotImage} />))
                      :
                      <Exception>저장한 <p></p> 사진이 없어요~</Exception>
                }
              </LayoutFlex>
            </Tabs.TabPane>
          </MyTap>

          <LogoutModal open={logoutModalOpen}
            centered
            closable={false}
            footer={null}
          >
            <LogoutToggle>
              <p>로그아웃하시겠습니까? </p>
            </LogoutToggle>
            <LogoutToggleButton onClick={onCloseLogoutModal}>아니요 <LogoutToggleSpan
              onClick={onLogout}>네</LogoutToggleSpan> </LogoutToggleButton>
          </LogoutModal>
        </SDiv>
      </Layout>
    </Container>
  );
}

export default MyPage;


const FlexboxFirst = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const FlexboxDish = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  overflow: auto;
  white-space: nowrap;

  ::-webkit-scrollbar {
    display: none;
  }
`
const SDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 16px;
  gap: 24px;

`

const NameContent = styled.div`
  margin-left: 1rem;
  font-size: 1.5rem;
  font-family: BMJUA;
  width: 100%;
`


const UserInfoDiv = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
`


const MyAvatar = styled(Avatar)`
  background-color: lightpink;
  border: 3px solid black;
`;

const EditProfileDiv = styled.div`
  font-size: 1rem;
  text-align: center;
  width: 100%;
  background-color: lightgray;
  border-radius: 5px;
  letter-spacing: 5px;
  padding: 0.2rem;
  
  &:hover{
    cursor: pointer;
  }
`
const DishInfoDiv = styled.div`
  font-size: 0.8rem;
  margin-top: 1rem;
  width: 100%;
  text-align: center;
`

const NullLikedDish = styled.div`
  background-color: #b6b6b6;
  height: 58px;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  width: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MainProfilImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin: 0;
  border: 1px solid gray;
`;

const UserProfilImg = styled.img`
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  border: 1px solid black;
`;


const MyTap = styled(Tabs)`
  width: 100%;
  gap: 8px;
  font-family: BMJUA;

  .ant-tabs-nav-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .ant-tabs-nav-scroll {
    display: flex;
    justify-content: center;
  }

  .ant-tabs-ink-bar {
    display: none;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #FF4081 !important;
    font-weight: 500;
  }
`;

const Exception = styled.div`
  font-size: 3rem;
  text-align: center;
  width: 100%;
  margin: auto 0;
  font-family: BMJUA;
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

const LogoutToggle = styled.div`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
  margin-right: 1rem;
  margin-left: 1rem;
  font-family: BMJUA;
  line-height: 0.6;
`
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

const MyLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
  padding: 0;
  width: 100px;
  height: 100px;
`