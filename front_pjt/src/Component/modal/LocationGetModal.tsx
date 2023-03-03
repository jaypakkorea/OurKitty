import styled from 'styled-components';
import { useEffect, useState } from 'react';
import SmallMap from 'containers/userMap/smallMap';

function LocationGetModal(props: any) {
  // props
  const { selectedDishOriginal, reload } = props;
  const [currentAddress, setCurrentAddress] = useState();
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    getCurrentAddress(selectedDishOriginal.lat, selectedDishOriginal.lon);
  }, [load]);

  // 현재 주소 얻기
  const getCurrentAddress = (lat: any, lon: any) => {

    if(!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      setLoad(!load);
      return;
    }

    const coord = new window.kakao.maps.LatLng(lat, lon);
    const callback = (result: any, status: any) => {
      if (status == window.kakao.maps.services.Status.OK) {
        setCurrentAddress(result[0].address.address_name);
      }
    }

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  return (
    <div>
      {
        currentAddress
          ? <>
            <FlexTextDiv>
              <ModalBoldText>{currentAddress}</ModalBoldText>
              <ModalText>가 맞습니까?</ModalText>
            </FlexTextDiv>
            <LocationMap>
              <SmallMap lat={selectedDishOriginal.lat} lng={selectedDishOriginal.lon} reload={reload} />
            </LocationMap>
          </>
          : <>
            <FlexColumnTextDiv>
              <ModalBoldText>기기로부터 오는 정보가 없습니다.</ModalBoldText>
              <ModalBoldText>기기가 켜있는지</ModalBoldText>
              <ModalBoldText>다시한번 확인해주세요.</ModalBoldText>
            </FlexColumnTextDiv>
          </>
      }
    </div>
  );
}

export default LocationGetModal;

const ModalBoldText = styled.div`
  font-size: 1rem;
  font-family: "BMJUA";
`;
const ModalText = styled.div`
  font-family: "BMYEONSUNG";
`;
const FlexTextDiv = styled.div`
    display: flex;
    height: 40px;
    justify-content: left;
    font-family: "BMJUA";
    align-items: baseline;
    gap: 10px;
`;
const FlexColumnTextDiv = styled.div`
    display: flex;
    justify-content: left;
    font-family: "BMJUA";
    align-items: center;
    flex-direction: column;
`;
const LocationMap = styled.div`
  height: 30vh;
`;