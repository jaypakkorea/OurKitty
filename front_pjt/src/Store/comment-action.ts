import { commentActions } from "./comment-slice";
import { CommunityCommentList } from "apis/api/community";
import { getNoticeComment } from "../apis/api/notice";


export const fetchCommunityCommentList = (communityId: number) => {

    return async (dispatch: any) => {
        dispatch(commentActions.setIsGettingCommunityCommentListOn())
        try {
            const commentList = await CommunityCommentList(communityId);

            dispatch(commentActions.getCommunityCommentList({ commentList: commentList }));

            return;
        } catch (error) {
            console.log("데이터 받아오는데 실패함", error)
        } finally {
            dispatch(commentActions.setIsGettingCommunityCommentListOff())
        }
    };
};

export const fetchNoticeCommentList = (noticeId: number) => {
    // @ts-ignore
    return async (dispatch) => {
        dispatch(commentActions.setIsGettingCommunityCommentListOn())

        try {
            const noticeCommentList = await getNoticeComment(noticeId);

            dispatch(
                commentActions.getCommunityCommentList({
                    commentList: noticeCommentList
                })
            );

            return;
        } catch (error) {
            console.log("데이터 받아오는데 실패함", error)
        } finally {
            dispatch(commentActions.setIsGettingCommunityCommentListOff())
        }
    };
};