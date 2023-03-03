import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

import Container from "Component/Layout/Container";
import Layout from "Component/Layout/Layout";
import Header from "Component/Header";
import { Input, Modal, Form, Upload, Button } from 'antd';
import { LayoutFlex } from 'Component/Layout/LayoutFlex';
import Send from 'assets/icon/button/send.png'
import { EditCommunity } from 'apis/api/community';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunityDetail } from "Store/community-actions";
import _default from "chart.js/dist/plugins/plugin.tooltip";

function CommunityEdit() {
    const url = window.location.href.split("/");
    const communityId: number = Number(url[url.length - 2])
    const navigate = useNavigate();

    // @ts-ignore
    const communityDetail = useSelector(state => state.community.community);
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchCommunityDetail(communityId));

    }, [dispatch, communityId])


    const [tag, setTag] = useState("0")
    const [text, setText] = useState(communityDetail.content)

    const { TextArea } = Input;

    //텍스트 폼
    const onChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setText(e.target.value)
    };
    // 취소 확인 모달
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const cancelModal = () => {
        setIsModalOpen(false);
    };
    const [files, setFiles] = useState<any>([]);

    // 이미지 업로드
    const addFiles = (file: Blob) => {
        setFiles(files.concat(file));
    }

    // 이미지 삭제
    const dropFile = (dropFile: any) => {
        let uid = dropFile.uid;
        setFiles(files.filter((file: { uid: any; }) => file.uid !== uid));
    }
    const formData = new FormData();


    const handleSignupButton = async () => {
        if (tag === '0') {
            Swal.fire('커뮤니티 태그를 정해주세요.', '', 'error');
            return;
        }

        if (text.length < 1) {
            Swal.fire('수정할 내용을 입력해주세요', '', 'error');
            return;
        }

        // 이미지 파일 업로드
        files.forEach((file: string | Blob) => formData.append('imgFiles', file));

        // 나머지 데이터 추가
        formData.append('communityCategoryId', tag);
        formData.append('content', text);
        formData.append('dishId', communityId.toString())

        try {
            const editCommunity = await EditCommunity(communityId, formData);
            if (editCommunity) {
                navigate(-1);
                Swal.fire('커뮤니티 수정 성공.', '', 'success');
            }
        } catch (error) {
            Swal.fire('다시 한번 시도해주세요.', '', 'error');
        }

    };

    return (
        <Container>
            <Header></Header>
            <Layout>
                {/* </Form.Item> */}
                <LayoutFlex gap={"8px"}>
                    <TagButton onClick={() => setTag('1')}
                        style={tag === '1' ? { background: '#D9D9D9' } : { background: '#F2F2F2' }}
                    >찬반토론 </TagButton>
                    <TagButton onClick={() => setTag('2')}
                        style={tag === '2' ? { background: '#D9D9D9' } : { background: '#F2F2F2' }}
                    >자유 게시판 </TagButton>
                    <TagButton onClick={() => setTag('3')}
                        style={tag === '3' ? { background: '#D9D9D9' } : { background: '#F2F2F2' }}
                    >고양이 자랑 </TagButton>
                </LayoutFlex>
                <Form>
                    <Form.Item
                        name="upload"
                    >
                        <Upload
                            name="logo"
                            multiple={false}
                            beforeUpload={file => {
                                addFiles(file);
                                return false;
                            }}
                            onRemove={file => {
                                dropFile(file);
                            }}
                        >
                            <Button icon={<UploadOutlined />}>이미지 올리기</Button>
                        </Upload>
                    </Form.Item>
                </Form>
                <TextArea showCount
                    style={{ minHeight: 200, width: '100%', resize: 'none' }}
                    maxLength={300} onChange={onChangeText}
                    value={text}
                />
                <FlexButtonDiv>
                    <CancelButton onClick={showModal}>
                        취소
                    </CancelButton>
                    <OKButton type="submit" onClick={handleSignupButton}>
                        <SendImg src={Send} alt="Send" />
                    </OKButton>
                </FlexButtonDiv>
                <SModal open={isModalOpen}
                    centered
                    closable={false}
                    footer={null}>
                    <ModalBoldText>작성을 취소하시겠습니까?</ModalBoldText>
                    <DeleteButtonDiv>
                        <CancelButton onClick={cancelModal}>
                            취소
                        </CancelButton>
                        <OKButton onClick={() => navigate(-1)}>
                            확인
                        </OKButton>
                    </DeleteButtonDiv>
                </SModal>
                {/* </Form> */}
            </Layout>
        </Container>
    );
};


export default CommunityEdit;

const TagButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 1rem;
  border-radius: 10px;
  border: 1px solid #D9D9D9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const SModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${(props) => props.theme.colors.lightPink};
    padding: 3rem 0 2rem 0;
  }

  .ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select {
    width: 70%;
    margin-left: 15%;
    height: 200px;
    overflow: hidden;
  }
`;
const OKButton = styled.button`
  margin: 0 1rem;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.hotPink};
  width: 60px;
  color: white;
  font-weight: bold;

  :hover {
    border: 2px solid ${(props) => props.theme.colors.pink};
  }
`;

const FlexButtonDiv = styled.div`
  width: 100%;
  display: flex;
  margin: 3rem 0;
  justify-content: end;
  height: 40px;
`;

const SendImg = styled.img`
  width: 25px;
  height: 25px;
`;

const CancelButton = styled.button`
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  background-color: white;
  width: 60px;
  color: ${(props) => props.theme.colors.hotPink};
  font-weight: bold;
  height: 40px;

  :hover {
    border: 2px solid ${(props) => props.theme.colors.pink};
  }
`;
const ModalBoldText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  width: 70%;
  margin: 1rem auto;
`;
const DeleteButtonDiv = styled.div`
  display: flex;
  margin: 3rem auto;
  /* justify-content: space-around; */
  height: 40px;
  width: 150px;
`;