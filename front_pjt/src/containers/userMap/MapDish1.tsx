import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Star from 'assets/images/star.png'
import ShiningStar from 'assets/images/ShiningStar.png'
import Vote from 'assets/images/vote.png'
import greenSmile from 'assets/images/greenSmile.png'
import blueSoso from 'assets/images/blueSoso.png'
import redBad from 'assets/images/redBad.png'
import axios from 'axios';
import Layout from "Component/Layout/Layout";

import SliderBar from './SliderBar'
import Header from 'Component/Header'
import TabDiv from './TabDiv'
import { Link } from 'react-router-dom'
import { FullscreenOutlined } from '@ant-design/icons'
import { Input } from 'antd';
import { fetchIotImageData } from 'Store/iot-actions'
import { useDispatch, useSelector } from 'react-redux'
import { LayoutFlex } from "../../Component/Layout/LayoutFlex";
import { addPreference } from "../../apis/api/preference";
import Swal from 'sweetalert2'
import { LikeIot } from 'apis/api/iot'
import { iotActions } from 'Store/iot-slice'
import IotImageCard from "../../Component/iotImageCard";
import { NoImage } from 'Component/NoImage'



function MapDish1() {
  // 냥그릇 id 확인
  const url = window.location.href.split("/");
  const dishId: number = Number(url[url.length - 2])

  // 투표
  const [vote1, setVote1] = useState(false)
  const [vote2, setVote2] = useState(false)
  const [vote3, setVote3] = useState(false)

  const [vote1Content, setVote1Content] = useState("")
  const [vote2Content, setVote2Content] = useState("")
  const [vote3Content, setVote3Content] = useState("")

  // 투표 선택
  function ChoiceVote1() {
    if (vote1 === false) {
      setVote2(false)
      setVote3(false)
      setVote1(true)
    } else {
      setVote1(false)
    }
  }

  function ChoiceVote2() {
    if (vote2 === false) {
      setVote1(false)
      setVote3(false)
      setVote2(true)
    } else {
      setVote2(false)
    }
  }

  function ChoiceVote3() {
    if (vote3 === false) {
      setVote2(false)
      setVote1(false)
      setVote3(true)

    } else {
      setVote3(false)
    }
  }

  // 선호도 이유 작성란
  const { TextArea } = Input;
  const onChange1 = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVote1Content(e.target.value)
  };
  const onChange2 = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVote2Content(e.target.value)
  };
  const onChange3 = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVote3Content(e.target.value)
  };

  const closeVote = () => {
    setVote1(false);
    setVote2(false);
    setVote3(false);
    setVote1Content("");
    setVote2Content("");
    setVote3Content("");
  }

  //  투표제출
  const sendVote = () => {
    if (vote1) {
      addPreference({ dishId: dishId, preferenceResult: 1, reason: vote1Content }).then(() =>
        Swal.fire('등록을 완료하였습니다.', '', 'success').then(closeVote));

    } else if (vote2) {
      addPreference({ dishId: dishId, preferenceResult: 0, reason: vote2Content }).then(() =>
        Swal.fire('등록을 완료하였습니다.', '', 'success').then(closeVote));

    } else if (vote3) {
      addPreference({ dishId: dishId, preferenceResult: -1, reason: vote3Content }).then(() =>
        Swal.fire('등록을 완료하였습니다.', '', 'success').then(closeVote));
      if (vote3Content.length < 5) {
        Swal.fire('의견을 5자 이상 입력해 주세요', '', 'error').then();
      }
    }
  }


  // @ts-ignore
  const iotImage = useSelector(state => state.iot.images);

  // Iot 이미지 좋아요
  const onChangeLike = (iotId: number) => {
    if (isLoggedIn) {
      // 좋아요 안한 상태
      LikeIot(iotId).then(() => dispatch(iotActions.isImagesLikeOn(iotId)));
    }
  };


  // @ts-ignore
  const isGettingIotImage = useSelector(state => state.iot.isGettingIotImage);

  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchIotImageData(dishId));

  }, [dispatch])


  // 냥그릇 초기 데이터 가져오기
  const [dishName, setDishName] = useState('')
  const [dishImg, setDishImg] = useState('')
  const [foodWeight, setFoodWeight] = useState(0)
  const [loadAddress, setLoadAddress] = useState('')
  const [foodWeightChangeDate, setFoodWeightChangeDate] = useState('')

  useState(() => {
    axios({
      method: 'get',
      url: `https://ourkitty.site/api/dishes/${dishId}`,

    })
      .then(res => {
        setDishName(res.data.dishName)
        setDishImg(res.data.dishImg)
        setFoodWeight(res.data.food_weight)
        setLoadAddress(res.data.loadAddress)
        setFoodWeightChangeDate(res.data.foodWeightChangeDate)
      })
      .catch(err => {
        Swal.fire('존재하지 않는 냥그릇입니다.', '', 'error').then(() =>
          window.history.back()
        );
      });
  })


  // 냥그릇 좋아요
  const userToken = localStorage.getItem('token')
  let userLikedDish: number[] = [];
  const [likeDish, setLikeDish] = useState(false)

  useEffect(() => {
    if (userToken) {
      axios({
        method: 'get',
        url: 'https://ourkitty.site/api/dishes/like',
        headers: {
          Authorization: userToken,
        },
      })
        .then(res => {
          res.data.dishList.forEach((element: { id: number; }) => {
            userLikedDish.push(element.id)
          })
          setLikeDish(userLikedDish.includes(dishId))
        })
        .catch(err => {
          alert(err)
        });
    }
  }, [likeDish])

  // 로그인 여부 확인
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    if (typeof localStorage.getItem('token') === 'string') {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const onChangeLikeDish = () => {
    if (isLoggedIn) {
      axios({
        method: 'post',
        url: `https://ourkitty.site/api/dishes/${dishId}/like`,
        headers: {
          Authorization: userToken,
        },
      })
        .then(res => {
          setLikeDish((prev: boolean) => !prev)
        })
        .catch(err => {
          alert(err)
        });
    }
    else {
      Swal.fire('로그인 해주세요~', '', 'error');
    }
  };

  return (
    <>
      <Header />
      <TabDiv dishId={dishId} />
      <Layout>
        <SDiv>{dishImg ?
          <ImgDiv src={dishImg} alt="TestCat" /> :
          <NoImage />
        }

          <FlexDiv>
            <MainTitle>{dishName}</MainTitle>
            <ButtonDiv>
              <LikeButton onClick={onChangeLikeDish}>
                <TextDiv>관심 냥그릇 등록</TextDiv>
                {likeDish ?
                  <IconDiv src={ShiningStar} alt="ShiningStar" />
                  :
                  <IconDiv src={Star} alt="Star" />
                }
              </LikeButton>
            </ButtonDiv>
          </FlexDiv>

          <UpdateDivFinal>{loadAddress}</UpdateDivFinal>

          <MainTitle>남은 사료량</MainTitle>
          <SliderBar current={100 - foodWeight} />

          <FlexDiv>
            <MainTitle>최근 방문한 고양이</MainTitle>
            <ButtonDiv>
              <LikeButton>
                <Link to={`/map/dish/${dishId}/2`}>
                  <SuvTitle style={{ cursor: "pointer", marginRight: "1rem" }}>전체보기</SuvTitle>
                </Link>
                <Link to={`/map/dish/${dishId}/2`}>
                  <FullscreenOutlined />
                </Link>
              </LikeButton>
            </ButtonDiv>
          </FlexDiv>

          <SDiv>
            <FlexImgDiv>
              {isGettingIotImage ? <NoImage /> :
                iotImage.map((content: any) => (
                  <IotImageCard key={content.id} like={onChangeLike} iotData={content} size={"150px"} width={"100%"} />
                ))
              }
            </FlexImgDiv>
          </SDiv>

          <LayoutFlex gap={"4px"} direction={"column"} justify={"flex-start"} width={"100%"} marginBottom={'100px'}>
            <FlexDiv style={{ justifyContent: "start" }}>
              <MainTitle>이 위치 어때요?</MainTitle>
              <IconDiv alt="Vote" src={Vote} />
            </FlexDiv>

            {/*선호도 아이콘 (선호 중립 반대*/}
            <LayoutFlex direction={"column"} justify={"center"}>
              <FlexDiv style={{ justifyContent: "center" }}>
                <VoteDiv style={vote1 ? { background: 'lightgray' } : { background: '#F4EDED' }}
                  onClick={() => ChoiceVote1()}>
                  <VoteIcon src={greenSmile} alt="smileIcon" />
                </VoteDiv>
                <Vote2 style={vote2 ? { background: 'lightgray' } : { background: '#F4EDED' }}
                  onClick={() => ChoiceVote2()}>
                  <VoteIcon src={blueSoso} alt="smileIcon" />
                </Vote2>
                <Vote3 style={vote3 ? { background: 'lightgray' } : { background: '#F4EDED' }}
                  onClick={() => ChoiceVote3()}>
                  <VoteIcon src={redBad} alt="smileIcon" />
                </Vote3>
              </FlexDiv>

              {/*선호도 이유작성란*/}
              {/*선호도 선호 이유*/}
              {vote1 ? <InputDiv>
                <TextArea showCount
                  style={{ height: "15vh", width: "100vw", resize: 'none' }}
                  maxLength={200} onChange={onChange1} value={vote1Content}
                />
              </InputDiv> : <></>}

              {/*선호도 중립 이유*/}
              {vote2 ? <InputDiv>
                <TextArea showCount
                  style={{ height: "15vh", width: "100vw", resize: 'none' }}
                  maxLength={200} onChange={onChange2} value={vote2Content}
                />
              </InputDiv> : <></>}

              {/*선호도 반대 이유*/}
              {vote3 ? <InputDiv>
                <TextArea showCount
                  style={{ height: "15vh", width: "100vw", resize: 'none' }}
                  maxLength={200} onChange={onChange3} value={vote3Content}
                />
              </InputDiv> : <></>}
            </LayoutFlex>

            {(vote1 || vote2 || vote3) && <OKButton onClick={sendVote}> 의견등록 </OKButton>}
          </LayoutFlex>
        </SDiv>
      </Layout>
    </>
  );
}

export default MapDish1;

const SDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`

const UpdateDivFinal = styled.div`
  text-align: end;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  margin-left: 1rem;
  right: 0;
`;


const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  @media ${(props) => props.theme.mobile} {
    /* width: 100vw; */
  }
`;

const FlexImgDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MainTitle = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
`;

const TextDiv = styled.div`
  padding-top: 0.2rem;
`;


const SuvTitle = styled.div`
  padding-top: 0.2rem;
  cursor: pointer;
  font-family: "BMYEONSUNG";
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: auto 0;
  padding-bottom : 0.2rem;
`;
const ImgDiv = styled.img`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 6px;
  width: 100%;
  height: fit-content;
  margin-bottom: 2rem;
`;

const LikeButton = styled.div`
  display: flex;
  right: 0;
  cursor: pointer;
`;

const IconDiv = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 0.5rem;
  
`;

const VoteDiv = styled.div`
  width: 80%;
  text-align: center;
  border-radius: 10px 0 0 0;
  border: 1px solid lightgray;
  cursor: pointer;
  margin-top: 1rem;
  height: 50px;
    @media ${(props) => props.theme.mobile} {
    width: 30vw;
  }
`;
const Vote2 = styled(VoteDiv)`
  border-radius: 0;
  @media ${(props) => props.theme.mobile} {
    width: 30vw;
  }
`;
const Vote3 = styled(VoteDiv)`
  border-radius: 0 10px 0 0;
  @media ${(props) => props.theme.mobile} {
    width: 30vw;
  }
`;

const VoteIcon = styled.img`
  width: fit-content;
  height: 2rem;
  margin-top: 0.5rem;
  @media ${(props) => props.theme.mobile} {
    width: 10vw;
    height: 35px;
  }
`;

const InputDiv = styled.div`
  background-color: lightgray;
  width: 100%;
  display: flex;
  /* height: 9.5rem; */
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom:1.5rem;
  margin-bottom : 1rem;
`;

const OKButton = styled.button`
  width: 30%;
  margin: 1rem auto;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.hotPink};
  color: white;
  :hover {
    border: 2px solid ${(props) => props.theme.colors.pink};
  }
`;
