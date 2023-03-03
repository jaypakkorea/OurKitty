import { authInstance } from '../utils/instance';

// 메인 New냥이 iot 데이터 받아오기
export async function GetNewIotImages() {
  return await authInstance
    .get(`/pictures/recent`)
    .then((res) => res.data)
    .catch((err) => console.error(err, 'GetNewIotImages 에러'));
}

// iot 사진 좋아요
export async function LikeIot(pictureId: number) {
  return await authInstance
    .get(`/pictures/${pictureId}/like`)
    .then((res) => res.data)
    .catch((err) => console.error(err, 'LikeIot 에러'));
}

// 메인 배고픈 고양이 iot 사진 불러오기
export async function GetHungryIotImgs() {
  return await authInstance
    .get(`/pictures/hungry-cats`)
    .then((res) => res.data);
}

// 메인 내 냥그릇에 들린 고양이 iot 사진 불러오기
export async function GetVisitedIotImgs() {
  return await authInstance
    .get(`/pictures/like-dishes-cats`)
    .then((res) => res.data);
}
