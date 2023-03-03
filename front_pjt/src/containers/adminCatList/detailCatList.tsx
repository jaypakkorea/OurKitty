import styled from 'styled-components'
import Header from 'Component/Header';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import DishInfor from './Tap1/dishInfor';
import Preference from './Tap2/preference';
import StateInfo from './Tap3/stateInfo';
import { NavLink } from "react-router-dom";
import AdminHeader from 'Component/AdminHeader';

function AdminDetailCatList() {
  const token = localStorage.getItem("adminToken");

  return (
    <Container>
      {token ? <AdminHeader /> : <Header />}
      <Tabs
        id="justify-tab-example"
        // activeKey={tabNumber}
        className="mb-3"
      >
        <Tab eventKey="1" title="급식소 정보">
          <DishInfor />
        </Tab>
        <Tab eventKey="2" title="선호도 분석">
          <Preference />
        </Tab>
        <Tab eventKey="3" title="상태 정보">
          <StateInfo />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default AdminDetailCatList;

const Container = styled.div`
  width: 100%;
  @media ${(props) => props.theme.mobile} {
    width: 100vw;
  }

  .nav-tabs {
    background-color: ${(props) => props.theme.colors.lightPink};
    color: black;
    border-top: 1px solid ${(props) => props.theme.colors.pink};
    border-bottom: 1px solid ${(props) => props.theme.colors.pink};

    width: 100%;
    @media ${(props) => props.theme.mobile} {
      width: 100vw;
    }

    display:flex;
    justify-content: center;
  }

  .nav-link {
    color: black;
  }
  
  .nav-item {
    width: 33%;
  }

  .nav-tabs .nav-link {
    border-radius: 0;
    border: none;
    height: 50px;
    width: 100%;
    margin: 0;
    font-weight: bold;
    font-size: 0.9rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.pink};

  }

  .mb-3 {
    margin-bottom: 0 !important;
  }
`;
