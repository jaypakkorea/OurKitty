import { Input, Spin, Upload } from "antd";
import { useLocation, useNavigate } from 'react-router';
import AdminHeader from "Component/AdminHeader";
import { useEffect, useState } from "react";
import { Form } from "antd";
import styled from "styled-components";
import Swal from "sweetalert2";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import SmallFindMap from "containers/userMap/smallFindMap";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteDish, fetchDish, fetchUpdateDish } from "Store/dish-actions";

function MapListDishEdit() {
  const navigate = useNavigate();
  const { state } = useLocation();
  // 미리보기 이미지 데이터 저장
  const [filesimg, setFilesimg] = useState<any>('');
  // state
  const [loading, setLoading] = useState(false);
  // 실제 올라갈 이미지 데이터 저장
  const [file, setFile] = useState<any>();
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  // @ts-ignore
  const selectedDish = useSelector(state => state.dish.selectedDish);
  // @ts-ignore
  const progressing = useSelector(state => state.dish.loadingState);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchDish(state));
    setFilesimg(state.dishImg);

    form.setFieldsValue({
      dishName: state.dishName,
      otherNote: state.otherNote,
      image: state.dishImg,
      imageUrl: state.dishImg,
      loadAddress: state.loadAddress,
      lat: state.lat,
      lon: state.lon,
      id: state.id,
    });
  }, []);

  useEffect(() => {
    form.setFieldValue('loadAddress', selectedDish.loadAddress);
    form.setFieldValue('lat', selectedDish.lat);
    form.setFieldValue('lon', selectedDish.lon);
  }, [selectedDish]);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // 이미지 재업로드
  const handleReUploadBtnClick = () => {
    setFile(null);
    setFilesimg(null);
    setLoading(false);
  };

  const addFile = (file: Blob) => {
    // 실제 저장
    setFile(file);
    //미리보기 데이터 저장
    setFilesimg(URL.createObjectURL(file));
    form.setFieldValue('imageUrl', "changed");
  };

  const handleModifyClick = async () => {
    if (form.getFieldValue('imageUrl') == "changed") {
      form.setFieldValue('image', file);
    } else {
      form.setFieldValue('image', null);
    }

    const formItem = {
      'dishName': form.getFieldValue("dishName"),
      'otherNote': form.getFieldValue("otherNote"),
      'imageUrl': form.getFieldValue("imageUrl"),
      'image': form.getFieldValue("image"),
      'loadAddress': form.getFieldValue("loadAddress"),
      'lat': form.getFieldValue("lat"),
      'lon': form.getFieldValue("lon"),
      'id': form.getFieldValue("id"),
    };

    // @ts-ignore
    const { status, message } = await dispatch(fetchUpdateDish(formItem));
    if (status >= 400) {
      Swal.fire(message, '', 'error');
    } else if (status >= 200) {
      Swal.fire('수정되었습니다.', '', 'success')
        .then(() => {
          // @ts-ignore
          dispatch(fetchDish(null));
          navigate(`/catadmin/catlist/map/0`);
        });
    }
  };

  const handleDeleteClick = async () => {
    // @ts-ignore
    const { status, message } = await dispatch(fetchDeleteDish(selectedDish.id));
    if (status >= 400) {
      Swal.fire(message, '', 'error');
    } else if (status >= 200) {
      Swal.fire('삭제되었습니다.', '', 'success')
        .then(() => {
          // @ts-ignore
          dispatch(fetchDish(null));
          navigate(`/catadmin/catlist/map/0`);
        });
    }
  };

  return (
    <Container>
      <AdminHeader />
      <CardDiv>
        <Form
          name="basic"
          autoComplete="off"
          form={form}
        >

          <ReferTitle>냥그릇 이름 </ReferTitle>
          <Form.Item
            name="dishName"
            rules={[{ required: true, message: '냥그릇 이름을 입력해주세요.' }]}
            validateTrigger={["onSubmit", "onBlur"]}
          >
            <StyledInput
              name="dishName"
              defaultValue={state.dishName}
              maxLength={20}
            />
          </Form.Item>

          <ReferTitle>비고 </ReferTitle>
          <Form.Item
            name="otherNote"
          >
            <Input.TextArea
              style={{ fontSize: " 1.3rem" }}
              rows={5}
              name="otherNote"
              defaultValue={state.otherNote}
            />
          </Form.Item>

          <ReferTitle>위치정보 </ReferTitle>
          <LocationMap>
            <SmallFindMap lat={state.lat} lon={state.lon} loadAddress={state.loadAddress} />
          </LocationMap>

          <ReferTitle>이미지 </ReferTitle>
          <Form.Item
            name="image"
          >
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
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
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <FlexButtonDiv>
            <CancelButton type="button" onClick={handleDeleteClick}>
              삭제
            </CancelButton>
            <OKButton type="submit" onClick={handleModifyClick}>
              수정
            </OKButton>
          </FlexButtonDiv>
        </Form>
      </CardDiv>
      {progressing && <LoadingDiv><Spin /></LoadingDiv>}
    </Container >
  );
}
export default MapListDishEdit;
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.lightPink};
  position: relative;

  .ant-upload {
    width: 100%;
    height: 100%;
  }
  .ant-upload.ant-upload-select {
    width: 100% !important;
    height: 200px !important;
  }
`;
const CardDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 2rem;
  overflow: auto;
  ::-webkit-scrollbar {
      display: none;
  }
`;

const StyledInput = styled(Input)`
  padding: 0.5rem;
  font-size: 0.9rem;
  width: 100%;
  font-size: 1.3rem;
  font-family: "BMHANNAPro";
  :focus,
  :active,
  :hover {
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme.hotPink};
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme.hotPink};
  }
`;

const TitleStyle = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.darkGray};
`;

const ReferTitle = styled(TitleStyle)``;

const FlexButtonDiv = styled.div`
    display: flex;
    margin: 3rem 0 10rem 0;
    justify-content: end;
    height: 40px;
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
    :hover{
        border: 2px solid ${(props) => props.theme.colors.pink};
    }
`;

const CancelButton = styled.button`
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    background-color: white;
    width: 60px;
    color: ${(props) => props.theme.colors.hotPink};
    font-weight: bold;
    :hover{
        border: 2px solid ${(props) => props.theme.colors.pink};
    }
`;

const LocationMap = styled.div`
  height: 35vh;
`
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
  z-index: 3;
`;