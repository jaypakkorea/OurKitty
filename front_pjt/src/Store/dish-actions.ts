import { addDish, deleteDish, getAdminDishes, GetLoginUserDishLike, updateDish, updateDishDetail } from "apis/api/dish";
import { dishAction } from "./dish-slice";
import { Dish, DishAddType, DishLocation } from "./Type/DishType";

export const fetchGetDishList = () => {
    return async (dispatch: any) => {
        try {
            const { data } = await getAdminDishes();
            data.map((el: any) => ({ ...el, key: el.id }));
            dispatch(dishAction.setDishList({ dishList: data }));
        } catch (error) {
            console.log(error);
        }
    };
};

export const fetchAddDish = (dish: DishAddType) => {
    return async (dispatch: any) => {
        dispatch(dishAction.setLoadingStateOn());

        try {
            const { status, message } = await addDish(dish);
            return { status, message };
        } finally {
            dispatch(dishAction.setLoadingStateOff());
        }
    };
};

export const fetchUpdateDish = (dish: Dish) => {
    return async (dispatch: any) => {
        dispatch(dishAction.setLoadingStateOn());

        try {
            const { status, message } = await updateDish(dish);
            return { status, message };
        } finally {
            dispatch(dishAction.setLoadingStateOff());
        }
    };
};

export const fetchDeleteDish = (id: number) => {
    return async (dispatch: any) => {
        dispatch(dishAction.setLoadingStateOn());

        try {
            const { status, message } = await deleteDish(id);
            dispatch(dishAction.setDish(null));
            return { status, message };
        } finally {
            dispatch(dishAction.setLoadingStateOff());
        }
    };
};


export const fetchUpdateDishLocationAndPhoto = (dish: DishLocation) => {
    return async (dispatch: any) => {
        dispatch(dishAction.setLoadingStateOn());

        try {
            const param: Dish = { ...dish };
            // 1. 업데이트
            const { status, message } = await updateDishDetail(param);
            // 2. 리스트 조회
            const { data } = await getAdminDishes();
            dispatch(dishAction.setDishList({ dishList: data }));

            return { status, message };
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(dishAction.setLoadingStateOff());
        }
    };
};


export const fetchDishLocation = (lat: any, lon: any, loadAddress: any) => {
    return async (dispatch: any) => {
        dispatch(
            dishAction.setDishLocation({
                lat, lon, loadAddress
            })
        );
    };
};

export const fetchDish = (dish: Dish) => {
    return async (dispatch: any) => {
        dispatch(
            dishAction.setDish(dish)
        );
    };
};

export const fetchUserDishLike = () => {
    return async (dispatch: any) => {

        try {
            const dishLike = GetLoginUserDishLike();
            dispatch(dishAction.setDish(dishLike));
            return;
        } catch (error) {
            console.log(error)
        }
    };
};

