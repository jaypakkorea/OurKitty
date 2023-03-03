import { getDishPreferenceList } from "../apis/api/preference";
import { preferenceAction } from "./preference-slice";
import { AnyAction, Dispatch } from "redux";

export const fetchPreferenceList = (id: number) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(preferenceAction.isGettingPreferenceListOn())

        try {
            const preferenceList = await getDishPreferenceList(id);

            dispatch(preferenceAction.getPreferenceList(preferenceList));

        } catch (error) {
            console.log("fetchUserDishList 받아오는데 실패함", error)
        } finally {
            dispatch(preferenceAction.isGettingPreferenceListOff())
        }
    };
};

export const fetchUserPreference = (id: number) => {
    return async (dispatch: (arg0: any) => void) => {
        dispatch(preferenceAction.isGettingUserPreferenceOn())

        try {
            const userPreference = await getDishPreferenceList(id);

            dispatch(preferenceAction.getUserPreference(userPreference));

        } catch (error) {
            console.log("fetchUserDishList 받아오는데 실패함", error)
        } finally {
            dispatch(preferenceAction.isGettingUserPreferenceOff())
        }
    };
};