import React, { useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

import Container from "Component/Layout/Container";
import Layout from "Component/Layout/Layout";
import { Input, Modal, Form, Upload, Button } from 'antd';
import Send from 'assets/icon/button/send.png'
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';


function AdminTnrAdd() {
  const navigate = useNavigate();
  const { TextArea } = Input;

  const [text, setText] = useState('')

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

  const outThisSite = () => {
    setText('')
    setFiles([])
    navigate(-1)
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

  const [posting, setPosting] = useState(false);

  const handleNoticeCreate = async () => {
    if (files && text) {
      setPosting(true)

      formData.append('content', text);
      files.forEach((file: string | Blob) => formData.append('imgFiles', file));
      axios({
        method: 'post',
        url: 'https://ourkitty.site/api/notices',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('adminToken'),
        },
        data: formData
      })
        .then((res) => {
          Swal.fire('글 작성 성공!.', '', 'success');
          setText('')
          setFiles([])
          setPosting(false)
        })
        .catch((error) => {
          Swal.fire('다시 한번 시도해주세요.', '', 'error');
          setPosting(false)
        })
    }
    else {
      Swal.fire('내용을 입력해주세요.', '', 'error');
    }
  };

  return (
    <Container>
      <Layout>
        <Form>
          <Form.Item
            name="upload"
          >
            <Upload
              name="logo"
              multiple={false}
              beforeUpload={file => { addFiles(file); return false; }}
              onRemove={file => { dropFile(file); }}
            >
              <Button icon={<UploadOutlined />}>TNR 고양이 사진</Button>
            </Upload>
          </Form.Item>
        </Form>
        <TextArea showCount
          value={text}
          style={{ height: '30vh', width: '100%', resize: 'none' }}
          maxLength={500} onChange={onChangeText}
        />

        <FlexButtonDiv>
          <CancelButton onClick={showModal}>
            취소
          </CancelButton>
          {!posting ? <OKButton type="submit" onClick={handleNoticeCreate}>
            <SendImg src={Send} alt="Send" />
          </OKButton> :
            <OKButton type="submit">
              <SendImg src={Send} alt="Send" />
            </OKButton>
          }
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
            <OKButton onClick={outThisSite}>
              확인
            </OKButton>
          </DeleteButtonDiv>
        </SModal>
      </Layout>
    </Container>

  );
}

export default AdminTnrAdd;

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