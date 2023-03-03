import styled from 'styled-components';
import { Modal, Form, Input, Checkbox } from 'antd';
import { useEffect } from 'react';
import { UpdateHospital } from 'apis/api/hospital';
import { useNavigate } from 'react-router';
import { DeleteHospital } from 'apis/api/hospital';
import SmallFindMap from 'containers/userMap/smallFindMap';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

function HospitalDetailModal(props: any) {
  const [form] = Form.useForm();

  const { hospital, modalOpen, handleModalOff } = props;

  //@ts-ignore
  const selectedDish = useSelector(state => state.dish.selectedDish);

  useEffect(() => {
    if (hospital !== undefined) {
      form.setFieldsValue({
        "name": hospital.name,
        //"address": hospital.address,
        "phone1": hospital.phone.split("-")[0],
        "phone2": hospital.phone.split("-")[1],
        "phone3": hospital.phone.split("-")[2],
        "state": hospital.state
      });
    }

  }, [modalOpen]);

  const deleteHospital = (hospitalId: number) => {
    Swal.fire({
      title: '정말로 삭제하시겠습니까?',
      icon: 'question',
      background: '#F4EDED',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    })
      .then((result) => {
        if (result.isConfirmed) {
          DeleteHospital(hospitalId).then((res) => {
            Swal.fire("삭제되었습니다.", '', 'success');
            window.location.reload();
          })
            .catch((err) => {
              Swal.fire("삭제 도중 에러가 발생했습니다.", '', 'error');
            });
        }
      })

  }

  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=ff2962af82ba5b9d23c6017f4379d5f9&libraries=services&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {

        // 주소-좌표 변환 객체를 생성합니다
        window.geocoder = new window.kakao.maps.services.Geocoder();

      })
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

  }, [])


  //폼 제출
  const handleRegisterHospital = async () => {

    let address = hospital.address;
    let y = hospital.lat;
    let x = hospital.lon;

    if (selectedDish.loadAddress !== "") {
      y = selectedDish.lat;
      x = selectedDish.lon;
      address = selectedDish.loadAddress;
    }

    if (x !== 0 && y !== 0) {
      let data = {
        'id': hospital.hospitalId,
        'hospitalName': form.getFieldValue("name"),
        'address': address,
        'lat': y,
        'lon': x,
        'hospitalPhone': `${form.getFieldValue("phone1")}-${form.getFieldValue("phone2")}-${form.getFieldValue("phone3")}`,
        'hospitalState': form.getFieldValue("state") ? 1 : 0
      };

      UpdateHospital(data).then((response) => {
        Swal.fire("수정되었습니다.", '', 'success');
        window.location.reload();
        //처리
      })
        .catch((err) => {
          Swal.fire("수정 도중 에러가 발생했습니다.", '', 'error');
        });
    }
    else {
      Swal.fire("올바른 주소를 입력해주세요.", '', 'error');
    }
  };


  //텍스트 폼

  return (
    <SModal
      open={modalOpen}
      centered
      footer={null}
      onCancel={handleModalOff}
      closable={true}
    >
      <FlexTextDiv>
        <ModalBoldText>동물병원 수정</ModalBoldText>
      </FlexTextDiv>
      <CardDiv>
        <Form
          name="basic"
          form={form}
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
        >
          <ReferTitle>병원명 </ReferTitle>
          <Form.Item
            name="name"
          >
            <StyledInput
              name="name"
            />
          </Form.Item>
          <ReferTitle>소재지 </ReferTitle>
          <LocationMap>
            {hospital !== undefined ?
              <SmallFindMap loadAddress={hospital.address} lat={hospital.lat} lon={hospital.lon} />
              : <SmallFindMap />}

          </LocationMap>

          <ReferTitle>전화번호 (선택) </ReferTitle>

          <PhoneFlexDiv>
            <Form.Item
              name="phone1"
            >
              <StyledInput
                name="phone1"
              />
            </Form.Item>&nbsp;-&nbsp;
            <Form.Item
              name="phone2"
            >
              <StyledInput
                name="phone2"
              />
            </Form.Item>&nbsp;-&nbsp;
            <Form.Item
              name="phone3"
            >
              <StyledInput
                name="phone3"
              />
            </Form.Item>
          </PhoneFlexDiv>
          <Form.Item
            name="state" valuePropName="checked">
            <Checkbox name="state">
              <ReferTitle>연계 동물병원 여부</ReferTitle>
            </Checkbox>
          </Form.Item>
          <FlexButtonDiv>
            {
              hospital !== undefined ?
                <CancelButton onClick={() => deleteHospital(hospital.hospitalId)}>
                  삭제
                </CancelButton> : <></>
            }
            <OKButton type="submit" onClick={handleRegisterHospital}>
              수정
            </OKButton>
          </FlexButtonDiv>
        </Form>
      </CardDiv>
    </SModal>
  );
}

export default HospitalDetailModal;


const SModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${(props) => props.theme.colors.lightPink};
    padding: 2rem 0;
    height: 70vh;
    overflow: auto;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select {
    width: 80%;
    margin-left: 15%;
    height: 200px;
  }

  & thead > tr:nth-child(1) > th {
    /* display: none; */
    padding: 10px 5px;
    text-align: center;
    font-size: 0.8rem;
    background: ${(props) => props.theme.colors.white};
    border-bottom: 2px solid ${(props) => props.theme.colors.lightGray};
  }

`;

const CardDiv = styled.div`
  margin: 1rem 2rem 2rem;
`
const TitleStyle = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.darkGray};
`;

const ReferTitle = styled(TitleStyle)`
  font-family: "BMJUA";
`;

const StyledInput = styled(Input)`
  padding: 0.5rem 0;
  font-size: 0.9rem;
  width: 100%;
  font-size: 1.1rem;

  :focus,
  :active,
  :hover {
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme.hotPink};
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme.hotPink};
  }
`;

const CancelButton = styled.button`
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  // margin-left: 1rem;
  border-radius: 12px;
  background-color: white;
  width: 80px;
  color: ${(props) => props.theme.colors.hotPink};

  :hover {
    border: 2px solid ${(props) => props.theme.colors.pink};
  }
`;

const OKButton = styled.button`
  margin-left: 1rem;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.hotPink};
  width: 80px;
  color: white;

  :hover {
    border: 2px solid ${(props) => props.theme.colors.pink};
  }
`;

const FlexButtonDiv = styled.div`
  display: flex;
  margin: 2rem 0;
  justify-content: center;
  height: 40px;
  font-family: "BMJUA";
`;

const ModalBoldText = styled.div`
  font-size: 1.5rem;
  //   margin: 1rem auto;
  font-family: "BMJUA";
`;

const PhoneFlexDiv = styled.div`
  display: flex;
  font-size: 1.5rem;
`;
const FlexTextDiv = styled.div`
  display: flex;
  height: 40px;
  margin-left: 2rem;
  justify-content: left;
  font-family: "BMJUA";
  align-items: baseline;
  gap: 10px;
`;

const LocationMap = styled.div`
  height: 35vh;
`;