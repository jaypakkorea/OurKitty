import { Form, Input, Checkbox } from 'antd';
import styled from 'styled-components'
import { useNavigate } from 'react-router';
import { AddHospital } from 'apis/api/hospital';
import SmallFindMap from 'containers/userMap/smallFindMap';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';


declare global {
  interface Window {
    kakao: any;
    geocoder: any;
  }
}

function Hospital(props: any) {
  const { reload } = props;
  const navigate = useNavigate();
  const [form] = Form.useForm();

  //@ts-ignore
  const selectedDish = useSelector(state => state.dish.selectedDish);


  //폼 제출
  const handleRegisterHospital = async () => {
    //getLangLon(address);
    if (selectedDish.loadAddress === "" || form.getFieldValue("name") === "") {
      Swal.fire("필수 값을 작성해주세요.", '', 'error');
    }
    if (selectedDish.loadAddress !== "") {
      let data = {
        'hospitalName': form.getFieldValue("name"),
        'address': selectedDish.loadAddress,
        'lat': selectedDish.lat,
        'lon': selectedDish.lon,
        'hospitalPhone': `${form.getFieldValue("phone1")}-${form.getFieldValue("phone2")}-${form.getFieldValue("phone3")}`,
        'hospitalState': form.getFieldValue("state") ? 1 : 0
      };
      AddHospital(data).then(function (response: any) {
        Swal.fire('등록되었습니다.', '', 'success');
        navigate(`/catadmin/catlist/map/0`, { state: { defaultKey: 2 } });
        //처리
      })
        .catch(function (error: any) {
          Swal.fire("등록 도중 문제가 발생했습니다.", '', 'error');
        });
    }

    else {

    }

  };

  return (
    <Container>
      <CardDiv>
        <Form
          name="basic"
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
          autoComplete="off"
        >
          <ReferTitle>병원명 </ReferTitle>
          <Form.Item
            name="name"
            rules={[{ required: true, message: '병원명을 입력해주세요.' }]}
          >
            <StyledInput
              name="name"
            />
          </Form.Item>
          <ReferTitle>소재지 </ReferTitle>
          <LocationMap>

            <SmallFindMap reload={reload} />
          </LocationMap>

          <ReferTitle>전화번호 (선택) </ReferTitle>
          <PhoneFlexDiv>
            <Form.Item
              name="phone1"
            >
              <StyledInput
                name="phone1"
                maxLength={3}
              />
            </Form.Item>&nbsp;-&nbsp;
            <Form.Item
              name="phone2"
            >
              <StyledInput
                name="phone2"
                maxLength={4}
              />
            </Form.Item>&nbsp;-&nbsp;
            <Form.Item
              name="phone3"
            >
              <StyledInput
                name="phone3"
                maxLength={4}
              />
            </Form.Item>
          </PhoneFlexDiv>
          <Form.Item name="state" valuePropName="checked">
            <Checkbox name="state">
              <ReferTitle>연계 동물병원 여부</ReferTitle>
            </Checkbox>

          </Form.Item>
          <FlexButtonDiv>
            <CancelButton onClick={() => navigate(-1)}>
              취소
            </CancelButton>
            <OKButton type="submit" onClick={handleRegisterHospital}>
              확인
            </OKButton>
          </FlexButtonDiv>


        </Form>
      </CardDiv>
    </Container>
  );
}

export default Hospital;

const Container = styled.div`
    width: 100%;
    /* display: flex; */
    //padding: 1rem;
    height: 95vh;
    padding-bottom: 60px;
    overflow: auto;
    background-color: ${(props) => props.theme.colors.lightPink};
    ::-webkit-scrollbar {
        display: none;
    }
    @media ${(props) => props.theme.mobile} {
    width: 100vw;
    }
`;


const CardDiv = styled.div`
  margin: 3rem;
`;

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
  font-size: 1.3rem;
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

const PhoneFlexDiv = styled.div`
    display: flex;
    font-size: 1.5rem;
`;

const FlexButtonDiv = styled.div`
    display: flex;
    margin: 3rem 0;
    justify-content: center;
    height: 40px;
    font-family: "BMJUA";
`;

const LocationMap = styled.div`
  height: 35vh;
`;