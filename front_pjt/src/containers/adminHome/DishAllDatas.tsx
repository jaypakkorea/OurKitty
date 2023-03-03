import styled from 'styled-components'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AllDishWeightData from './AllDishWeightData';
import AllDishVisiteData from './AllDishVisiteData';
import AdminHeader from 'Component/AdminHeader';


function DishAllInfoDatas() {
  return (
    <Container>
      <AdminHeader />
      <Tabs
        id="justify-tab-example"
        className="mb-3"
      >
        <Tab eventKey="1" title="냥그릇 무게 데이터">
          <AllDishWeightData />
        </Tab>

        <Tab eventKey="2" title="냥그릇 방문 데이터">
          <AllDishVisiteData />
        </Tab>
      </Tabs>
    </Container>
  );
}
export default DishAllInfoDatas;
const Container = styled.div`
    width: 100%;
    height: 100%;
    padding-bottom: 60px;
    overflow: auto;
    background-color: ${(props) => props.theme.colors.lightPink};
    ::-webkit-scrollbar {
        display: none;
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
