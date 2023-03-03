import { adminAuthInstance } from 'apis/utils/adminInstance';
import {
    baseInstance,
    authAdminInstance,
    authAdminFormInstance,
    authAdminMultipartFormInstance,
    authInstance
} from 'apis/utils/instance';
import { AxiosError } from 'axios';


// type
import { Dish, DishAddType } from 'Store/Type/DishType';
import Swal from "sweetalert2";

export async function getAdminDishes() {
    return await authAdminInstance.get(`/dishes/admin-groups`);
}

export async function getDishes(params: any) {
    return await baseInstance.get(`/dishes`, { params });
}

//관리자 - 냥그릇 방문데이터 읽어오기
export async function GetDishVisitData(dish_id: number, date: string) {

    return await adminAuthInstance.get(`/admins/dishes/visit/${dish_id}?date=${date}`)
        .then((res) => res.data)
        .catch((err) => console.error(err, 'GetDishVisitData 에러'));
}

export async function GetDishWeightData(dish_id: number, date: string) {
    return await baseInstance.get(`/admins/dishes/weight/${dish_id}?date=${date}`)
        .then((res) => res.data)
        .catch((err) => console.error(err, 'GetDishWeightData 에러'));
}

//관리자 - 냥그릇 추가
export async function addDish(body: DishAddType) {
    try {
        // validation
        if (body.serialNumber.trim() === "" || body.dishName.trim() === "") {
            throw new Error("필수 값을 작성해주세요.");
        }

        const formData = new FormData();
        formData.append('serialNumber', body.serialNumber);
        formData.append('dishName', body.dishName);
        formData.append('otherNote', body.otherNote);

        const { status, data } = await authAdminFormInstance.post(`/dishes`, formData);
        return { status, data };
    } catch (error: any) {
        if (error instanceof AxiosError) {
            const { status, message } = error.response?.data;
            return { status, message };
        }

        return { status: 400, message: error.message };
    }
}

//관리자 - 냥그릇 업데이트
export async function updateDish(body: Dish) {
    try {
        // validation
        if (body.dishName.trim() === "") {
            throw new Error("필수 값을 작성해주세요.");
        }

        const formData = new FormData();
        formData.append('dishName', body.dishName);
        formData.append('otherNote', body.otherNote);
        formData.append('image', body.image);
        formData.append('imageUrl', body.imageUrl);
        formData.append('loadAddress', body.loadAddress);
        formData.append('lat', body.lat);
        formData.append('lon', body.lon);
        formData.append('id', body.id);

        const { status, data } = await authAdminMultipartFormInstance.put(`/dishes/${body.id}`, formData);
        return { status, data };
    } catch (error: any) {
        if (error instanceof AxiosError) {
            const { status, message } = error.response?.data;
            return { status, message };
        }

        return { status: 400, message: error.message };
    }
}

//관리자 - 냥그릇 삭제
export async function deleteDish(id: number) {
    try {
        const { status, data } = await authAdminFormInstance.delete(`/dishes/${id}`);
        return { status, data };
    } catch (error: any) {
        if (error instanceof AxiosError) {
            const { status, message } = error.response?.data;
            return { status, message };
        }

        return { status: 400, message: error.message };
    }
}

//관리자 - 냥그릇 위치 가져오기
export async function getDishLocation(params: any) {
    try {
        const { status, data } = await authAdminInstance.get(`/dishes/original-location/${params}`);
        return { status, data };
    } catch (error: any) {
        const { response } = error;
        const { data } = response;
        const { status, message } = data;
        console.error('getDishLocation', data);
        return { status, message };
    }
}

//관리자 - 냥그릇 위치, 주소, 사진 정보 추가
export async function updateDishDetail(body: Dish) {
    try {
        const formData = new FormData();
        formData.append('dishId', body.id);
        formData.append('image', body.dishImg);
        formData.append('lat', body.lat);
        formData.append('lon', body.lon);
        formData.append('loadAddress', body.loadAddress);

        const { status, data } = await authAdminMultipartFormInstance.put(`/dishes/original-location`, formData);
        return { status, data };
    } catch (error: any) {
        const { response } = error;
        const { data } = response;
        const { status, message } = data;
        console.error('getDishList', data);
        return { status, message };
    }
}

//냥그릇의 최근 iot 이미지 가져오기
export async function GetDishIotImages(dish_id: number) {

    return await adminAuthInstance.get(`/pictures/dishes/${dish_id}`)
        .then((res) => res.data)
        .catch((err) => console.error(err, 'GetDishIotImages 에러'));
}

//관리자 - 관리하는 냥그릇 리스트 불러오기
export async function GetAdminGroupDish() {

    return await adminAuthInstance.get(`/dishes/admin-groups/`)
        .then((res) => res.data)
        .catch((err) => console.error(err, 'GetAdminGroupDish 에러'));
}

//관리자 - 관리하는 냥그릇 전체 무게정보 가져오기
export async function GetAllDishWeightData(date: string) {
    return await adminAuthInstance.get(`/admins/dishes/weight?date=${date}`)
        .then((res) => res.data)
        .catch((err) => console.error(err, 'GetDishWeightData 에러'));
}

export async function GetLoginUserDishLike() {
    return await authInstance.get(`/dishes/like/`)
        .then((res) => res.data)
        .catch((err) => console.error(err, 'GetLoginUserDishLike 에러'));
}

//관리자 - 냥그릇 정보 가져오기
export async function getDishData(dish_id: number): Promise<Dish> {
    try {
        const response = await adminAuthInstance.get<Dish>(`/dishes/${dish_id}`);
        return response.data;
    } catch (error) {
        Swal.fire('존재하지 않는 냥그릇입니다.', '', 'error').then(() =>
            window.history.back()
        );
        throw error;
    }
}
