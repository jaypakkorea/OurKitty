import styled from 'styled-components'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MapListDish from './MapListDish';
import HospitalList from 'containers/adminHospital/HospitalList';
import { useLocation } from 'react-router';
import NoticeList from "./NoticeList";

function MapList(props: any) {
  const location = useLocation(); // 추가된 부분
  const defaultKey = location.state?.defaultKey === undefined ? '1' : location.state?.defaultKey; // 추가된 부분

  return (
    <Container>
      <Tabs
        defaultActiveKey={defaultKey}>
        <Tab eventKey="1" title="냥그릇">
          <MapListDish />
        </Tab>
        <Tab eventKey="2" title="동물병원">
          <HospitalList />
        </Tab>
        <Tab eventKey="3" title="TNR 공지">
          <NoticeList />
        </Tab>
      </Tabs>
    </Container >
  );
}

export default MapList;

const Container = styled.div`
    width: 100%;
    padding: 3rem 1rem 1rem 1rem;
    height: 100%;
    overflow: auto;
    background-color: ${(props) => props.theme.colors.lightPink};
    ::-webkit-scrollbar {
        display: none;
    }
    :after {
      content:""; display:block; clear:both;
    }
    .nav-tabs{
      display: flex;
      justify-content: center;
      border:none;

    }
    .nav-link{
        color:gray;
        border-bottom: ${(props) => props.theme.colors.hotPink};

    }
    .nav-tabs .nav-link{
        border-radius: 0;
        border: none;
        height: 50px;
        font-weight: bold;
        font-size: 1.1rem;
        border-bottom: ${(props) => props.theme.colors.hotPink};
    }
    .nav-tabs .nav-link.active{
        background: ${(props) => props.theme.colors.lightPink};
        border-bottom: 2px solid #FF4081;

    }

`;
