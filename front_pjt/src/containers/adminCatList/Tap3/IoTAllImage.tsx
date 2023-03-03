// @flow
import { useEffect } from "react";
import styled from "styled-components";
import Layout from "Component/Layout/Layout";
// import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchIotImageData } from "Store/iot-actions";
import { IotImages } from "Store/Type/iotImagesType";
import { NoImage } from "Component/NoImage";
import AdminHeader from "Component/AdminHeader";
import AdminIotImageCard from "Component/AdminIotImageCard";


function IoTAllImage() {

  const url = window.location.href.split("/");
  const dishId: number = Number(url[url.length - 2])

  const dispatch = useDispatch();

  // @ts-ignore
  const iotImage = useSelector(state => state.iot.images);


  useEffect(() => {
    // @ts-ignore
    dispatch(fetchIotImageData(dishId));
  }, [dispatch])

  return (
    <Container>
      <AdminHeader />
      <Layout>
        <CardDiv>
          {iotImage.length === 0 ?
            <NoImage />
            : (iotImage.map((iotData: IotImages) => (
              <AdminIotImageCard key={iotData.id} iotData={iotData} />
            )))}
        </CardDiv>
      </Layout>
    </Container>
  );
};
export default IoTAllImage;

const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: ${(props) => props.theme.colors.lightPink};
    ::-webkit-scrollbar {
        display: none;
    }

  @media ${(props) => props.theme.mobile} {
    width: 100vw;
    height: 100%;
  }
`;

const CardDiv = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
margin: 0 auto;
`

