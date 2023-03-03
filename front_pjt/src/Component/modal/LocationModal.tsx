import styled from 'styled-components';
import { Modal } from 'antd';
import LocationGetModal from './LocationGetModal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SmallFindMap from 'containers/userMap/smallFindMap';
import { useState } from 'react';

function LocationModal(props: any) {
  // props
  const { modalOpen, handleModalOff, selectedDishOriginal, setSelectedTab, handleOkBtnClick } = props;
  const [reload, setReload] = useState<number>(0);

  const handleSelectTab = (key: any) => {
    setReload(reload + 1);
    setSelectedTab(key);
  };

  const handleSetLocation = () => {
    handleOkBtnClick();
  }

  return (
    <SModal open={modalOpen}
      destroyOnClose={true}
      centered
      closable={false}
      footer={null}>

      <Tabs
        id="justify-tab-example"
        className="mb-3"
        onSelect={handleSelectTab}
      >
        <Tab eventKey="1" title="직접 입력하기">
          <LocationMap>
            <SmallFindMap />
          </LocationMap>
        </Tab>
        <Tab eventKey="2" title="기기 위치정보 보기">
          <LocationGetModal selectedDishOriginal={selectedDishOriginal} reload={reload} />
        </Tab>
      </Tabs>
      <FlexButtonDiv>
        <CancelButton onClick={() => { handleModalOff(true); }}>
          취소
        </CancelButton>
        <OKButton onClick={handleSetLocation}>
          확인
        </OKButton>
      </FlexButtonDiv>
    </SModal>
  );
}

export default LocationModal;

const SModal = styled(Modal)`
  width: 24rem;
  
  .ant-modal-content{
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.lightPink};
    padding: 2em;
  }
  .ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select{
    width: 70%;
    margin-left: 15%;
    height: 200px;
    overflow: hidden;
  }
  .nav-tabs{
    background-color: ${(props) => props.theme.colors.lightPink};
    font-size: 1rem;
    text-align: center;
    margin: 1rem auto;
    font-family: "BMJUA";
    width: 100%;
    height: 100%;
    color: black;
    border: 0;
    justify-content: space-around;
    :hover{
      color: ${(props) => props.theme.colors.hotPink};
    }
  }
  .nav-tabs .nav-link {
    border: 0;
    color: black;
  }
  .nav-tabs .nav-link:hover {
    border-color: ${(props) => props.theme.colors.lightPink};
  }
  .nav-tabs .nav-link.active{
    color: ${(props) => props.theme.colors.hotPink};
    background-color: ${(props) => props.theme.colors.lightPink};
    border: 0;
    border-bottom: 2px solid ${(props) => props.theme.colors.pink};
  }
`;

const LocationMap = styled.div`
  height: 35vh;
`

const CancelButton = styled.button`
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    background-color: white;
    width: 60px;
    color: ${(props) => props.theme.colors.hotPink};
    :hover{
        border: 2px solid ${(props) => props.theme.colors.pink};
    }
`;

const OKButton = styled.button`
    margin-left: 1rem;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    background-color: ${(props) => props.theme.colors.hotPink};
    width: 60px;
    color: white;
    :hover{
        border: 2px solid ${(props) => props.theme.colors.pink};
    }
`;

const FlexButtonDiv = styled.div`
    display: flex;
    margin-top: 1em;
    justify-content: center;
    height: 40px;
    font-family: "BMJUA";
`;
