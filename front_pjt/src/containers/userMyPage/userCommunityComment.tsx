// @flow
import { LayoutFlex } from "../../Component/Layout/LayoutFlex";
import TestCat from "../../assets/images/testCat.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as likeSolid, faTrash as trashSolid } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as likeRegular } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { CommunityCommentLike, RemoveCommunityComment } from "../../apis/api/community";
import { commentActions } from "../../Store/comment-slice";
import { communityActions } from "../../Store/community-slice";
import { useDispatch, useSelector } from "react-redux";

type Props = {
    comment: any
    communityId: number

};

export const CommunityComment = (props: Props) => {
    const commentId = props.comment.commentId
    const communityId = props.communityId
    const dispatch = useDispatch();

    // @ts-ignore
    const comment = useSelector(state => state.communityComment.communityCommentList.content.find((comment) => comment.commentId === commentId));

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
        await RemoveCommunityComment(communityId, comment.commentId)
        dispatch(commentActions.deleteCommunityComment(comment.commentId));
        dispatch(communityActions.deleteCommunityComment());
    }

    return (
        <LayoutFlex direction={"column"} gap={"12px"} width={"100%"} key={comment.commentId}>
            <LayoutFlex direction={"row"} justify={"space-between"} width={"100%"}>
                <LayoutFlex gap={"12px"}>
                    <MainProfilImg src={TestCat} alt="catFeet" />
                    <LayoutFlex direction={"column"} gap={"4px"}>
                        <div>{comment.userName}</div>
                        <div>{comment.region} {comment.createdAt}</div>
                        <div>{comment.content}</div>
                    </LayoutFlex>
                </LayoutFlex>

                <LayoutFlex gap={"8px"}>
                    {/*댓글 좋아요 */}
                    <LayoutFlex gap={"4px"}>
                        {comment.isLike ?
                            <FontAwesomeIcon icon={likeSolid} style={{ cursor: 'pointer' }} onClick={onChangeCommunityCommentLike} /> :
                            <FontAwesomeIcon icon={likeRegular} style={{ cursor: 'pointer' }}
                                onClick={onChangeCommunityCommentLike} />}
                        {comment.likeCount}
                    </LayoutFlex>

                    {/*댓글 삭제*/}
                    {comment.isUser &&
                        <FontAwesomeIcon icon={trashSolid} style={{ cursor: 'pointer' }} onClick={removeCommunityComment} />
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