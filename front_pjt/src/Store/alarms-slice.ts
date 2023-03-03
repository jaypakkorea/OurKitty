import { createSlice } from '@reduxjs/toolkit';

interface Alarm {
  id: number
  alarmType: number,
  content: Array<string>,
  imgUrl: string,
  targetUrl: string,
  state: number,
  alarmsCode: number,
}

interface init {
  adminAlarms: Array<Alarm>,
  userAlarms: Array<Alarm>
  loading: boolean
}

// 초기 값 선언
const initialState: init = {
  adminAlarms: [{
    id: 0,
    alarmType: 0,
    content: [],
    imgUrl: '',
    targetUrl: '',
    state: 0,
    alarmsCode: 0,
  }],
  userAlarms: [{
    id: 0,
    alarmType: 0,
    content: [],
    imgUrl: '',
    targetUrl: '',
    state: 0,
    alarmsCode: 0,
  }],
  loading: false
}

// 함수 만들기
const alarmsSlice = createSlice({
  name: 'alarms',
  initialState,
  reducers: {

    // 관리자 알람 리스트 가져오기
    getAdminAlarmsList(state, action) {
      state.adminAlarms = action.payload.adminAlarms;
    },

    // 관리자 알람 체크
    adminAlarmCheck(state, action) {
      // @ts-ignore
      let findAlarm: Alarm = state.adminAlarms.find((alarm) => alarm.id === action.payload);
      findAlarm.alarmsCode = 1;
    },

    // 관리자 알람 지우기
    adminAlarmDelete(state, action) {
      // @ts-ignore
      state.adminAlarms = state.adminAlarms.filter((alarm: Alarm) => alarm.id !== action.payload)
    },


    // 유저 알람 리스트 가져오기
    getUserAlarmsList(state, action) {
      state.userAlarms = action.payload.userAlarms;
    },

    // 유저 알람 체크
    userAlarmCheck(state, action) {
      // @ts-ignore
      let findAlarm: Alarm = state.userAlarms.find((alarm) => alarm.id === action.payload);
      findAlarm.alarmsCode = 1;

    },

    // 유저 알람 지우기
    userAlarmDelete(state, action) {
      // @ts-ignore
      state.userAlarms = state.userAlarms.filter((alarm: Alarm) => alarm.id !== action.payload)
    },

  },
});


export const alarmsActions = alarmsSlice.actions;

export default alarmsSlice;

