import { useEffect, useState } from 'react';
import styled from 'styled-components';
import DishDetail from './dishDetail';
import { getAdminDishes } from "apis/api/dish";
import MapList from './MapList';
import CatPin from 'assets/icon/cat4.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { mapAction } from "../../../Store/map-slice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";


declare global {
    interface Window {
        kakao: any;
    }
}

function KakaoMap() {

    // @ts-ignore
    const mapWatchId = useSelector(state => state.map.watchId);

    const firstLocation = useSelector((state: any) => state.map.userLocation);

    const dispatch = useDispatch();

    const [userLocationMarker, setUserLocationMarker] = useState<any>(null);
    const [userLocation, setUserLocation] = useState<any>(null);
    const [kakaoMap, setKakaoMap] = useState<any>(null);

    const url = window.location.href.split("/");
    const mapState: boolean = Boolean(Number(url[url.length - 1]));

    const [mapMode, setMapMode] = useState(mapState);

    const onList = () => {
        setMapMode(false)
    };
    const onMap = () => {
        setMapMode(true)
    };


    const [detail, setDetail] = useState();
    const [detailDish, setDetailDish] = useState();

    const openDetail = (type: any, obj: any) => {
        setDetail(type);

        if (type === 'dish') {
            setDetailDish(obj);
        }
    };

    // 마커들을 생성하는 함수
    const addMarkers = (list: any, map: any) => {

        // 마커 생성을 위한 이미지 옵션
        const imageSize = new window.kakao.maps.Size(45, 45);
        const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
        const markerImage = new window.kakao.maps.MarkerImage(CatPin, imageSize, imageOption);

        list.forEach((item: any) => {
            // 마커 생성
            const marker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(item.lat, item.lon),
                image: markerImage
            });

            // 마커를 지도 상에 설정
            marker.setMap(map);

            // 해당 마커 클릭 이벤트 등록
            window.kakao.maps.event.addListener(marker, 'click', () => {
                openDetail('dish', item);
            });
        });
    };

    // 자기 위치로 가기 버튼 클릭 시 실행될 함수
    const moveToUser = () => {

        if (!userLocation) {
            Swal.fire(
                "현재 위치를 불러 올 수 없습니다.",
                '',
                'error'
            ).then()

            return;
        }

        kakaoMap.setCenter(new window.kakao.maps.LatLng(userLocation.lat, userLocation.lon));
    }

    // 사용자 위치 정보 가져오기 성공 시 실행할 함수
    const locationGetSuccessHandle = (position: any) => {
        // 사용자의 현재 위치를 새로 받아온 값으로 갱신한다.
        setUserLocation({ lat: position.coords.latitude, lon: position.coords.longitude });

        dispatch(mapAction.setUserLocation({ lat: position.coords.latitude, lon: position.coords.longitude }));
    };

    // 사용자 위치 정보 받아오는 이벤트 등록함수
    const getUserLocation = () => {
        // 위치 정보를 받아올 수 있다면 수행하고 없다면 에러 메시지
        if (navigator.geolocation) {
            // 사용자의 위치 정보를 추적하며 변화가 있다면 수행
            let watchId = navigator.geolocation.watchPosition(position => locationGetSuccessHandle(position), null, { enableHighAccuracy: true });

            dispatch(mapAction.setWatchId(watchId));

        }
    };

    // 사용자의 위치정보가 변하면 실행될 useEffect
    useEffect(() => {

        // 사용자 위치정보가 없다면 그대로 끝
        if (userLocation == null || kakaoMap == null) {
            return;
        }

        if (userLocationMarker) {
            // 기존에 찍은 사용자 위치에 해당하는 마커가 있다면 위치를 옮겨준다.
            userLocationMarker.setPosition(new window.kakao.maps.LatLng(userLocation.lat, userLocation.lon));
            userLocationMarker.setMap(kakaoMap);
        } else {
            // 기존에 찍은 사용자 위치에 해당하는 마커가 없다면 새로운 마커를 생성 후 userLocationMarker 로 저장한다.
            const newMarker = new window.kakao.maps.CustomOverlay({
                map: kakaoMap,
                position: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lon),
                content: '<div class="user-location"><div class="user-location-inside"/></div>'
            });
            newMarker.setMap(kakaoMap);
            setUserLocationMarker(newMarker);

            // 지도 초기 설정이므로 사용자 위치로 이동하게 한다.
            kakaoMap.setCenter(new window.kakao.maps.LatLng(userLocation.lat, userLocation.lon));
        }
    }, [userLocation])

    // 초기에 실행될 useEffect, 카카오 지도를 사용하기 위한 script 를 헤더에 심어준다.
    useEffect(() => {

        // 지도 모드일 경우 카카오 맵 초기 로딩
        if (mapMode) {
            const mapScript = document.createElement('script');

            mapScript.async = true;
            mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=ff2962af82ba5b9d23c6017f4379d5f9&autoload=false&libraries=services`;
            mapScript.addEventListener('load', onLoadKakaoMap);
            document.head.appendChild(mapScript);

            return () => mapScript.removeEventListener('load', onLoadKakaoMap);
        }
        // eslint-disable-next-line
    }, [mapMode]);

    // 카카오 지도 초기 로딩
    const onLoadKakaoMap = () => {
        window.kakao.maps.load(() => {
            const container = document.getElementById('userMap');
            const options = {
                center: new window.kakao.maps.LatLng(35.09618880732455, 128.85360467640996),
            };
            const map = new window.kakao.maps.Map(container, options);

            setKakaoMap(map);

            getAdminDishes().then(function (response: any) {
                addMarkers(response.data, map);
            })
                .catch(function (error: any) {
                });

            setUserLocation(firstLocation);

            if (mapWatchId !== 0) {
                // 기존에 실행 중인 Watch 함수가 있다면 종료시킨다.
                navigator.geolocation.clearWatch(mapWatchId);
            }

            // 새롭게 위치 추적하는 watch 함수 실행
            getUserLocation();
        });
    };

    return (
        <Container>
            {mapMode ?
                <ModeButton onClick={onList}>리스트 보기</ModeButton> :
                <ModeButton onClick={onMap}>지도 보기</ModeButton>
            }
            {/* <Switch defaultChecked style={{ color: "blue", position: "absolute", zIndex: "2", top: "2rem", right: "10%", fontSize: '2rem', opacity: "0.82", border: "dashed 1px blue" }} onChange={onChange} /> */}
            {mapMode ?
                <>
                    <FontAwesomeIcon icon={faLocationArrow}
                        style={{
                            color: "white",
                            position: "absolute",
                            zIndex: "2",
                            top: "4rem",
                            left: "5%",
                            fontSize: '1.8rem',
                            backgroundColor: "blue",
                            borderRadius: "10%",
                            border: "solid 2px black",
                            padding: "0.2rem"
                        }}
                        onClick={moveToUser}
                    />
                    <MapContainer id="userMap" />
                    <DetailContainer>
                        {detail === 'dish' &&
                            <Detail><DishDetail detailDish={detailDish} openDetail={openDetail} /></Detail>}
                    </DetailContainer>
                </>
                :
                <>
                    <MapList />
                </>
            }
        </Container>
    );
}

export default KakaoMap;

const Container = styled.div`
  width: 100%;
  height: 100%;

  position: relative;

  .user-location {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    // border: 0.3px solid black;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);

    position: relative;
    background-color: white;

    animation: white 5s linear infinite;
  }

  .user-location-inside {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: blue;
    z-index: 5;

    position: absolute;

    animation: sparkle 5s linear infinite;
  }

  @keyframes sparkle {
    0% {
      transform: scale(0.6);
    }
    50% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(0.6);
    }
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
`;

const DetailContainer = styled.div`
  width: 100%;
  position: absolute;
  left: 20%;
  bottom: 2rem;
  margin-bottom: 35px;
  z-index: 1;

`

const Detail = styled.div`
  width: 60%;
  height: 13vh;

  @media ${(props) => props.theme.mobile} {
    width: 60vw;

    left: 20vw;
  }
`;

const ModeButton = styled.button`
  position: absolute;
  z-index: 2;
  top: 0.5rem;
  left: 1rem;
  padding: 5px 10px;
  border-radius: 5px;
  opacity: 0.8;
`

// const  = styled.div`
//
// `;

// background-color: ${(props) => props.theme.colors.lightPink};
