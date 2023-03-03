import { useEffect, useState } from 'react'
import { BlockCommunity, BlockOffCommunity, GetReportByCommunity, GetReportCommunity } from 'apis/api/admin';
import styled from 'styled-components';
import { Modal, Table, Tag } from 'antd';
import { LayoutFlex } from 'Component/Layout/LayoutFlex';
import type { ColumnsType } from 'antd/es/table';
import Swal from 'sweetalert2';

interface Community {
  communityId: number,
  communityCategoryName: string,
  communityImgs: Array<string>,
  userName: string,
  content: string,
  createdAt: string,
  modifiedAt: string,
  reportsCount: number,
  communityState: number,
}

interface CommunityReport {
  id: number,
  communityId: number,
  userId: number,
  userName: string,
  reportsContent: string,
  createdDate: string,
}

function CommunityReportModal(props: any) {
  // props
  const { selectedCommunity, modalOpen, handleModalOff } = props;
  const [communityReport, setCommunityReport] = useState<CommunityReport[]>([]);
  const [community, setCommunity] = useState<Community>({
    communityId: 0,
    communityCategoryName: "자유게시판",
    communityImgs: [],
    userName: "작성자",
    content: "내용",
    createdAt: "",
    modifiedAt: "",
    reportsCount: 0,
    communityState: 0,
  });

  useEffect(() => {
    if (modalOpen) {
      GetReportCommunity(selectedCommunity)
        .then(function (response: any) {
          setCommunity({
            communityId: response.communityId,
            communityCategoryName: response.communityCategoryName,
            communityImgs: response.communityImgs,
            userName: response.userName,
            content: response.content,
            createdAt: response.createdDate.split("T")[0] + " " + response.createdDate.split("T")[1].substring(0, 5),
            modifiedAt: response.modifiedDate,
            reportsCount: response.reportsCount,
            communityState: response.communityState
          });
        });

      getReports(selectedCommunity);
    }
  }, [modalOpen]);

  const blockCommunity = () => {
    BlockCommunity(selectedCommunity)
      .then(function (response: any) {
        if (response.id) {
          Swal.fire("Block 처리 되었습니다.", '', 'success');
          window.location.reload();
        }
      }).catch(function (err) {
        Swal.fire("Block 처리 도중 에러가 발생했습니다.", '', 'error');
      })
  }

  const blockOffCommunity = () => {
    BlockOffCommunity(selectedCommunity)
      .then(function (response: any) {
        if (response.id) {
          Swal.fire("Block 해제 되었습니다.", '', 'success');
          window.location.reload();
        }
      })
      .catch(function (err) {
        Swal.fire("Block 해제 도중 에러가 발생했습니다.", '', 'error');
      })
  }

  const getReports = (communityId: number) => {
    const reportList: CommunityReport[] = [];


    GetReportByCommunity(selectedCommunity)
      .then(function (response: any) {

        response.reportList.forEach((item: any) => {
          reportList.push({
            id: item.id,
            communityId: item.communityId,
            userId: item.userId,
            userName: item.userName,
            reportsContent: item.reportsContent,
            createdDate: item.createdDate.split("T")[0],
          });
        });
        setCommunityReport(reportList);
      });
  }


  const columns: ColumnsType<CommunityReport> = [
    {
      title: '아이디',
      dataIndex: 'userName',
      key: 'userName',
    },

    {
      title: '내용',
      key: 'reportsContent',
      dataIndex: 'reportsContent',
    },
    {
      title: '작성일자',
      key: 'createdDate',
      dataIndex: 'createdDate',
      // sorter: {
      //   compare: (a, b) => new Date(a.day) - new Date(b.day),
      // },
      //render: (day) => <>{day.split('T')[0]}</>,

    },
  ];


  return (
    <SModal
      open={modalOpen}
      centered
      footer={null}
      onCancel={handleModalOff}
      closable={true}
    >
      <ModalBoldText>

        <LayoutCard>
          <LayoutFlex justify={"space-between"} width={"100%"}>

            <LinkDiv>
              <div
                style={{ fontSize: "1.2rem", fontWeight: "500" }}>{community.communityCategoryName} / 작성자 : {community.userName}</div>
            </LinkDiv>

            <Tag color={community.communityState === 0 ? "green" : (community.communityState === 1 ? "red" : "yellow")}>
              {community.communityState === 0 ? "활성" : (community.communityState === 1 ? "삭제" : "블락")}
            </Tag>
          </LayoutFlex>


          <LinkDiv>
            <ContentDiv style={{ marginTop: "1rem", lineHeight: '1.3rem' }}>
              {community.content}
            </ContentDiv>

            <FlexImgDiv>
              {community.communityImgs.length === 1 ?
                <ImgDiv src={community.communityImgs[0]} alt="catFeet" width="100%" height="160" />
                :

                community.communityImgs.length !== 0 &&
                community.communityImgs.map((content: any) => (
                  <ImgDiv src={content} alt="catFeet" width="50%" height="160" />
                ))
              }
            </FlexImgDiv>
          </LinkDiv>


          <LayoutFlex width={"100%"}>
            <SubText>작성 일자 : {community.createdAt}</SubText>
          </LayoutFlex>
          <CardDiv>총 신고 수  : {community.reportsCount} &nbsp;&nbsp;<TagDiv>

          </TagDiv>
          </CardDiv>


        </LayoutCard>

        <SubTitle>신고내역</SubTitle>
        <Table
          showSorterTooltip={false}
          dataSource={communityReport}
          columns={columns}
          pagination={{
            defaultPageSize: 4
          }}
        />


        <FlexButtonDiv>
          {community.communityState === 0 ? <OKButton onClick={blockCommunity}>
            글 차단
          </OKButton> : (community.communityState === 2) ? <CancelButton onClick={blockOffCommunity}>
            차단 해지
          </CancelButton> : <></>}
        </FlexButtonDiv>
      </ModalBoldText>
    </SModal>
  );
}

export default CommunityReportModal;

const SModal = styled(Modal)`
.ant-modal-content{
  background-color: ${(props) => props.theme.colors.lightPink};
  padding: 2rem 0;
  height: 70vh;
  overflow: auto;
  ::-webkit-scrollbar {
        display: none;
    }
}

.ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select{
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

  .ant-table-cell {
    font-size: 0.8rem;
    font-family: "BMJUA";
    text-align: center;

    .ant-table-filter-column > div {
      display: flex;
      flex-direction: row;
      width: 100%;
    }

    ::before {
      background-color: transparent !important;
    }
  }

  .ant-table-filter-trigger-container {
    background: #fff;
  }

  .ant-table-filter-trigger:hover {
    background: #fff;
  }

  .ant-table-thead th.ant-table-column-has-sorters:hover,
  .ant-table-thead th.ant-table-column-sort {
    background: #fff;
  }

  td.ant-table-column-sort {
    background: #fff;
  }

  .ant-table-pagination-right {
    justify-content: center;
  }

  .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link,
  .ant-pagination-item {
    border: none;
    background-color: ${(props) => props.theme.colors.lightPink};
  }

`;


const SubTitle = styled.div`
font-size: 1.2rem;
`
const ContentDiv = styled.div`
margin: 1rem 0;
`
const ImgDiv = styled.img`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 6px;
  width: 90%;
  height: fit-content;
  margin-left: 5%;

`;


const TagDiv = styled.div`
  margin-left: 1rem;
`;

const CardDiv = styled.div`
display: flex;
width: 100%;
overflow: auto;
::-webkit-scrollbar {
        display: none;
    }
`
const CancelButton = styled.button`
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    background-color: white;
    width: 80px;
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
    width: 80px;
    color: white;
    :hover{
        border: 2px solid ${(props) => props.theme.colors.pink};
    }
`;

const FlexButtonDiv = styled.div`
    display: flex;
    margin: 1rem 0;
    justify-content: right;
    height: 40px;
    font-family: "BMJUA";
`;

const ModalBoldText = styled.div`
  width: 80%;
  margin: 1rem auto;
  font-family: "BMJUA";
`;

const LayoutCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 16px;
  min-width: 100%;
  margin-bottom: 2rem;

  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
`;

const LinkDiv = styled.div`
  width: 100%;
`;

const SubText = styled.div`
  font-size: 0.9rem;
`

const FlexImgDiv = styled.div`
  display: flex;
  overflow: auto;
  white-space: nowrap;

  ::-webkit-scrollbar {
    display: none;
  }
`;
