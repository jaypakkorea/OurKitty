import { createSlice } from '@reduxjs/toolkit';
import { IotImages } from './Type/iotImagesType';
import { Slice } from "./Type/global";

interface Init {
  imagesSlice: Slice
  images: Array<IotImages>,
  newImages: Array<IotImages>,
  hungryImages: Array<IotImages>,
  visitedImages: Array<IotImages>,
  isGettingIotImage: Boolean,
}
const initialState: Init = {
  imagesSlice: {
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

  images: [{
    createdDate: '',
    dish: {
    },
    id: 0,
    imgUrl: '',
    isLike: false,
  }],
  newImages: [{
    createdDate: '',
    dish: {
    },
    id: 0,
    imgUrl: '',
    isLike: false,
  }],
  hungryImages: [{
    createdDate: '',
    dish: {
    },
    id: 0,
    imgUrl: '',
    isLike: false,
  }],
  visitedImages: [{
    createdDate: '',
    dish: {
    },
    id: 0,
    imgUrl: '',
    isLike: false,
  }],
  isGettingIotImage: false,
}
// 초기 값 선언

const iotSlice = createSlice({
  name: 'iot',
  initialState,

  reducers: {
    setIsGettingIotImageListOn(state) {
      state.isGettingIotImage = true;
    },
    setIsGettingIotImageListOff(state) {
      state.isGettingIotImage = false;
    },

    // 이미지 추가
    getIotImage(state, action) {
      state.imagesSlice = action.payload;

      if (state.imagesSlice.first) {
        state.images = state.imagesSlice.content;
      } else {
        state.images = state.images.concat(state.imagesSlice.content);
      }
    },

    // 냥그릇별 iot 좋아요
    isImagesLikeOn(state, action) {
      let findLike = state.images.find((images) => images.id === action.payload)

      if (findLike) {
        findLike.isLike = findLike.isLike !== true;
      }
    },

    // 메인 New 냥이 불러오기
    mainNewIot(state, action) {
      state.newImages = action.payload.newImages;
    },

    // 메인 New 냥이 좋아요
    isNewImagesLikeOn(state, action) {
      let findLike = state.newImages.find((newImages) => newImages.id === action.payload)
      if (findLike) {
        findLike.isLike = findLike.isLike !== true;
      }
    },

    // 메인 배고픈 냥이 불러오기
    mainHungryIot(state, action) {
      state.hungryImages = action.payload.hungryImages;
    },
    isHungryImagesLikeOn(state, action) {
      let findLike = state.hungryImages.find((hungryImages) => hungryImages.id === action.payload)
      if (findLike) {
        findLike.isLike = findLike.isLike !== true;
      }
    },
    // 메인 내 냥그릇 냥이 불러오기
    mainVisitedIot(state, action) {
      state.visitedImages = action.payload.visitedImages;
    },
    isVisitedImagesLikeOn(state, action) {
      let findLike = state.visitedImages.find((visitedImages) => visitedImages.id === action.payload)
      if (findLike) {
        findLike.isLike = findLike.isLike !== true;
      }
    },
  },
});

export const iotActions = iotSlice.actions;

export default iotSlice;