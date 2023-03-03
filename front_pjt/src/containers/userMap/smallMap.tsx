import { useEffect } from 'react';
import styled from 'styled-components';
import CatPin from 'assets/icon/cat4.svg'

function SmallMap(props: any) {
    const { lat, lng, reload } = props;

    // 초기에 실행될 useEffect, 카카오 지도를 사용하기 위한 script 를 헤더에 심어준다.
    useEffect(() => {
        onLoadKakaoMap();
    }, [reload]);

    // 카카오 지도 초기 로딩
    const onLoadKakaoMap = () => {
        window.kakao.maps.load(() => {
            const container = document.getElementById('userMap');
            const options = {
                center: new window.kakao.maps.LatLng(lat, lng),
                draggable: false,
                scrollwheel: false,
                disableDoubleClick: false,
                disableDoubleClickZoom: false,
            };
            const map = new window.kakao.maps.Map(container, options);

            // 마커 생성을 위한 이미지 옵션
            const imageSrc = CatPin;
            const imageSize = new window.kakao.maps.Size(45, 45);
            // const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

            // 해당 위치에 마커 생성
            const marker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(lat, lng),
                image: markerImage
            });

            // 지도에 마커 추가
            marker.setMap(map);
        });
    };

    return (
        <Container>
            <MapContainer id="userMap" />
        </Container>
    );
}


export default SmallMap;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
