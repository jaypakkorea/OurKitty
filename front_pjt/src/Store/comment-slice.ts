import { createSlice } from '@reduxjs/toolkit';
import { Slice } from "./Type/global";
import { Comment } from "./Type/communityType";


interface init {
    commentList: Slice
    comment: Comment
    isGettingCommentList: boolean,
}

const initialState: init = {
    commentList: {
        content: [],
        empty: false,
        first: true,
        last: true,
        number: 0,
        numberOfElements: 0,
        pageable: {},
        size: 0,
        sort: {},
    },
    comment: {
        commentId: 0,
        userName: "",
        userImg: "",
        content: "",
        likeCount: 0,
        isLike: false,
        isUser: false,
        createdAt: "",
        modifiedAt: ""
    },
    isGettingCommentList: false
}

// 초기 값 선언
const commentSlice = createSlice({
    name: 'comment',
    initialState,

    reducers: {
        setIsGettingCommunityCommentListOn(state) {
            state.isGettingCommentList = true;
        },

        setIsGettingCommunityCommentListOff(state) {
            state.isGettingCommentList = false;
        },

        // 댓글 리스트 불러오기
        getCommunityCommentList(state, action) {
            state.commentList = action.payload.commentList
        },

        // 댓글 추가하기
        addCommunityCommentList(state, action) {
            state.commentList.content.push(action.payload.comment)
        },

        // 댓글 삭제하기
        deleteCommunityComment(state, action) {
            state.commentList.content = state.commentList.content.filter((comment) => comment.commentId !== action.payload)
        },

        // 댓글 좋아요
        communityCommentLikeOn(state, action) {
            // @ts-ignore
            const comment: Comment = state.commentList.content.find((comment) => comment.commentId === action.payload)
            comment.isLike = true
            comment.likeCount += 1
        },

        // 댓글 좋아요
        communityCommentLikeOff(state, action) {
            // @ts-ignore
            const comment: Comment = state.commentList.content.find((comment) => comment.commentId === action.payload)
            comment.isLike = false
            comment.likeCount -= 1
        },
    },
});

export const commentActions = commentSlice.actions;

export default commentSlice;