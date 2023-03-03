// @flow
import { LayoutFlex } from "../../Component/Layout/LayoutFlex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as likeSolid, faTrash as trashSolid } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as likeRegular } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { CommunityCommentLike, RemoveCommunityComment } from "../../apis/api/community";
import { commentActions } from "../../Store/comment-slice";
import { communityActions } from "../../Store/community-slice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

type Props = {
    comment: any
    communityId: number

};

export const CommunityComment = (props: Props) => {

    const comment = props.comment
    const commentId = props.comment.commentId
    const communityId = props.communityId
    const dispatch = useDispatch();

    // @ts-ignore
    // const comment = useSelector(state => state.communityComment.communityCommentList.content.find((comment) => comment.commentId === commentId));

    // 댓글 좋아요
    const onChangeCommunityCommentLike = () => {

        if (comment.isLike) {
            CommunityCommentLike(communityId, commentId).then(() => dispatch(commentActions.communityCommentLikeOff(commentId)));
        } else {
            CommunityCommentLike(communityId, commentId).then(() => dispatch(commentActions.communityCommentLikeOn(commentId)));
        }
    };

    // 댓글 삭제
    const removeCommunityComment = async () => {
        RemoveCommunityComment(communityId, comment.commentId)
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
        <LayoutFlex direction={"column"} gap={"12px"} width={"100%"} key={comment.commentId}>
            <LayoutFlex direction={"row"} justify={"space-between"} width={"100%"}>
                <LayoutFlex gap={"12px"}>
                    <MainProfilImg src={comment.userImg} alt="catFeet" />
                    <LayoutFlex direction={"column"} gap={"4px"}>
                        <FlexDiv>
                            <div>{comment.userName}</div>
                            <SubText>{comment.createdAt.split('T')[0]} {comment.createdAt.split('T')[1]}</SubText>
                        </FlexDiv>
                        <div>{comment.content}</div>
                    </LayoutFlex>
                </LayoutFlex>

                <LayoutFlex gap={"8px"}>
                    {/*댓글 좋아요 */}
                    <LayoutFlex gap={"4px"}>
                        {comment.isLike ?
                            <FontAwesomeIcon icon={likeSolid} style={{ cursor: 'pointer' }}
                                onClick={onChangeCommunityCommentLike} /> :
                            <FontAwesomeIcon icon={likeRegular} style={{ cursor: 'pointer' }}
                                onClick={onChangeCommunityCommentLike} />}
                        {comment.likeCount}
                    </LayoutFlex>

                    {/*댓글 삭제*/}
                    {comment.isUser &&
                        <FontAwesomeIcon icon={trashSolid} style={{ cursor: 'pointer' }}
                            onClick={removeCommunityComment} />
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
