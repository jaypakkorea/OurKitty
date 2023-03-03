import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from "Component/Header";
import Layout from "Component/Layout/Layout";
import { LayoutFlex } from "Component/Layout/LayoutFlex";
import Container from 'Component/Layout/Container';
import { Input } from 'antd';
import Send from 'assets/icon/button/send.png'
import { faThumbsUp as likeSolid, } from "@fortawesome/free-solid-svg-icons";
import { faComment as commentRegular, faThumbsUp as likeRegular } from "@fortawesome/free-regular-svg-icons";
import Swal from 'sweetalert2';


// awesome 임포트 관련
// https://fontawesome.com/v5/docs/web/use-with/react#typescript
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getNoticeDetail, postNoticeComment, postNoticeLike } from "../../apis/api/notice";
import useSelectorTyped, { useAppDispatch } from "../../Store";
import { fetchNoticeCommentList } from "../../Store/comment-action";
import { commentActions } from "../../Store/comment-slice";
import { Comment } from "../../Store/Type/communityType";
import { NoticeComment } from "./NoticeComment";


function NoticeDetail() {

    const url = window.location.href.split("/");
    const noticeId: number = Number(url[url.length - 1])
    const userToken = localStorage.getItem('token')
    const dispatch = useAppDispatch();

    const {
        commentList,
        isGettingCommunityCommentList
    } = useSelectorTyped(state => ({
        commentList: state.comment.commentList.content,
        isGettingCommunityCommentList: state.comment.isGettingCommentList
    }));

    const [loading, setLoading] = useState(true)
    const [adminGroupName, setAdminGroupName] = useState('')
    const [adminName, setAdminName] = useState('')
    const [content, setContent] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [isLike, setIsLike] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const [noticeImgs, setNoticeImgs] = useState([])

    useEffect(() => {
        getNoticeDetail(noticeId)
            .then(data => {
                setAdminGroupName(data.adminGroupName)
                setAdminName(data.adminName)
                setContent(data.content)
                setCreatedAt(data.createdAt)
                setIsLike(data.isLike)
                setLikeCount(data.likeCount)
                setNoticeImgs(data.noticeImgs)
                setLoading(false)
            })
            .catch(err => {
                Swal.fire('존재하지 않는 글입니다.', '', 'error').then(() =>
                    window.location.href = window.location.href.split('/detail')[0]
                );
            });

        dispatch(fetchNoticeCommentList(noticeId));

    }, [dispatch, noticeId])


    const onChangeNoticeLike = () => {
        postNoticeLike(noticeId)
            .then(res => {
                if (isLike) {
                    setIsLike(false)
                    setLikeCount((prev: number) => prev -= 1)
                } else {
                    setIsLike(true)
                    setLikeCount((prev: number) => prev += 1)
                }
            })
            .catch(err => {
                Swal.fire('잠시 후 이용해주세요', '', 'error');
            });
    };

    useEffect(() => {
        setACommentCount(commentList.length);
    }, [commentList])

    // 댓글
    const [noticeComment, setNoticeComment] = useState('');
    const [aCommentCount, setACommentCount] = useState(commentList.length)
    const { TextArea } = Input;
    const onChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNoticeComment(e.target.value)
    };

    // 댓글 제출버튼 클릭
    const onSendNoticeCommentText = () => {
        if (userToken) {
            const addComment = { content: noticeComment }

            postNoticeComment(noticeId, addComment)
                .then(response => {
                    Swal.fire('댓글 등록 완료', '', 'success');
                    setACommentCount((prev: number) => prev += 1)
                    setNoticeComment('')
                    dispatch(commentActions.addCommunityCommentList({
                        comment: response,
                    }));
                })
                .catch(err => {
                    Swal.fire('잠시 후 이용해주세요', '', 'error');
                });
        } else {
            Swal.fire('로그인 후 사용해 주세요.', '', 'error');
        }
    }


    return (
        <Container>
            <Header></Header>
            <Layout>
                {loading ? <div>Loading..</div> :
                    <LayoutFlex direction={"column"} gap={"16px"} width={"100%"}>
                        <LayoutFlex justify={"space-between"}>

                            {/*유저 프로필*/}
                            <LayoutFlex gap={"8px"}>
                                <Title>{adminGroupName} {adminName}</Title>
                            </LayoutFlex>


                        </LayoutFlex>

                        {/*커뮤니티 content*/}
                        <div>
                            {content}
                        </div>

                        <FlexImgDiv>
                            {noticeImgs.length === 1 ?
                                <CustomImg src={noticeImgs[0]} alt="catFeet" width="100%" />
                                :

                                noticeImgs.length !== 0 &&
                                noticeImgs.map((content: any) => (
                                    <CustomImg src={content} alt="catFeet" width="50%" height="160" />
                                ))
                            }
                        </FlexImgDiv>

                        {/*커뮤니티 지역, 작성시간*/}
                        <LayoutFlex justify={"space-between"}>
                            <p>{createdAt}</p>
                        </LayoutFlex>

                        {/*커뮤니티 좋아요, 댓글*/}
                        <LayoutFlex gap={"16px"}>
                            <LayoutFlex gap={"4px"}>
                                {isLike ?
                                    <FontAwesomeIcon icon={likeSolid} style={{ cursor: 'pointer' }}
                                        onClick={onChangeNoticeLike} /> :
                                    <FontAwesomeIcon icon={likeRegular} style={{ cursor: 'pointer' }}
                                        onClick={onChangeNoticeLike} />}
                                {likeCount}

                            </LayoutFlex>
                            <LayoutFlex gap={"4px"}>
                                <FontAwesomeIcon icon={commentRegular} />
                                {aCommentCount}
                            </LayoutFlex>
                        </LayoutFlex>

                    </LayoutFlex>}


                {/*댓글 리스트*/}
                {isGettingCommunityCommentList ? <div>Loading..</div> :
                    commentList.map((comment: Comment) =>
                        <NoticeComment comment={comment} noticeId={noticeId} />
                    )}


                {/*댓글 작성란*/}
                {userToken ?
                    <>
                        <InputDiv>
                            {/* <MainProfilImg src={userPicture} alt="catFeet"/> */}
                            <TextArea showCount
                                value={noticeComment}
                                style={{ minHeight: 100, resize: 'none', width: '100%' }}
                                maxLength={100} onChange={onChangeText}
                            />
                        </InputDiv>
                        {/*댓글 제출버튼*/}
                        <FlexButtonDiv>
                            <OKButton>
                                <SendImg src={Send} alt="Send" onClick={onSendNoticeCommentText} />
                            </OKButton>
                        </FlexButtonDiv>
                    </>
                    :
                    <></>
                }
            </Layout>
        </Container>
    );
};


export default NoticeDetail;

const Title = styled.div`
  font-size: 1.5rem;
`;


const FlexButtonDiv = styled.div`
  display: flex;
  justify-content: end;
  margin: 1rem -2rem;
  width: 100%;
  height: 40px;
  font-family: "BMJUA";
`;

const OKButton = styled.button`
  margin-left: 1rem;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.hotPink};
  width: 60px;
  color: white;

  :hover {
    border: 2px solid ${(props) => props.theme.colors.pink};
  }
`;

const SendImg = styled.img`
  width: 25px;
  height: 25px;
`;


const InputDiv = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`

const FlexImgDiv = styled.div`
  display: flex;
  flex-flow: row wrap;

  ::-webkit-scrollbar {
    display: none;
  }
`

const CustomImg = styled.img`
  border-radius: 10px;

  padding: 0.2rem;
`
