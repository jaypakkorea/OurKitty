import { useEffect, useState } from 'react'
import styled from 'styled-components';
import LocationModal from 'Component/modal/LocationModal';
import ImageUploadModal from 'Component/modal/ImageUploadModal';
import { Dish } from 'Store/Type/DishType';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDish, fetchGetDishList } from 'Store/dish-actions';
import Swal from 'sweetalert2';
import MapListDishTable from './MapListDishTable';
import MapListDishDetail from './MapListDishDetail';
import AdminAllDishPreference from 'containers/adminHome/AdminAllDishPreference';
import { useNavigate } from 'react-router';

declare global {
    interface Window {
        kakao: any;
    }
}

function MapListDish(props: any) {
    // useState
    const [selectedDishOriginal, setSelectedDishOriginal] = useState<Dish>();
    const [confirmDish, setConfirmDish] = useState<Dish>();
    const [locationModalOpen, setLocationModalOpen] = useState(false);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState<string>('1');
    const [firstRender, setFirstRender] = useState<boolean>(true);

    //@ts-ignore
    const selectedDish = useSelector(state => state.dish.selectedDish);
    //@ts-ignore
    const dishList = useSelector(state => state.dish.dishList);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        // 냥그릇 리스트 가져오기
        //@ts-ignore
        dispatch(fetchGetDishList());
    }, []);

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false);
            return;
        }

        if (!confirmDish) return;

        // validation
        if (Object.keys(confirmDish).length === 0 || confirmDish.loadAddress === null) {
            Swal.fire("위치를 선택해주세요.", "", 'error');
        } else {
            Swal.fire({
                title: `위치가 ${confirmDish.loadAddress}가 맞습니까?`,
                icon: 'question',
                showCancelButton: true,
            }).then(({ isConfirmed }) => {
                if (isConfirmed) {
                    setFirstRender(true);
                    handleLocationModalOff(false);
                    handleUploadModalOn();
                }
            });
        }
    }, [confirmDish]);

    // 위치 모달 ON
    const handleLocationModalOn = async (content: Dish) => {
        // 1. 선택한 냥그릇 업데이트
        // @ts-ignore
        dispatch(fetchDish({ ...content, click: false }));
        setSelectedDishOriginal(content);

        // 2. 모달 띄우기
        setLocationModalOpen(true);
    }

    // 위치 모달 OFF
    const handleLocationModalOff = (isBtn: boolean) => {
        setFirstRender(true);
        if (isBtn) {
            setConfirmDish(undefined);
        }
        setLocationModalOpen(false);
    }

    // 이미지 업로드 모달 ON
    const handleUploadModalOn = () => {
        setUploadModalOpen(true);
    }

    // 이미지 업로드 모달 OFF
    const handleUploadModalOff = () => {
        setUploadModalOpen(false);
        setConfirmDish(undefined);
    }

    // 위치 모달 확인 버튼
    const handleOkBtnClick = () => {
        if (selectedTab === '1') {
            setConfirmDish({ ...selectedDish })
        } else if (selectedTab === '2') {
            selectedDishOriginal && setConfirmDish({ ...selectedDishOriginal })
        }
    }

    return (
        <Container>
            <MapListDishDetail />
            <MapListDishTable dishes={dishList} handleBtnClick={handleLocationModalOn} />

            <SubDiv>
                <AdminAllDishPreference></AdminAllDishPreference>
                <DataButton onClick={() => navigate('/catadmin/catlist/report')}>통계 데이터</DataButton>
            </SubDiv>

            <LocationModal modalOpen={locationModalOpen} handleModalOff={handleLocationModalOff}
                selectedDishOriginal={selectedDishOriginal} setSelectedTab={setSelectedTab}
                handleOkBtnClick={handleOkBtnClick}></LocationModal>
            <ImageUploadModal modalOpen={uploadModalOpen} handleModalOff={handleUploadModalOff}
                confirmDish={confirmDish}></ImageUploadModal>
        </Container>
    );
}

export default MapListDish;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const SubDiv = styled.div`
  margin-bottom: 4rem;
  padding: 1rem 0;
  float: right;
  font-size: 0.8rem;
`

const DataButton = styled.button`
  border: 0.1em solid #7978FF;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;

  background-color: white;

  width: fit-content;

  color: #7978FF;

  font-weight: bold;

  padding: 6px 16px;
  justify-content: center;
  align-items: center;

  &:hover,
  &:focus,
  &:active {
    font-weight: 800;
    border: 0.1em solid #7978FF;
    color: #7978FF;
    box-shadow: none;
  }

`;