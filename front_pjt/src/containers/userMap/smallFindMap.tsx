import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CatPin from 'assets/icon/cat4.svg'
import { Input } from "antd";
import { useDispatch } from 'react-redux';
import { fetchDishLocation } from 'Store/dish-actions';

interface Position {
    lat: number,
    lon: number,
}

declare global {
    interface Window {
        kakao: any;
    }
}


function SmallFindMap(props: any) {
    const { lat, lon, loadAddress, reload } = props;

    const [selectedPosition, setSelectedPosition] = useState<Position>({ lat, lon });
    const [marker, setMarker] = useState<any>(null);
    const [kakaoMap, setKakaoMap] = useState<any>(null)
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [placeholder, setPlaceholder] = useState<string>(loadAddress);
    const [searchResult, setSearchResult] = useState<any[]>([]);

    const dispatch = useDispatch();

    // 초기에 실행될 useEffect, 카카오 지도를 사용하기 위한 script 를 헤더에 심어준다.
    useEffect(() => {
        reload && onLoadKakaoMap();
    }, [reload]);

    // 주소-좌표 변환 객체를 생성
    // const geocoder = new window.kakao.maps.services.Geocoder();

    const searchPlace = (data: any, status: any, pagination: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
            setSearchResult(data);
        } else {
            setSearchResult([]);
        }
    }

    const putMarkerOnMap = (lat: any, lon: any, map?: any) => {

        if (marker === null) {
            // 마커 생성을 위한 이미지 옵션
            const imageSrc = CatPin;
            const imageSize = new window.kakao.maps.Size(45, 45);
            // const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

            // 해당 위치에 마커 생성
            const newMarker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(lat, lon),
                image: markerImage
            });

            // 지도에 마커 추가
            if (kakaoMap === null) {
                newMarker.setMap(map);
            } else {
                newMarker.setMap(kakaoMap);
            }
            setMarker(newMarker);
        } else {
            marker.setPosition(new window.kakao.maps.LatLng(lat, lon));

            // 지도에 마커 추가
            if (kakaoMap == null) {
                marker.setMap(map);
            } else {
                marker.setMap(kakaoMap);
            }
        }
    }

    const moveMap = (address: string, placeName: string) => {

        // 지도 로딩 전 실행 막음
        if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
            return;
        }

        let geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result: any, status: any) => {
            // 정상적으로 검색이 완료 되면
            if (status === window.kakao.maps.services.Status.OK) {
                const lat = result[0].y;
                const lon = result[0].x;
                let movePosition = new window.kakao.maps.LatLng(lat, lon);

                kakaoMap.setCenter(movePosition);
                // 초기화
                setSearchKeyword("");
                // 검색 결과 보여주기
                setPlaceholder(`${address} ${placeName}`);
                // 마커 표시
                putMarkerOnMap(lat, lon);
                //@ts-ignore
                dispatch(fetchDishLocation(lat, lon, address));
            }
        });
    }

    // 검색 키워드가 변경되면 실행될 useEffect
    useEffect(() => {
        // 지도 로딩 전 실행 막음
        if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
            return;
        }

        const ps = new window.kakao.maps.services.Places();

        if (searchKeyword !== "" && ps !== null) {
            ps.keywordSearch(searchKeyword, searchPlace);
        } else {
            setSearchResult([]);
        }
    }, [searchKeyword]);

    // 선택한 위치가 변경되면 실행될 useEffect
    useEffect(() => {

        if (kakaoMap == null) {
            return;
        }

        setSearchKeyword("");
        putMarkerOnMap(selectedPosition.lat, selectedPosition.lon);

        // 선택한 위치에 따라 주소 검색
        const coord = new window.kakao.maps.LatLng(selectedPosition.lat, selectedPosition.lon);

        let geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const address = result[0].address.address_name;

                //@ts-ignore
                dispatch(fetchDishLocation(selectedPosition.lat, selectedPosition.lon, address));
                setPlaceholder(address);
            }
        });

    }, [dispatch, kakaoMap, selectedPosition]);

    // 초기에 실행될 useEffect, 카카오 지도를 사용하기 위한 script 를 헤더에 심어준다.
    useEffect(() => {
        // 지도 모드일 경우 카카오 맵 초기 로딩
        const mapScript = document.createElement('script');

        mapScript.async = true;
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=ff2962af82ba5b9d23c6017f4379d5f9&autoload=false&libraries=services`;
        mapScript.addEventListener('load', onLoadKakaoMap);
        document.head.appendChild(mapScript);

        return () => mapScript.removeEventListener('load', onLoadKakaoMap);
        // eslint-disable-next-line
    }, []);

    // 카카오 지도 초기 로딩
    const onLoadKakaoMap = () => {
        const isLocation = lat ? true : false;
        const latInit = lat ? lat : 35.09618880732455;
        const lonInit = lon ? lon : 128.85360467640996;

        window.kakao.maps.load(() => {
            const container = document.getElementById('findMap');
            const options = {
                center: new window.kakao.maps.LatLng(latInit, lonInit),
                scrollwheel: false,
                disableDoubleClick: true,
                disableDoubleClickZoom: true,
            };
            const map = new window.kakao.maps.Map(container, options);
            setKakaoMap(map);

            if (isLocation) {
                putMarkerOnMap(latInit, lonInit, map);
            }

            //지도 클릭 시 이벤트
            window.kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
                let lat = mouseEvent.latLng.Ma;
                let lon = mouseEvent.latLng.La;

                setSelectedPosition({ lat, lon });
            });
        });
    };

    return (
        <Container>
            <SearchBar>
                <SearchBarInput placeholder={placeholder} onChange={(event) => setSearchKeyword(event.target.value)}
                    value={searchKeyword} />
                <SearchList>
                    {
                        searchResult.map((value, index) =>
                            <SearchResultItem key={index}
                                onClick={() => moveMap(value.address_name, value.place_name)}>
                                <SearchResultContent
                                    dangerouslySetInnerHTML={{ __html: value.place_name }}></SearchResultContent>
                                <SearchResultContent
                                    dangerouslySetInnerHTML={{ __html: value.address_name }}></SearchResultContent>
                            </SearchResultItem>)
                    }
                </SearchList>
            </SearchBar>
            <MapContainer id="findMap" />
        </Container>
    );
}


export default SmallFindMap;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const SearchBar = styled.div`
  width: 100%;
`

const SearchBarInput = styled(Input)`
  color: black;
`

const SearchList = styled.div`
  width: 100%;
  height: fit-content;

  position: absolute;
  background: white;

  z-index: 10;
`

const SearchResultItem = styled.div`
  display: flex;
  justify-content: space-between;
`

const SearchResultContent = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  font-size: 0.8em;

  &:hover {
    cursor: pointer;
  }
`

const MapContainer = styled.div`
  width: 100%;
  height: 80%;
  max-height: 80%;
`;
