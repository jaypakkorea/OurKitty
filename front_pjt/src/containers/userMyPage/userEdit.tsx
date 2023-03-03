import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Switch, Avatar, Modal, Input, Form, Upload, Button, Spin } from 'antd';
import Container from 'Component/Layout/Container';
import Header from 'Component/Header';
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UploadOutlined } from '@ant-design/icons';
import CatFeet from 'assets/icon/catFeet.png'
import { updateProfileLocationAllow, updateProfileUserName } from 'apis/api/user';
import { fetchProfileUserImg, fetchUserInfo } from 'Store/user-action';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from 'Store';

const UserEdit: React.FC = () => {

  const dispatch = useAppDispatch();

  const fetchedUser = useAppSelector(state => state.user.user);
  const progressing = useAppSelector(state => state.user.loadingState);

  // 미리보기 이미지 데이터 저장
  const [filesimg, setFilesimg] = useState<any>('');
  // 실제 올라갈 이미지 데이터 저장
  const [file, setFile] = useState<any>();

  const [userNameForm] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      // 1. 유저 정보 가져오기
      getUserInfo();
    }
  }, []);

  const getUserInfo = () => {
    dispatch(fetchUserInfo());
  };

  const onCloseEditProfileModal = (dropFile: any) => {
    handleReUploadBtnClick();
    setIsEditProfileOpen(false)
  };
  const onEditProfileModal = () => {
    setIsEditProfileOpen(true)
  };

  const addFile = (file: Blob) => {
    // 실제 저장
    setFile(file);
    //미리보기 데이터 저장
    setFilesimg(URL.createObjectURL(file));
  };

  // 이미지 재업로드
  const handleReUploadBtnClick = () => {
    setFile(null);
    setFilesimg(null);
  };

  const onCloseEidtModal = () => {
    setIsEditModalOpen(false)
  };

  const onEditModal = () => {
    setIsEditModalOpen(true)
  };

  const onJustCloseModal = () => {
    setIsModalOpen(false);
  };
  const onLocationModalOpen = () => {
    setIsModalOpen(true);
  };

  const onSendNewProfile = async () => {
    const { status, message } = await dispatch(fetchProfileUserImg(file));
    if (status >= 400) {
      Swal.fire(message, "", 'error');
    } else if (status >= 200) {
      Swal.fire("사진 수정 되었습니다.", "", 'success');
      getUserInfo();
    }

    setIsEditProfileOpen(false);
    handleReUploadBtnClick(); // 파일 초기화
  };

  const onSendNewName = async () => {
    const { status, message } = await updateProfileUserName({
      "nickName": userNameForm.getFieldValue("nickName"),
    });
    if (status >= 400) {
      Swal.fire(message, "", 'error');
    } else if (status >= 200) {
      Swal.fire("이름 수정 되었습니다.", "", 'success');
      getUserInfo();
    }
    setIsEditModalOpen(false);
  };

  const onCloseModal = async () => {
    const { status, message } = await updateProfileLocationAllow();
    if (status >= 400) {
      Swal.fire(message, "", 'error');
    } else if (status >= 200) {
      Swal.fire("위치 정보 허용 되었습니다.", "", 'success');
      getUserInfo();
    }

    onJustCloseModal(); // 모달 창 닫기
  };

  const onLocationDenyUpdate = async () => {
    const { status, message } = await updateProfileLocationAllow();
    if (status >= 400) {
      Swal.fire(message, "", 'error');
    } else if (status >= 200) {
      Swal.fire("위치 정보 동의 해제 되었습니다.", "", 'success');
      getUserInfo();
    }
  }

  return (
    <Container>
      <Header />
      {fetchedUser ?
        <UserEditLayout>
          <Title>
            프로필 수정
          </Title>
          <ProfileImg>
            {
              fetchedUser.userPicture ?
                <>
                  <UserProfilImg onClick={onEditProfileModal} src={fetchedUser.userPicture} alt={CatFeet} />
                </>
                :
                <>
                  <MyAvatar onClick={onEditProfileModal} size={100} icon={<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#FFAAC7" stroke="#FFAAC7"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0" fill="#121212"></path> </g></svg>} />
                </>
            }
          </ProfileImg>
          <MarginForContent />
          <FlexboxFirst>
            <AndTitle>
              사용자 이름
            </AndTitle>
            <AndSpan>
              {fetchedUser.userName}
              <FontAwesomeIcon onClick={onEditModal} icon={faPen} style={{ cursor: 'pointer', marginLeft: '1rem' }} />
            </AndSpan>
          </FlexboxFirst>
          <FlexboxFirst>
            <AndTitle>
              위치정보 동의
            </AndTitle>
            {fetchedUser.isAgree ?
              <Switch checked={true} onChange={onLocationDenyUpdate} />
              :
              <Switch checked={false} onChange={onLocationModalOpen} />
            }
          </FlexboxFirst>

          <SModal open={isModalOpen}
            centered
            closable={false}
            footer={null}
          >
            <LocationToggle>
              <p>“냥그릇”이(가) 사용자의 </p>
              <p>위치에 접근하도록 </p>
              <p>허용하시겠습까? </p>
            </LocationToggle>
            <FlexRowBoxCenter>
              <CancelButton onClick={onJustCloseModal}>아니요</CancelButton>
              <OkButton onClick={onCloseModal}>허용</OkButton>
            </FlexRowBoxCenter>
          </SModal>

          <SModal open={isEditModalOpen}
            centered
            closable={false}
            footer={null}
          >
            <LocationToggle>
              <p>원하시는 프로필 이름을</p>
              <p>입력해주세요 </p>
            </LocationToggle>
            <Form form={userNameForm}>
              <Form.Item name="nickName">
                <StyledInput
                  maxLength={10}
                  defaultValue={fetchedUser.userName}
                />
              </Form.Item>
            </Form>
            <FlexRowBox>
              <CancelButton onClick={onCloseEidtModal}>취소</CancelButton>
              <OkButton onClick={onSendNewName}>저장</OkButton>
            </FlexRowBox>
          </SModal>

          <SModal open={isEditProfileOpen}
            centered
            closable={false}
            footer={null}
          >
            <LocationToggle>
              <p>원하시는 프로필 사진을</p>
              <p>올려주세요 </p>
            </LocationToggle>
            <Form>
              <Form.Item
                name="upload"
              >
                <Upload
                  name="upload"
                  showUploadList={false}
                  multiple={false}
                  beforeUpload={(file) => { addFile(file) }}
                  onRemove={handleReUploadBtnClick}
                >
                  {filesimg ? <img
                    src={filesimg}
                    alt="avatar"
                    style={{
                      width: '8rem',
                      height: '8rem',
                      objectFit: 'contain',
                    }}
                  /> :
                    <Button icon={<UploadOutlined />}>프로필 사진 올리기</Button>}
                </Upload>
              </Form.Item>
            </Form>
            <FlexRowBox>
              {progressing && <LoadingDiv><Spin /></LoadingDiv>}
              <CancelButton onClick={onCloseEditProfileModal}>취소</CancelButton>
              <OkButton onClick={onSendNewProfile}>저장</OkButton>
            </FlexRowBox>
          </SModal>

        </UserEditLayout>
        :
        <>
          <Title>
            잘못된 경로입니다
          </Title>
        </>
      }
    </Container >
  );
}
export default UserEdit;


const ProfileImg = styled.div`

`;

const FlexRowBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 1rem;
`

const FlexRowBoxCenter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
`

export const UserEditLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  gap: 24px;
  width: 100%;
  height: 95vh;
  padding-bottom: 160px;
  overflow: auto;
  background-color: ${(props) => props.theme.colors.lightPink};
  ::-webkit-scrollbar {
      display: none;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100vw;
  }
`;

const FlexboxFirst = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
`

const MyAvatar = styled(Avatar)`
  background-color : lightpink;
  border : 3px solid black;
  cursor : pointer;
`;

const Title = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-bottom : 2rem;
  margin-top : 4rem;
`

const AndTitle = styled.div`
  font-size: 1rem;
  text-align: center;
  margin-bottom : 2rem;
  margin-right : 3rem;
  margin-left : 5rem;
  font-family : BMJUA;
`

const AndSpan = styled.div`
  font-size: 1rem;
  text-align: center;
  margin-bottom : 2rem;
  margin-right : 1rem;
  margin-left : 1rem;
  font-family : BMJUA;
`
const LocationToggle = styled.div`
  font-size: 1.5rem;
  text-align: center;
  padding: 1rem;
  font-family : BMJUA;
  line-height: 0.6;
`
const OkButton = styled.span`
  font-size: 1rem;
  font-family : BMJUA;
  color : #FF4081;
  &:hover {
    cursor: pointer;
  }
`
const CancelButton = styled.div`
  font-size: 1rem;
  font-family : BMJUA;
  color : gray;
  &:hover {
    cursor: pointer;
  }
`

const MarginForContent = styled.div`
  margin : 2rem;
`

const SModal = styled(Modal)`
  position: relative;
  padding: 1rem;
  .ant-form {
    text-align: center;
  }
  .ant-modal-content{
    background-color: ${(props) => props.theme.colors.lightPink};
  }
`;

const UserProfilImg = styled.img`
height:8rem;
width: 8rem;
border-radius:50%;
border : 1px solid black;
&:hover {
  cursor: pointer;
}
`;

const StyledInput = styled(Input)`
  margin-bottom: 1rem;
  :focus,
  :active,
  :hover {
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme.hotPink};
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme.hotPink};
  }
`;

const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: end;
  z-index: 10;
`;