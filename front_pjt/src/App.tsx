import { Route, Routes, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import mainCat from './assets/images/mainCat.png';

import LeftPage from './containers/leftPage';
import Home from './containers/userHome'
import Community from './containers/userCommunity/index'
import UserFooter from './Component/UserFooter'
import AdminFooter from './Component/AdminFooter'
import Map from './containers/userMap/index'
import MyPage from './containers/userMyPage/index'
import AdminHome from './containers/adminHome/index'
import HospitalList from './containers/adminHospital/HospitalList';
import AdminCatList from './containers/adminCatList/index'
import AdminDetailCatList from './containers/adminCatList/detailCatList'
import DetailEditPage from './containers/adminCatList/Tap1/detailEditPage';
import Admin from './containers/adminInfo/index'
import AdminSignUp from './containers/adminInfo/signUp'
import CommunityDetail from "./containers/userCommunity/CommunityDetail";
import NoticeDetail from "./containers/userCommunity/NoticeDetail";
import CommunityAdd from "./containers/userCommunity/CommunityAdd";
import RedirectHandler from "./containers/userMyPage/redirect";
import UserEdit from './containers/userMyPage/userEdit'
import UserScrap from './containers/userMyPage/userScrap'
import Login from './containers/userMyPage/login'
import AdminLogin from 'containers/adminInfo/login';

import MapDish1 from './containers/userMap/MapDish1';
import MapDish2 from './containers/userMap/MapDish2';
import MapDish3 from "./containers/userMap/MapDish3";
import OtherUserPage from './containers/userMyPage/otherUser'
import GlobalFont from './styles/GlobalFont';
import DishInfoDatas from './containers/adminCatList/Tap1/DishInfoDatas';
import CommunityEdit from "./containers/userCommunity/CommunityEdit";
import { CookiesProvider } from 'react-cookie';
import AdminIotAdd from 'containers/adminIot/AdminIotAdd';
import EditMapDish from 'containers/adminCatList/Map/MapListDishEdit';
import DishAllInfoDatas from 'containers/adminHome/DishAllDatas';
import AdminEdit from 'containers/adminInfo/adminEdit';
import NotFoundPage from "./containers/NotFoundPage";

const App: React.FC = () => {
  const location = useLocation()
  const [adminCheck, setAdminCheck] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('catadmin')) {
      setAdminCheck(true);
    } else {
      setAdminCheck(false);
    }
  }, [location]);


  return (
    <CookiesProvider>
      <Container>
        <GlobalFont />
        <SetDiv>
          <LeftDiv>
            <LeftPage />
          </LeftDiv>
          <RightDiv>
            <AppContainer>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user/auth/token" element={<RedirectHandler />} />
                <Route path="/map" element={<Map />} />
                {/* <Route path="/map/dish" element={<MapDishTab />} /> */}
                <Route path="/map/dish/:dishid/1" element={<MapDish1 />} />
                <Route path="/map/dish/:dishid/2" element={<MapDish2 />} />
                <Route path="/map/dish/:dishid/3" element={<MapDish3 />} />
                <Route path="/map/dish/:dishid/3/add" element={<CommunityAdd />} />
                <Route path="/map/dish/:dishid/3/detail/:communityid" element={<CommunityDetail />} />
                <Route path="/map/dish/:dishid/3/detail/:communityid/edit" element={<CommunityEdit />} />
                <Route path="/notice" element={<Community />} />
                <Route path="/community/add" element={<CommunityAdd />} />
                <Route path="/notice/detail/:noticeId" element={<NoticeDetail />} />
                <Route path="/community/detail/:communityid" element={<CommunityDetail />} />
                <Route path="/community/detail/:communityid/edit" element={<CommunityEdit />} />
                {/* <Route path="/user/:userid" element={<MyPage />} /> */}
                <Route path="/user" element={<MyPage />} />
                <Route path="/user/:userId" element={<OtherUserPage />} />
                <Route path="/user/login" element={<Login />} />
                <Route path="/user/edit" element={<UserEdit />} />
                <Route path="/user/scrap" element={<UserScrap />} />
                <Route path="/catadmin" element={<AdminHome />} />
                <Route path="/catadmin/home" element={<AdminHome />} />
                <Route path="/catadmin/iot" element={<AdminIotAdd />} />
                <Route path="/catadmin/catlist/hospital" element={<HospitalList />} />
                {/* <Route path="/catadmin/catlist/hospital/add" element={<HospitalAdd />} /> */}
                {/* <Route path="/catadmin/catlist/hospital/edit" element={<HospitalEdit />} /> */}
                <Route path="/catadmin/catlist/map/:state" element={<AdminCatList />} />
                <Route path="/catadmin/catlist/map/edit/:dishid" element={<EditMapDish />} />
                <Route path="/catadmin/catlist/report" element={<DishAllInfoDatas />} />
                <Route path="/catadmin/catlist/:catid" element={<AdminDetailCatList />} />
                <Route path="/catadmin/catlist/:catid/edit" element={<DetailEditPage />} />
                <Route path="/catadmin/catlist/:catid/datas" element={<DishInfoDatas />} />
                <Route path="/catadmin/admin" element={<Admin />} />
                <Route path="/catadmin/login" element={<AdminLogin />} />
                <Route path="/catadmin/admin/edit" element={<AdminEdit />} />
                <Route path="/catadmin/admin/signup" element={<AdminSignUp />} />
                <Route path={"*"} element={<NotFoundPage />} />
              </Routes>
            </AppContainer>
            <div>{adminCheck ? <AdminFooter /> : <UserFooter />}</div>
          </RightDiv>
        </SetDiv>
      </Container>
    </CookiesProvider>
  );
};

export default App;

const Container = styled.div`
  width: 100vw;
  position: fixed;
  background-color: #DEDBDB;
  height: 100vh;
  font-family:"BMJUA";
  /* background-image: url(${mainCat}); */
  @media ${(props) => props.theme.tablet} {
    background-image: none;
    background-color: ${(props) => props.theme.colors.lightPink};
  }
`;

const SetDiv = styled.div`
  display: flex;
  z-index: 1;
`;

const LeftDiv = styled.div`
  width: 50%;
  height: 100vh;
  font-size: 2rem;
  font-weight: bold;
  @media ${(props) => props.theme.tablet} {
    display: none !important;
    margin-left: 0;
  }
`;

const RightDiv = styled.div`
  /* width: 50%; */
  height: 100vh;
  position: relative;
  margin: 0 auto;
  @media ${(props) => props.theme.tablet} {
    margin: 0 auto;
  }
`;

const AppContainer = styled.div`
  width: 410px;
  height: calc(100% - 60px);
  background-color: white;

  @media ${(props) => props.theme.mobile} and (-webkit-min-device-pixel-ratio:0) {
    height: calc(100% - 160px);
  }
`;
