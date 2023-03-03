import { RightOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import CatFeet from 'assets/icon/catFeet.png'
import Card from './card'
import Tutorial from './tutorial'
import { fetchHungryIotImageData, fetchNearIotImageData, fetchVisitedIotImageData } from "Store/iot-actions";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { withCookies, Cookies, ReactCookieProps } from 'react-cookie';
import moment from 'moment';
import PopUpDC from '../../styles/PopUpDC';
import { fetchUserInfo } from '../../Store/user-action';
import { iotActions } from "Store/iot-slice";
import { LikeIot } from "apis/api/iot";
import { GetUserInfo } from "../../apis/api/user";
import { NoImage } from "Component/NoImage";
import useSelectorTyped, { useAppDispatch } from "../../Store";

interface MainProps extends ReactCookieProps {
}


function Home(props: MainProps) {

  const dispatch = useAppDispatch();

  const { newImages, hungryImages, visitedImages } = useSelectorTyped(state => ({
    fetchedUser: state.user.user,
    newImages: state.iot.newImages,
    hungryImages: state.iot.hungryImages,
    visitedImages: state.iot.visitedImages
  }));

  const [cookies, setCookies] = useState<Cookies | undefined>(props.cookies);
  const [hasCookies, setHasCookies] = useState<boolean>(false);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);

  useEffect(() => {
    if (cookies) {
      const currentCookies = cookies.get(PopUpDC.COOKIE_VALUE);
      setShowPopUp(!currentCookies);
      setHasCookies(!!currentCookies);
    } else {
      setCookies(props.cookies)
    }
  }, [cookies, props.cookies, showPopUp]);


  useEffect(() => {
    if (localStorage.getItem('token')) {
      GetUserInfo()
        .then(res => {
          if (res.data.id) {
            localStorage.setItem("userId", res.data.id);
          }
          if (res.data.nickName) {
            localStorage.setItem("userName", res.data.nickName);
          }
          if (res.data.profileImg) {
            localStorage.setItem("userPicture", res.data.profileImg);
          }
          if (res.data.isAgree) {
            localStorage.setItem("userIsAgree", res.data.isAgree);
          }
        })
        .catch(err => {
        });
    }
    if (localStorage.getItem('token')) {

      dispatch(fetchUserInfo())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchNearIotImageData());
    dispatch(fetchHungryIotImageData());
    dispatch(fetchVisitedIotImageData());
  }, [dispatch])


  const closePopUp = (selCheck: boolean): void => {
    if (cookies) {
      if (selCheck) {
        const expires: Date = moment().add(24, 'hours').toDate();
        cookies.set(PopUpDC.COOKIE_VALUE, true, { path: '/', expires });
      }
    }
    setShowPopUp(false);
  }


  const onChangeNewLike = (iotId: number) => {
    // newImages 좋아요
    LikeIot(iotId).then(() => dispatch(iotActions.isNewImagesLikeOn(iotId)));
  };

  const onChangeHungryLike = (iotId: number) => {
    // hungryImages 좋아요
    LikeIot(iotId).then(() => dispatch(iotActions.isHungryImagesLikeOn(iotId)));
  };

  const onChangeVisiteLike = (iotId: number) => {
    // visitedImages 좋아요
    LikeIot(iotId).then(() => dispatch(iotActions.isVisitedImagesLikeOn(iotId)));

  };

  return (
    <Container>
      <AnnouncementDiv>
        [공지] 새로운 냥그릇 추가되었습니다~! 사료주세요😻
      </AnnouncementDiv>

      {showPopUp && cookies && (localStorage.getItem('justClose') !== "true")
        ? <Tutorial closePopUp={closePopUp} />
        : <></>
      }


      <FlexDiv>
        <MainTitle>
          New<MainTitleHot>냥이</MainTitleHot>
          <img src={CatFeet} alt="catFeet" width="20px" height="20px" />
        </MainTitle>
        <Link to="/map">
          <AllListButton>
            이동 <RightOutlined />
          </AllListButton>
        </Link>
      </FlexDiv>
      {newImages.length === 0 ?
        <NoImage /> :
        <FlexImgDiv>
          {newImages && newImages.map((iotData: { id: number; }) => (
            <Card like={onChangeNewLike} key={iotData.id} iotData={iotData} />
          ))}

        </FlexImgDiv>
      }
      <FlexDiv>
        <MainTitle>
          <MainTitleHot>배고픈</MainTitleHot> 냥이
          <img src={CatFeet} alt="catFeet" width="20px" height="20px" />
        </MainTitle>
      </FlexDiv>
      {hungryImages.length === 0 ?
        <NoImage /> :
        <FlexImgDiv>
          {hungryImages && hungryImages.map((iotData: { id: number; }) => (
            <Card like={onChangeHungryLike} key={iotData.id} iotData={iotData} />
          ))}
        </FlexImgDiv>
      }
      <FlexDiv>
        <MainTitle>
          <MainTitleHot>내 냥그릇</MainTitleHot>에 들린 냥이들
          <img src={CatFeet} alt="catFeet" width="20px" height="20px" />
        </MainTitle>
      </FlexDiv>
      {visitedImages.length === 0 ?
        <>
          <NoImage />
          <div style={{ marginBottom: "5rem" }} />
        </>
        :
        <FlexImgDiv>
          {visitedImages && visitedImages.map((iotData: { id: number; }) => (
            <Card like={onChangeVisiteLike} key={iotData.id} iotData={iotData} />
          ))}
        </FlexImgDiv>
      }
    </Container>
  );
}


export default withCookies(Home);

const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.lightPink};
  height: 100vh;
  overflow: auto;
  padding-bottom: 80px;

  ::-webkit-scrollbar {
    display: none;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100vw;
  }
`;

const AnnouncementDiv = styled.div`
  color: black;
  background-color: ${(props) => props.theme.colors.pink};
  padding: 1rem;
  font-size: 0.8rem;
  font-weight: bolder;
  text-align: center;
`;

const FlexDiv = styled.div`
  display: flex;
  margin: 2rem 1rem;
  justify-content: space-between;
`;

const MainTitle = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: BMJUA;
`;
const AllListButton = styled.div`
  color: gray;
  border: none;
  box-shadow: none;
  margin: auto 0;
  font-size: 0.8rem;

  :hover {
    color: ${(props) => props.theme.colors.hotPink};
    font-weight: bold;
    /* font-size: 0.9rem; */
  }
`;
const MainTitleHot = styled.div`
  min-width: fit-content;
  color: ${(props) => props.theme.colors.hotPink};
  margin: 0 0.5rem;
`;

const FlexImgDiv = styled.div`
  display: flex;
  overflow: auto;
  white-space: nowrap;

  ::-webkit-scrollbar {
    display: none;
  }
`;

