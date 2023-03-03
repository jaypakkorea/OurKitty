import styled from 'styled-components'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AdminHeader from 'Component/AdminHeader';
import AdminIotAddDish from './AdminIotAddDish';
import Hospital from 'containers/adminHospital/HospitalAdd';
import TnrNotice from './AdminTnrAdd';
import { useLocation } from "react-router";
import { useState } from 'react';

function AdminIotAdd(props: any) {
  const location = useLocation(); // 추가된 부분
  const defaultKey = location.state?.defaultKey === undefined ? '1' : location.state?.defaultKey; // 추가된 부분
  const [reload, setReload] = useState<number>(0);

  const handleSelectTab = (key: any) => {
    setReload(reload + 1);
  };

  return (
    <Container>
      <AdminHeader />
      <Tabs
        defaultActiveKey={defaultKey}
        onSelect={handleSelectTab}
      >
        <Tab eventKey="1" title="냥그릇">
          <AdminIotAddDish />
        </Tab>
        <Tab eventKey="2" title="동물병원">
          <Hospital reload={reload} />
        </Tab>
        <Tab eventKey="3" title="TNR 공지">
          <TnrNotice />


        </Tab>
      </Tabs>
    </Container >
  );
}

export default AdminIotAdd;

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding-bottom: 60px;
    overflow: auto;
    position: relative;
    background-color: ${(props) => props.theme.colors.lightPink};
    ::-webkit-scrollbar {
        display: none;
    }
    .nav-tabs{
      display: flex;
      justify-content: center;
      // margin-left: 1rem;
      margin-right: 1.3rem;
      margin-top: 1rem;
      border:none;
      gap: 1.3rem;
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
    @media ${(props) => props.theme.mobile} {
    width: 100vw;
    height: 100%;
  }
`;
