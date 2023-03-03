// @flow
import { LayoutFlex } from "../../Component/Layout/LayoutFlex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash as trashSolid } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { commentActions } from "../../Store/comment-slice";
import { communityActions } from "../../Store/community-slice";
import Swal from 'sweetalert2';
import { deleteNoticeComment } from "../../apis/api/notice";
import { useAppDispatch } from "../../Store";


type Props = {
  comment: any
  noticeId: number
};

export const NoticeComment = (props: Props) => {
  const comment = props.comment
  const commentId = props.comment.commentId
  const dispatch = useAppDispatch();

  // 댓글 삭제
  const removeNoticeComment = () => {
    deleteNoticeComment(commentId)
      .then(res => {
        Swal.fire('댓글 삭제 완료', '', 'success');
        dispatch(commentActions.deleteCommunityComment(comment.commentId));
        dispatch(communityActions.deleteCommunityComment());
      })
      .catch(err => {
        Swal.fire('잠시 후 이용해주세요', '', 'error');
      });
  }


  return (
    <LayoutFlex direction={"column"} gap={"1rem"} width={"100%"} key={commentId}>
      <LayoutFlex direction={"row"} justify={"space-between"} width={"100%"}>
        <LayoutFlex gap={"1rem"} width={"100%"}>
          <MainProfilImg src={comment.userImg} alt="catFeet" />
          <LayoutFlex direction={"column"} gap={"0.5rem"} width={"100%"}>
            <FlexDiv>
              <div>{comment.userName}</div>
              <SubText>{comment.createdAt.split('T')[0]} {comment.createdAt.split('T')[1]}</SubText>
            </FlexDiv>
            <ContentDiv>{comment.content}</ContentDiv>
          </LayoutFlex>
        </LayoutFlex>

        <LayoutFlex gap={"1rem"}>
          {/*댓글 삭제*/}
          {comment.isUser &&
            <FontAwesomeIcon icon={trashSolid} style={{ cursor: 'pointer' }} onClick={removeNoticeComment} />
          }
        </LayoutFlex>
      </LayoutFlex>
    </LayoutFlex>
  );
};

const MainProfilImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;
const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: gray;
`

const SubText = styled.div`
  font-size: 0.9rem;
`

const ContentDiv = styled.div`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`