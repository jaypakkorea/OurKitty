import { useState } from 'react'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Form, Modal, Spin, Upload } from 'antd';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateDishLocationAndPhoto } from 'Store/dish-actions';

function ImageUploadModal(props: any) {
  // props
  const { confirmDish, modalOpen, handleModalOff } = props;
  // state
  const [imageLoading, setImageLoading] = useState(false);
  // 실제 올라갈 데이터 저장
  const [file, setFile] = useState<any>();
  // 미리보기 데이터 저장
  const [filesimg, setFilesimg] = useState<any>('');

  const dispatch = useDispatch();

  const uploadButton = (
    <div>
      {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // @ts-ignore
  const loading = useSelector(state => state.dish.loadingState);

  // 이미지 업로드
  const handleOkBtnClick = () => {
    // validation
    if (file == null) {
      Swal.fire("사진이 필요합니다.", "", 'error');
      return;
    }
    (async () => {
      // @ts-ignore
      const result = await dispatch(fetchUpdateDishLocationAndPhoto({ ...confirmDish, dishImg: file }));
      if (result.status >= 400) {
        Swal.fire(result.message, '', 'error');
        handleModalOff();
      } else if (result.status >= 200) {
        Swal.fire('수정 되었습니다.', '', 'success');
        handleModalOff();
      }
    })();
  };

  // 이미지 재업로드
  const handleReUploadBtnClick = () => {
    setFile(null);
    setFilesimg(null);
    setImageLoading(false);
  };

  const addFile = (file: Blob) => {
    // 실제 저장
    setFile(file);
    //미리보기 데이터 저장
    setFilesimg(URL.createObjectURL(file));
  };

  return (
    <SModal open={modalOpen}
      centered
      footer={null}
      onCancel={handleModalOff}
    >
      <ModalBoldText>냥그릇의 사진을 촬영해 올려주세요 ~ </ModalBoldText>

      <Form>
        <Form.Item
          name="upload"
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            // onChange={handleChange}
            multiple={false}
            beforeUpload={(file) => { addFile(file) }}
            onRemove={handleReUploadBtnClick}
          >
            {filesimg ? (
              <img
                src={filesimg}
                alt="avatar"
                style={{
                  width: '100%',
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
      </Form>
      <FlexButtonDiv>
        <CancelButton style={{ width: "90px" }} onClick={handleReUploadBtnClick}>
          다시올리기
        </CancelButton>
        <OKButton style={{ width: "90px" }} onClick={handleOkBtnClick} disabled={imageLoading}>
          {imageLoading ? "업로드 중.." : "확인"}
        </OKButton>
      </FlexButtonDiv>
      {loading && <LoadingDiv><Spin /></LoadingDiv>}
    </SModal>
  );
}

export default ImageUploadModal;

const SModal = styled(Modal)`
  width: 24rem;
  
  .ant-modal-content{
    background-color: ${(props) => props.theme.colors.lightPink};
    padding: 3rem 0 2rem 0;
  }
  .ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select{
    width: 70%;
    margin-left: 15%;
    height: 200px;
    overflow: hidden;
  }
`;

const CancelButton = styled.button`
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    background-color: white;
    width: 60px;
    color: ${(props) => props.theme.colors.hotPink};
    :hover{
        border: 2px solid ${(props) => props.theme.colors.pink};
    }
`;

const OKButton = styled.button`
    margin-left: 1rem;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    background-color: ${(props) => props.theme.colors.hotPink};
    width: 60px;
    color: white;
    :hover{
        border: 2px solid ${(props) => props.theme.colors.pink};
    }
`;

const FlexButtonDiv = styled.div`
    display: flex;
    margin: 3rem 0;
    justify-content: center;
    height: 40px;
    font-family: "BMJUA";
`;

const ModalBoldText = styled.div`
  font-size: 1.5rem;
  text-align: center;
  width: 70%;
  margin: 1rem auto;
  font-family: "BMJUA";
`;

const LoadingDiv = styled.div`
  background-color: rgba(80, 80, 80, 20%);
  margin: auto;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;