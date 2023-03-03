import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as scrapRegular } from "@fortawesome/free-regular-svg-icons";
import axios from 'axios';
import Close from "../../assets/icon/button/close.png";


function DishDetail(props: any) {

    const dish = props.detailDish;
    // const userLikedDish = props.userLikedDish;
    const [likeDish, setLikeDish] = useState(false)

    const userToken = localStorage.getItem('token')
    let userLikedDish: number[] = [];
    useEffect(() => {
        if (userToken) {
            axios({
                method: 'get',
                url: 'https://ourkitty.site/api/dishes/like',
                headers: {
                    Authorization: userToken,
                },
            })
                .then(res => {
                    res.data.dishList.forEach((element: { id: number; }) => {
                        userLikedDish.push(element.id)
                    })
                    setLikeDish(userLikedDish.includes(dish.id))
                })
                .catch(err => {
                    alert(err)
                });
        }
    }, [likeDish])

    const onChangeLikeDish = () => {
        axios({
            method: 'post',
            url: `https://ourkitty.site/api/dishes/${dish.id}/like`,
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        })
            .then(res => {
                setLikeDish((prev: boolean) => !prev)
            })
            .catch(err => {
                alert(err)
            });
    };

    return (
        <Container>
            <ImgContainer src={dish.dishImg} alt="catFeet" />
            <TextContainer>
                <OtherTextWithLike>
                    {/* <Name to={`/map/dish/${dish.id}/1`}>{dish.dishName}</Name> */}
                    <Name to={`/map/dish/${dish.id}/1`}>{dish.dishName}</Name>
                </OtherTextWithLike>

                <OtherText> {dish.loadAddress} </OtherText>
                <OtherText> 사료량 : {dish.food_weight}%</OtherText>

            </TextContainer>
            <div>
                <HeaderButton onClick={() => {
                    props.openDetail(null, null)
                }}><CloseButton src={Close} alt="Close" /></HeaderButton>
                {localStorage.getItem('token') ?
                    <>{likeDish ?
                        <FontAwesomeIcon icon={faBookmark} style={{ cursor: 'pointer', marginLeft: '0.1rem', marginTop: '0.1rem' }} onClick={onChangeLikeDish} />
                        :
                        <FontAwesomeIcon icon={scrapRegular} style={{ cursor: 'pointer', marginLeft: '0.1rem', marginTop: '0.1rem' }} onClick={onChangeLikeDish} />
                    }
                    </>
                    :
                    <></>
                }
            </div>
        </Container>
    );
}

export default DishDetail;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.pink};
  padding: 5%;
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15999999821186066);
  display: flex;
  overflow: hidden;
`;

const ImgContainer = styled.img`
  border: 1px solid #AFB1B6;
  border-radius: 10px;
  width: 35%;
  height: auto;
`;

const TextContainer = styled.div`
  margin-left: 6%;
  width: 55%;
  font-family: "BMYEONSUNG";
`;

const Name = styled(Link)`
  font-size: 0.95em;
  margin-bottom: 0.05rem;
  font-family: "BMHANNAPro";

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const OtherText = styled.div`
  font-size: 0.7em;
  margin-bottom: 0.05rem;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const OtherTextWithLike = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.8em;
  margin-bottom: 2%;
`;

const HeaderButton = styled.div`
  border: 0;
  background: transparent;
  
  padding-bottom: 0.2rem;

  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const CloseButton = styled.img`
  width: 1rem;
  height: 1rem;
`;
