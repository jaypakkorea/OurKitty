export interface Hospital {
    hospitalId: number,
    groupId: number,
    name: string,
    address: string,
    lat: number,
    lon: number,
    phone: string,
    state: boolean
}

export interface HospitalTable {
    id: number;
    name: string;
    phone: string;
    address: string;
    state: string;
}