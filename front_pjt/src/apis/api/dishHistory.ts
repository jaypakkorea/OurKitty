import { authAdminInstance } from 'apis/utils/instance';


export async function getHistories(dishId: number) {
    return await authAdminInstance.get(`/dishes/histories/${dishId}`);
}

export async function addHistory(dishHistory: any) {
    return await authAdminInstance.post(`/dishes/histories`, dishHistory);
}