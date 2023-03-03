import { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LayoutFlex } from "Component/Layout/LayoutFlex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as likeSolid } from "@fortawesome/free-solid-svg-icons";
import {
    faComment as commentRegular,
    faThumbsUp as likeRegular
} from "@fortawesome/free-regular-svg-icons";
import Swal from 'sweetalert2';
import { postNoticeLike } from "../../apis/api/notice";


export function NoticeCard(props: any) {
    let notice = props.notice
    let noticeId = props.notice.noticeId

    const navigate = useNavigate();

    const navigateToDetail = () => {
        navigate(`/notice/detail/${noticeId}`);
    };


    const userToken = localStorage.getItem('token')


    // 좋아요
    const [userIsLike, setUserIsLike] = useState(notice.isLike)
    const [likeCount, setLikeCount] = useState(notice.likeCount)

    const onChangeLike = () => {
        if (userToken) {
            postNoticeLike(noticeId)
                .then(data => {
                    if (userIsLike) {
                        setUserIsLike(false)
                        setLikeCount((prev: number) => prev -= 1)
                    } else {
                        setUserIsLike(true)
                        setLikeCount((prev: number) => prev += 1)
                    }
                })
                .catch(err => {
                    Swal.fire('잠시 후 이용해주세요', '', 'error');
                });
        } else {
            Swal.fire('로그인 후 사용해 주세요.', '', 'error');
        }
    };

    return (
        <LayoutCard>
            <LayoutFlex justify={"space-between"} width={"100%"}>

                <LinkDiv onClick={navigateToDetail}>
                    <div
                        style={{ fontSize: "1.2rem", fontWeight: "500" }}>{notice.adminGroupName} {notice.adminName}</div>
                </LinkDiv>
            </LayoutFlex>


            <LinkDiv onClick={navigateToDetail}>
                <ContentDiv style={{ marginTop: "1rem", lineHeight: '1.3rem' }}>
                    {notice.content}
                </ContentDiv>

                <FlexImgDiv>
                    {notice.noticeImgs.length === 1 ?
                        <CustomImg src={notice.noticeImgs[0]} alt="catFeet" width="100%" />
                        :

                        notice.noticeImgs.length !== 0 &&
                        notice.noticeImgs.map((content: any) => (
                            <CustomImg src={content} alt="catFeet" width="50%" height="160" />
                        ))
                    }
                </FlexImgDiv>
            </LinkDiv>


            <LayoutFlex width={"100%"}>
                <SubText>{notice.createdAt.split('T')[0]}</SubText>
            </LayoutFlex>

            <LayoutFlex gap={"0.5rem"}>
                <LayoutFlex gap={"0.2rem"} width={"auto"}>
                    {/*좋아요*/}
                    {userIsLike ?
                        <FontAwesomeIcon icon={likeSolid}
                            style={{ cursor: 'pointer', marginLeft: "0", marginTop: "0.2rem" }}
                            onClick={onChangeLike} /> :
                        <FontAwesomeIcon icon={likeRegular}
                            style={{ cursor: 'pointer', marginLeft: "0", marginTop: "0.2rem" }}
                            onClick={onChangeLike} />}

                    {likeCount}
                </LayoutFlex>

                <LayoutFlex gap={"0.2rem"} width={"auto"}>
                    <FontAwesomeIcon icon={commentRegular} style={{ marginTop: "0.2rem" }} />
                    {notice.commentCount}
                </LayoutFlex>
            </LayoutFlex>
        </LayoutCard>
    );
};

const LayoutCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 16px;
  min-width: 100%;

  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
`;

const LinkDiv = styled.div`
  width: 100%;
  cursor: pointer;
`
const ContentDiv = styled.div`
  padding: 1rem 0;
`
const SubText = styled.div`
  font-size: 0.9rem;
  width: 100%;
  text-align: end;
  color: gray;
`

const FlexImgDiv = styled.div`
  display: flex;
  overflow: auto;
  white-space: nowrap;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const CustomImg = styled.img`
  border-radius: 10px;
  
  padding: 0.2rem;
`
