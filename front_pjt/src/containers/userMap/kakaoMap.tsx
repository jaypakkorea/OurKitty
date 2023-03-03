import { useEffect, useState } from 'react';
import styled from 'styled-components';
import DishDetail from './dishDetail';
import HospitalDetail from './hospitalDetail';
import { getDishes } from "apis/api/dish";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import HospitalPin from 'assets/icon/hospital.svg'
import CatPin from 'assets/icon/cat4.svg'
import { useDispatch, useSelector } from "react-redux";
import { mapAction } from "../../Store/map-slice";
import Swal from "sweetalert2";
import { getMapHospitals } from "../../apis/api/hospital";

declare global {
    interface Window {
        kakao: any;
    }
}

interface IDetailType {
    [key: string]: JSX.Element;
}

function KakaoMap() {

    // @ts-ignore
    const mapWatchId = useSelector(state => state.map.watchId);

    const firstLocation = useSelector((state: any) => state.map.userLocation);

    const dispatch = useDispatch();

    const [userLocationMarker, setUserLocationMarker] = useState<any>(null);
    const [userLocation, setUserLocation] = useState<any>(null);
    const [kakaoMap, setKakaoMap] = useState<any>(null);
    const [markers, setMarkers] = useState<any[]>([]);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<object | null>(null);

    const openDetail = (type: string, object: object) => {
        setSelectedType(type);
        setSelectedItem(object);
    };

    // 디테일 팝업 창
    const detailType: IDetailType = {
        dish: <DishDetail detailDish={selectedItem} openDetail={openDetail} />,
        hospital: <HospitalDetail detailHospital={selectedItem} openDetail={openDetail} />,
    };


    // 지도 최초 접근, 지도 이동 등 시에 동적으로 지도 내부 크기 만큼 영억에 있는 동물병원, 냥그릇 정보들을 불러올 함수
    const setMap = (map: any) => {

        // 마커 리셋
        markers.forEach((marker: any) => marker.setMap(null));
        // 마커 배열 초기화
        markers.length = 0;

        // 지도 영역정보
        let bounds = map.getBounds();
        // 영역정보의 남서쪽 정보
        let swLatlng = bounds.getSouthWest();
        // 영역정보의 북동쪽 정보
        let neLatlng = bounds.getNorthEast();

        // 현재 지도 영역 범위 ( 이 값을 이용해서 서버와 통신 )
        const params = {
            swLat: swLatlng.getLat(),
            swLng: swLatlng.getLng(),
            neLat: neLatlng.getLat(),
            neLng: neLatlng.getLng(),
        };

        // 지도의 범위에 해당하는 냥그릇들을 불러오기
        getDishes(params)
            .then(response => addMarkers(response.data, map, 'dish'))
            .catch(error => console.error(error));

        // TODO : 지도의 범위에 해당하는 병원들을 불러오기
        getMapHospitals(params)
            .then(response => addMarkers(response.data, map, 'hospital'))
            .catch(error => console.error(error));

    };

    // 마커들을 생성하는 함수
    const addMarkers = (list: any, map: any, type: string) => {
        let imageSrc, newMarkers: any = [];

        // 마커 이미지를 타입에 따라 결정
        if (type === 'dish') {
            imageSrc = CatPin;
        } else {
            imageSrc = HospitalPin;
        }

        // 마커 생성을 위한 이미지 옵션
        const imageSize = new window.kakao.maps.Size(45, 45);
        const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        // 받아온 정보들에 대한 마커를 생성
        list.forEach((item: any) => {
            const marker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(item.lat, item.lon),
                image: markerImage
            });

            // newMarkers 배열에 마커를 추가하고 지도위에 표시
            newMarkers.push(marker);
            marker.setMap(map);

            // 클릭 시 팝업창을 띄우는 클릭 이벤트 등록
            window.kakao.maps.event.addListener(marker, 'click', () => {
                openDetail(type, item);
            });
        });

        // newMarkers 의 내용을 추가
        setMarkers(markers.concat(newMarkers));
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

        } else {
            console.error('Geolocation is not supported by this browser.');
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
        const mapScript = document.createElement('script');

        mapScript.async = true;
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=ff2962af82ba5b9d23c6017f4379d5f9&autoload=false`;
        mapScript.addEventListener('load', onLoadKakaoMap);
        document.head.appendChild(mapScript);

        return () => mapScript.removeEventListener('load', onLoadKakaoMap)
        // eslint-disable-next-line
    }, []);

    // 카카오 지도 초기 로딩
    const onLoadKakaoMap = () => {
        window.kakao.maps.load(() => {
            const container = document.getElementById('userMap');
            const options = {
                center: new window.kakao.maps.LatLng(35.09618880732455, 128.85360467640996),
            };
            const map = new window.kakao.maps.Map(container, options);

            setKakaoMap(map);

            setUserLocation(firstLocation);

            if (mapWatchId !== 0) {
                // 기존에 실행 중인 Watch 함수가 있다면 종료시킨다.
                navigator.geolocation.clearWatch(mapWatchId);
            }

            // 새롭게 위치 추적하는 watch 함수 실행
            getUserLocation();

            // 냥그릇 지도 데이터 초기 로딩
            setMap(map);

            //지도 이동 시 이벤트
            window.kakao.maps.event.addListener(map, 'dragend', () => {
                setMap(map);
            });

            // 지도가 확대 또는 축소 시 이벤트
            window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
                setMap(map);
            });


        });
    };

    return (
        <Container>
            <FontAwesomeIcon icon={faLocationArrow}
                style={{
                    color: "white",
                    position: "absolute",
                    zIndex: "2",
                    top: "2rem",
                    left: "10%",
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
                {selectedType && <Detail>{detailType[selectedType]}</Detail>}
            </DetailContainer>
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
  @media ${(props) => props.theme.mobile} {
    bottom: calc(100%-160px);
    margin-bottom: 135px;
  }
`

const Detail = styled.div`
  width: 60%;
  height: 110px;

  @media ${(props) => props.theme.mobile} {
    width: 60vw;

    left: 20vw;
  }
`;
