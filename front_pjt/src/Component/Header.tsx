import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { useNavigate } from 'react-router';
import styled from 'styled-components'
import ArrowLeft from '../assets/icon/footer/arrowLeft.png'
import bell from '../assets/icon/footer/bell.png'
import bellring from 'assets/icon/footer/bellring.png'
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { fetchUserAlarmCheck, fetchUserAlarmDelete, fetchUserAlarmList } from "../Store/alarms-actions";
import { Link } from 'react-router-dom';

// import { Link } from 'react-router-dom';


function Header() {
  const [open, setOpen] = useState(false);

  // 알람 상태 수정
  const editAlarmsState = async (id: number) => {
    try {
      // @ts-ignore
      await dispatch(fetchUserAlarmCheck(id));
    } catch (error) {

    }
  }
  // 알람 지우기
  const removeAlarmsState = async (id: number) => {
    try {
      // @ts-ignore
      await dispatch(fetchUserAlarmDelete(id));
    } catch (error) {

    }
  }
  // @ts-ignore
  const userAlarmsList: Array<Alarm> = useSelector(state => state.alarms.userAlarms);
  const dispatch = useDispatch();
  const showDrawer = () => {
    setOpen(true);
    // @ts-ignore

  };
  const onClose = () => {
    setOpen(false);
  };

  const Login = () => {
    Swal.fire('로그인 후 사용해 주세요.', '', 'error');
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      // @ts-ignore
      dispatch(fetchUserAlarmList());
    }
  }, [open])
  const [visibleDishList, setVisibleDishList] = useState(true);
  const [visibleReport, setVisibleReport] = useState(true);


  return (
    <Container>
      <ArrowImg src={ArrowLeft} alt="ArrowLeft" onClick={() => navigate(-1)} />
      {localStorage.getItem('token') ?
        (userAlarmsList && userAlarmsList.length === 0 ?
          <ArrowImg src={bell} alt="bell" onClick={showDrawer} /> :
          <ArrowImg src={bellring} alt="bellring" onClick={showDrawer} />
        ) :
        <ArrowImg src={bell} alt="bell" onClick={Login} />
      }
      <SDrawer placement="right" onClose={onClose} open={open}>
        <LayoutDiv>
          <Title onClick={() => setVisibleDishList((prev) => !prev)}>활동 알림</Title>
          <SuvDiv visible={visibleDishList.toString()}>
            {!open ?
              <Exception>알림이 없어요~</Exception>
              :
              (userAlarmsList && userAlarmsList.map((data: any) => (
                (data.alarmType.toString().substring(0, 2) === '22' ?
                  <SubCardDiv back={data.state}>
                    <Link to={data.targetUrl}>
                      <FlexDiv onClick={() => editAlarmsState(data.id)}>
                        <DataText>
                          {data.content}
                        </DataText>
                        {data.imgUrl ?
                          <TextImg src={data.imgUrl} alt="이미지 없음" />
                          : <NoImg />
                        }
                      </FlexDiv>
                    </Link>
                    <CloseTag onClick={() => removeAlarmsState(data.id)}>
                      <CloseOutlined />
                    </CloseTag>

                  </SubCardDiv> : <></>
                )

              ))
              )
            }
          </SuvDiv>
        </LayoutDiv>
        <LayoutDiv>

          <Title onClick={() => setVisibleReport((prev) => !prev)}>냥그릇 알림</Title>
          <SuvDiv visible={visibleReport.toString()}>
            {!open ?
              <Exception>알림이 없어요~</Exception>
              :
              (userAlarmsList && userAlarmsList.map((data: any) => (
                (data.alarmType.toString().substring(0, 2) === '21' ?
                  <SubCardDiv back={data.state}>
                    <Link to={data.targetUrl}>
                      <FlexDiv onClick={() => editAlarmsState(data.id)}>
                        <DataText>
                          {data.content}
                        </DataText>
                        {data.imgUrl ?
                          <TextImg src={data.imgUrl} alt="이미지 없음" />
                          : <NoImg />
                        }
                      </FlexDiv>
                    </Link>
                    <CloseTag onClick={() => removeAlarmsState(data.id)}>
                      <CloseOutlined />
                    </CloseTag>

                  </SubCardDiv> : <></>
                )

              ))
              )
            }

          </SuvDiv>
        </LayoutDiv>
      </SDrawer>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  width: 100%;
  padding: 20px 0 10px 10px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.lightPink};
  @media ${(props) => props.theme.mobile} {
    width: 100vw;
  }
`;

const SDrawer = styled(Drawer)`
  .ant-drawer, .ant-drawer-body {
    padding: 0;
  }
`
const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const CloseTag = styled.div`
  padding: 10px 15px;
  margin: auto 0;
  cursor: pointer;
  :hover {

  }
`

const LayoutDiv = styled.div`
  margin-bottom: 1rem;
`
const ArrowImg = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
const TextImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;
const NoImg = styled.div`
  width: 50px;
  height: 50px;
`
const DataText = styled.div`
  min-width: 240px;
  margin: auto 0;
  cursor: pointer;
`
const Title = styled.div`
  font-size: 1.5rem;
  font-family: "BMJUA";
  margin-bottom: 5px;
  padding: 1rem;
`;

const SubCardDiv = styled.div`
  font-family: "BMYEONSUNG";
  background: ${({ back }: { back: number }) => (back === 1 ? 'white' : '#F4EDED')};
  justify-content: space-between;
  display: flex;
  padding: 5px 1rem;
`;

const SuvDiv = styled.div`
  display: ${({ visible }: { visible: string }) => (visible === 'true' ? '' : 'none')};
`;

// background-color: ${(props) => props.theme.colors.lightPink};

const Exception = styled.div`
  font-size: 3rem;
  text-align: center;
  width: 100%;
  margin: auto 0;
  font-family: BMJUA;
`