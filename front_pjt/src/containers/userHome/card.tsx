import { useEffect, useState } from 'react'
import styled from 'styled-components'
// import TestCat from '../../assets/images/testCat.png'
import Pin from 'assets/images/pin.png'
import { faHeart as likeSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Load from 'Component/Load';
import IotModal from './iotModal';
import { Link } from 'react-router-dom';

function Admin(iotData: any) {
  const onLike = iotData.like
  let data = iotData.iotData

  const [isLike, setisLike] = useState(false)
  const [noticeModal, setNoticeModal] = useState<boolean>(false);

  const modalClose = () => {
    setNoticeModal(false);
  }

  const modalOpen = () => {
    setNoticeModal(true);
  }

  useEffect(() => {
    setisLike(data.isLike)
  }, [data.isLike])

  return (

    <Container>
      {data.imgUrl ?
        <CardDiv>
          <CardImg src={data.imgUrl}
            alt="TestCat" onClick={modalOpen} />
          <LikeButton back={isLike} onClick={() => {
            onLike(data.id, data.isLike)
            if (localStorage.getItem('token')) {
              setisLike((prev) => !prev)
            }
          }}>
            <FontAwesomeIcon icon={likeSolid} style={{ cursor: 'pointer' }} />
          </LikeButton>
          <Link to={`/map/dish/${data.dish.id}/1`}>
            <CardTitle>
              {data.dish.dishName}
            </CardTitle>
          </Link>
          {data.dish.loadAddress ?
            <CardPin>
              <img src={Pin} alt="catFeet" width="20px" height="20px" />
              <PinText>{data.dish.loadAddress}</PinText>
            </CardPin> : <></>
          }
        </CardDiv> :
        <Load />}
      <IotModal modalOpen={noticeModal} modalClose={modalClose} data={data} />
    </Container>
  );
}



export default Admin;

const Container = styled.div`
    width: 100%;
    padding: 0 1rem;

`;
const CardDiv = styled.div`
    border-radius: 10px;
    background-color: white;
    width: 130px;
    height: 190px;
    /* padding: 0 0.5rem; */
`;

const CardImg = styled.img`
  width: 110px;
  height: 110px;
  margin: 0.5rem;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.colors.pink};
`;


const CardTitle = styled.div`
  margin: 0 0.5rem ;
  color: black;
`;

const CardPin = styled.div`
  margin: 0.5rem;
  color: gray;
  font-size: 0.8rem;
  height: 20px;
  line-height: 20px;
  display: flex;
`;

const PinText = styled.div`
  display: block;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
`;

const LikeButton = styled.div`
  color: ${({ back }: { back: boolean }) => (back === true ? 'red' : '#F4EDED')};
  margin-top: -2rem;
  margin-bottom: 0.5rem;
  margin-left: 70%;
`
// background-color: ${(props) => props.theme.colors.lightPink};

