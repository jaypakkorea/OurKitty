import styled from 'styled-components'
import Header from 'Component/AdminHeader';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import WeightData from './weightData';
import VisiteData from './visiteData';


function DishInfoDatas() {
  return (
    <Container>
      <Header />
      <Tabs
        id="justify-tab-example"
        className="mb-3"
      >
        <Tab eventKey="1" title="냥그릇 무게 데이터">
          <WeightData />
        </Tab>

        <Tab eventKey="2" title="냥그릇 방문 데이터">
          <VisiteData />
        </Tab>
      </Tabs>
    </Container>
  );
}
export default DishInfoDatas;
const Container = styled.div`
    width: 100%;
    padding: 1rem;
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
