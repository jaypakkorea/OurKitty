import AdminHeader from 'Component/AdminHeader';
import React from 'react'
// import { Link } from 'react-router-dom';
import styled from 'styled-components'
import AdminKakaoMap from './Map/adminKakaoMap';

function AdminCatList() {

  return (
    <Container>
      <AdminHeader />
      <AdminKakaoMap />

    </Container>
  );
}

export default AdminCatList;

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
