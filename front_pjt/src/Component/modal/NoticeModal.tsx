import styled from 'styled-components';
import { Modal } from 'antd';
import Swal from "sweetalert2";
import { deleteNotice } from "../../apis/api/notice";

function NoticeModal(props: any) {

  const { modalOpen, modalClose, notice, reLoad } = props;

  const handleDelete = () => {
    Swal.fire({
      title: '삭제하시겠습니까??',
      icon: 'question',
      background: '#F4EDED',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNotice(notice.noticeId).then(res =>
          Swal.fire(
            '삭제되었습니다',
            '',
            'success').then(v => {
              reLoad();
              modalClose();
            }).catch(error =>
              Swal.fire(
                error,
                '',
                'error'
              )))
      }
    })
  }

  return (
    <Container
      open={modalOpen}
      destroyOnClose={true}
      centered
      closable={false}
      footer={null}>
      <ContentDiv>
        {notice && notice.noticeImgs.map((img: any, index: number) => (
          <img key={index} src={img} alt="noticeImg" width="100%" />
        ))}
        <MainText>{notice.content}</MainText>
      </ContentDiv>
      <FooterDiv>
        <FooterLeftDiv>
          <SubText>{notice.adminName}</SubText>
          <SubText>{notice.createdAt}</SubText>
        </FooterLeftDiv>
        <FooterRightDiv>
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
          <CancelButton onClick={modalClose}>닫기</CancelButton>
        </FooterRightDiv>
      </FooterDiv>
    </Container>
  )
}

export default NoticeModal;

const Container = styled(Modal)`
  .ant-modal-content {
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.lightPink};
    padding: 2em;
  }
`

const SubText = styled.div`
  font-size: 0.9rem;

  font-family: "BMJUA";
`;

const MainText = styled.div`
  font-size: 1.8rem;
  font-weight: bold;

  font-family: "BMYEONSUNG";
`

const ContentDiv = styled.div`
  margin: 1rem 0 2rem;
`

const FooterLeftDiv = styled.div`
  margin: 0;
`

const FooterDiv = styled.div`
  display: flex;
  margin-top: 1em;
  justify-content: space-between;
`;

const FooterRightDiv = styled.div`
  display: flex;
  justify-content: end;
`

const DeleteButton = styled.button`
  border: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.hotPink};

  width: 60px;
  height: 40px;
  margin-top: auto;
  margin-right: 1rem;

  color: white;
  font-weight: bold;

  :hover {
    border: 2px solid ${(props) => props.theme.colors.pink};
  }
`

const CancelButton = styled.button`
  border: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  background-color: white;

  width: 60px;
  height: 40px;
  margin-top: auto;

  color: ${(props) => props.theme.colors.hotPink};
  font-weight: bold;

  :hover {
    border: 2px solid ${(props) => props.theme.colors.pink};
  }
`;

