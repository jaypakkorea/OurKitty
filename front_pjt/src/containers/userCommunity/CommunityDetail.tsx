import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from "Component/Header";
import Layout from "Component/Layout/Layout";
import { LayoutFlex } from "Component/Layout/LayoutFlex";
import Container from 'Component/Layout/Container';
import { Input, Modal, Space } from 'antd';
import Send from 'assets/icon/button/send.png'
import {
  faBookmark as scrapSolid,
  faPen as penSolid,
  faThumbsUp as likeSolid,
  faTrash as trashSolid
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark as scrapRegular,
  faThumbsUp as likeRegular,
  faComment as commentRegular
} from "@fortawesome/free-regular-svg-icons";
import { ExclamationCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import {
  CreateCommunityComment,
  LikeCommunity,
  ReportCommunity,
  ScrapCommunity,
  RemoveCommunity
} from "apis/api/community";
import { communityActions } from "Store/community-slice";
import { fetchCommunityDetail } from "Store/community-actions";


// awesome 임포트 관련
// https://fontawesome.com/v5/docs/web/use-with/react#typescript
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchCommunityCommentList } from "../../Store/comment-action";
import { commentActions } from "../../Store/comment-slice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import { CommunityComment } from "./CommunityComment";
import useSelectorTyped, { useAppDispatch } from "../../Store";
import Swal from "sweetalert2";


function CommunityDetail() {
  const url = window.location.href.split("/");
  const communityId: number = Number(url[url.length - 1])
  const dishId: number = Number(url[url.length - 5])
  const navigate = useNavigate();
  const userToken = localStorage.getItem('token')

  const dispatch = useAppDispatch();

  const {
    communityDetail,
    communityCommentList,
    isGettingCommunityDetail,
    isGettingCommunityCommentList
  } = useSelectorTyped(state => ({
    communityDetail: state.community.community,
    communityCommentList: state.comment.commentList.content,
    isGettingCommunityDetail: state.community.isGettingCommunityDetail,
    isGettingCommunityCommentList: state.comment.isGettingCommentList
  }));
  const isLike = communityDetail.isLike;
  const isScrap = communityDetail.isScrap;
  const isReport = communityDetail.isReport;

  useEffect(() => {
    dispatch(fetchCommunityDetail(communityId));
    dispatch(fetchCommunityCommentList(communityId))
  }, [dispatch])


  const navigateToPurchase = () => {
    navigate(`/user/${communityDetail.communityUserId}`);
  };

  const onChangeCommunityLike = () => {
    if (!isLike) {
      LikeCommunity(communityId).then(() => dispatch(communityActions.communityLikeOn()));
    }
    else {
      LikeCommunity(communityId).then(() => dispatch(communityActions.communityLikeOff()));
    }
  };

  const onChangeScarp = () => {
    // 스크랩 안한 상태
    if (!isScrap) {
      ScrapCommunity(communityId).then(() => dispatch(communityActions.communityScrapeOn()));
    }
    // 스크랩 한 상태
    else {
      ScrapCommunity(communityId).then(() => dispatch(communityActions.communityScrapeOff()));
    }
  }

  // 신고 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  // 신고 모달 입력
  const [reportContent, setReportContent] = useState('');
  const onChangeReportContent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReportContent(e.target.value)
  };


  // 신고 모달 확인 클릭
  const onSendReport = () => {
    if (reportContent.length < 1) {
      Swal.fire('신고내용을 입력해주세요', '', 'error');
      return;
    }

    const body = {
      content: reportContent
    }
    ReportCommunity(communityId, body).then(() => dispatch(communityActions.communityReportOn()));
    Swal.fire('커뮤니티 신고 성공', '', 'success');
    setIsModalOpen(false);
  };

  // 신고 모달 취소 클릭
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 커뮤니티 삭제
  const removeCommunity = () => {
    Swal.fire('커뮤니티 삭제 성공', '', 'success');
    RemoveCommunity(communityId).then(() => navigate(-1))
  }


  // 댓글
  const [communityComment, setCommunityComment] = useState('');
  const { TextArea } = Input;
  const onChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCommunityComment(e.target.value)
  };

  // 댓글 제출버튼 클릭
  const onSendCommunityCommentText = async () => {

    if (userToken) {
      if (communityComment.length < 1) {
        Swal.fire('댓글을 입력해주세요', '', 'error');
        return;
      }

      const addComment = {
        content: communityComment,
        userName: "작성유저",
        region: "유저지역"
      }
      CreateCommunityComment(communityId, addComment)
        .then(response => {
          dispatch(commentActions.addCommunityCommentList({
            comment: response,
          }));
          dispatch(communityActions.addCommunityComment());
          Swal.fire('댓글 등록 완료', '', 'success');
          setCommunityComment('')
        })
        .catch(err => {
          Swal.fire('잠시 후 이용해주세요', '', 'error');
        })
    } else {
      Swal.fire('로그인 후 사용해 주세요.', '', 'error');
    }


  };


  return (

    <Container>
      <Header></Header>

      <Layout>
        {/*신고모달*/}
        <LayoutFlex direction={"row"} gap={"12px"}>
          {/*신고 모달열림*/}
          <SModal open={isModalOpen}
            centered
            closable={false}
            footer={null}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <ModalBoldText>신고 이유를 입력해주세요.</ModalBoldText>
              <TextArea showCount
                value={reportContent}
                style={{
                  minHeight: 100,
                  width: '80%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  position: 'relative',
                  resize: 'none'
                }}
                maxLength={100} onChange={onChangeReportContent}
              />
            </Space>
            <FlexButtonDiv>
              <CancelButton onClick={handleCancel}>
                취소
              </CancelButton>
              <OKButton onClick={onSendReport}>
                확인
              </OKButton>
            </FlexButtonDiv>
          </SModal>
        </LayoutFlex>

        {isGettingCommunityDetail ? <div>Loading..</div> :
          <LayoutFlex direction={"column"} gap={"16px"} width={"100%"}>
            <LayoutFlex justify={"space-between"}>

              {/*유저 프로필*/}
              <LayoutFlex gap={"8px"}>
                <LinkDiv onClick={navigateToPurchase}>
                  <MainProfilImg src={communityDetail.userImg} alt="catFeet" />
                  <Title>{communityDetail.userName}</Title>
                </LinkDiv>
              </LayoutFlex>

              {/*커뮤니티 수정, 스크랩, 신고*/}
              <LayoutFlex gap={"8px"} justify={"flex-end"}>

                {/*삭제*/}
                {communityDetail.isUser &&
                  <FontAwesomeIcon icon={trashSolid} style={{ cursor: 'pointer' }}
                    onClick={removeCommunity} />
                }

                {/*수정*/}
                {communityDetail.isUser &&
                  <Link to={`/map/dish/${dishId}/3/detail/${communityId}/edit`}>
                    <FontAwesomeIcon icon={penSolid} style={{ cursor: 'pointer' }} />
                  </Link>
                }


                {/*스크랩*/}
                {isScrap ? <FontAwesomeIcon icon={scrapSolid} style={{ cursor: 'pointer' }}
                  onClick={onChangeScarp} /> :
                  <FontAwesomeIcon icon={scrapRegular} style={{ cursor: 'pointer' }}
                    onClick={onChangeScarp} />}

                {/*신고*/}
                {isReport ? <ExclamationCircleFilled style={{ cursor: 'pointer' }} /> :
                  <ExclamationCircleOutlined style={{ cursor: 'pointer' }} onClick={showModal} />}

              </LayoutFlex>
            </LayoutFlex>

            {/*커뮤니티 content*/}
            <div>
              {communityDetail.content}
            </div>

            {/*커뮤니티 이미지*/}
            <FlexImgDiv>
              {communityDetail.communityImgs.length === 1 ?
                <CustomImg src={communityDetail.communityImgs[0]} alt="catFeet" width="100%" />
                :

                communityDetail.communityImgs.length !== 0 &&
                communityDetail.communityImgs.map((content: any) => (
                  <CustomImg src={content} alt="catFeet" width="50%" height="160" />
                ))
              }
            </FlexImgDiv>

            {/*커뮤니티 지역, 작성시간*/}
            <LayoutFlex justify={"space-between"}>
              <SubText>{communityDetail.dishName}</SubText>
              <SubText>{communityDetail.createdAt.replace("T", " ")}</SubText>
            </LayoutFlex>

            {/*커뮤니티 좋아요, 댓글*/}
            <LayoutFlex gap={"16px"}>
              <LayoutFlex gap={"4px"}>
                {isLike ?
                  <FontAwesomeIcon icon={likeSolid} style={{ cursor: 'pointer' }}
                    onClick={onChangeCommunityLike} /> :
                  <FontAwesomeIcon icon={likeRegular} style={{ cursor: 'pointer' }}
                    onClick={onChangeCommunityLike} />}
                {communityDetail.likeCount}
              </LayoutFlex>
              <LayoutFlex gap={"4px"}>
                <FontAwesomeIcon icon={commentRegular} />
                {communityDetail.commentCount}
              </LayoutFlex>
            </LayoutFlex>

          </LayoutFlex>}


        {/*댓글 리스트*/}
        {isGettingCommunityCommentList ? <div>Loading..</div> : communityCommentList.map((comment: any) =>
          <CommunityComment comment={comment} communityId={communityId} />
        )}


        {/*댓글 작성란*/}
        {userToken &&
          <>
            <InputDiv>
              <MainProfilImg src={communityDetail.userCommentImg} alt="catFeet" />
              <TextArea showCount
                value={communityComment}
                style={{ minHeight: 100, resize: 'none', width: '100%' }}
                maxLength={100} onChange={onChangeText}
              />
            </InputDiv>

            <FlexButtonDiv>
              <OKButton>
                <SendImg src={Send} alt="Send" onClick={onSendCommunityCommentText} />
              </OKButton>
            </FlexButtonDiv>
          </>
        }
      </Layout>
    </Container>
  );
};


export default CommunityDetail;


const MainProfilImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
`;

const SubText = styled.div`
  font-size: 0.9rem;
  color: gray;
`

const FlexButtonDiv = styled.div`
  display: flex;
  justify-content: end;
  margin: 1rem -2rem;
  width: 100%;
  height: 40px;
  font-family: "BMJUA";
`;

const CancelButton = styled.button`
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  background-color: white;
  width: 60px;
  height: 40px;
  color: ${(props) => props.theme.colors.hotPink
  };

  :hover {
    border: 2px solid ${(props) => props.theme.colors.pink};
  }
`;

const OKButton = styled.button`
  margin-left: 1rem;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.hotPink
  };
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

const SModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${(props) => props.theme.colors.lightPink};
    padding: 3rem 0 2rem 0;
  }

  .ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select {
    width: 70%;
    margin-left: 15%;
    height: 200px;
    overflow: hidden;
  }
`;

const ModalBoldText = styled.div`
  font-size: 1rem;
  text-align: center;
  width: 70%;
  margin: 1rem auto;
  font-family: "BMJUA";
`;

const InputDiv = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`

const LinkDiv = styled.div`
  width: 100%;
  cursor: pointer;
`

const FlexImgDiv = styled.div`
  display: flex;
  flex-flow: row wrap;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const CustomImg = styled.img`
  border-radius: 10px;
  
  padding: 0.2rem;
`
