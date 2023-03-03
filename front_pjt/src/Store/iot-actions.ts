import { iotActions } from "./iot-slice";
import { GetIotImgs } from "apis/api/community";
import { GetHungryIotImgs, GetNewIotImages, GetVisitedIotImgs } from "apis/api/iot";

// 해당 냥그릇 Iot 사진
export const fetchIotImageData = (dish_id: number, page: number = 0) => {
    return async (dispatch: any) => {
        dispatch(iotActions.setIsGettingIotImageListOn());

        let empty = true;

        try {
            const iotData = await GetIotImgs(dish_id, page);

            iotData.content.sort((e1: any, e2: any) => {
                return (e1.isLike === e2.isLike) ? 0 : e1.isLike ? -1 : 0;
            });

            dispatch(iotActions.getIotImage(iotData));

            empty = iotData.empty

            return;
        } catch (error) {
            console.log("데이터 받아오는데 실패함", error)
        } finally {
            // 로딩끝
            if (empty) {
                dispatch(iotActions.setIsGettingIotImageListOn());
            } else {
                dispatch(iotActions.setIsGettingIotImageListOff());
            }
        }
    };
};

// 메인 최신 Iot 사진
export const fetchNearIotImageData = () => {
    return async (dispatch: (arg0: { payload: any; type: "iot/mainNewIot"; }) => void) => {
        try {
            const iotData = await GetNewIotImages();
            dispatch(iotActions.mainNewIot({ newImages: iotData }));

            return;
        } catch (error) {
            console.log("데이터 받아오는데 실패함", error)
        }
    };
};

// 메인 배고픈 냥그릇 Iot 사진
export const fetchHungryIotImageData = () => {
    return async (dispatch: (arg0: { payload: any; type: "iot/mainHungryIot"; }) => void) => {
        try {
            const iotData = await GetHungryIotImgs();

            dispatch(iotActions.mainHungryIot({ hungryImages: iotData }));
            return;
        } catch (error) {
            console.log("데이터 받아오는데 실패함", error)
        }
    };
};

// 메인 내 냥그릇 들린 냥이 Iot 사진
export const fetchVisitedIotImageData = () => {
    return async (dispatch: any) => {
        try {
            const iotData = await GetVisitedIotImgs();

            dispatch(
                iotActions.mainVisitedIot({ visitedImages: iotData })
            );

            return iotData;
        } catch (error) {
            console.log("visitedImages데이터 받아오는데 실패함", error)
        }
    };
};