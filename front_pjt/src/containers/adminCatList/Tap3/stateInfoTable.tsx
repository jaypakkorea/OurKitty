import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { GetDishReportCommunity } from 'apis/api/admin';
import CommunityReportModal from 'Component/modal/CommunityReportModal';

interface DataType {
  key: number;
  name: string;
  reportsNum: number;
  category: string;
  text: string;
  day: string;
  state: number;
}

const columns: ColumnsType<DataType> = [
  // {
  //     title: '번호',
  //     dataIndex: 'key',
  //     key: 'key',
  // },
  {
    title: '아이디',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '상태',
    key: 'state',
    dataIndex: 'state',
    render: (state: number) => {
      let data = state === 0 ? "활성" : (state === 1 ? "삭제" : "블락");
      let color = state === 0 ? "green" : (state === 1 ? "red" : "yellow");
      return (
        <div>
          <Tag color={color} key={state}>
            {data}
          </Tag>
        </div>
      );
    },
    filters: [
      {
        text: '활성',
        value: 0
      },
      {
        text: '삭제',
        value: 1
      },
      {
        text: '블락',
        value: 2
      },
    ],
    onFilter: (value, record: DataType) => record.state === value

  },
  {
    title: '카테고리',
    key: 'category',
    dataIndex: 'category',
  },
  {
    title: '내용',
    key: 'text',
    dataIndex: 'text',
    render: (content: string) => {
      return (
        <div>
          {content.length > 8 ? content.substring(0, 8) + "..." : content}
        </div>
      );
    },
  },
  {
    title: '신고 수',
    dataIndex: 'reportsNum',
    key: 'reportsNum',
    sorter: (a, b) => a.reportsNum - b.reportsNum,
    defaultSortOrder: 'descend',
  },
  {
    title: '작성일자',
    key: 'day',
    dataIndex: 'day',
    sorter: (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime(),
    defaultSortOrder: 'descend',
  },
];


function StateInfoTable() {
  const [modalState, setModalState] = useState(false);
  const strimUrl = window.location.href.charAt(window.location.href.length - 1) === '/' ? window.location.href.substring(0, window.location.href.length - 1) : window.location.href;
  const dishId: number = Number(strimUrl[strimUrl.length - 1]);
  const [data, setData] = useState<DataType[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState(-1);

  useEffect(() => {
    getDishReportList();

  }, []);

  const modalOpen = () => {
    setModalState(true);
  }

  const modalOff = () => {
    setModalState(false);
  }

  const getDishReportList = () => {
    const reslist: DataType[] = [];

    GetDishReportCommunity(dishId).then(function (response: any) {

      response.communityList.forEach((item: any) => {
        var dataOne: DataType = {
          key: item.id,
          name: item.userName,
          reportsNum: item.reportsCount,
          category: item.communityCategoryName,
          text: item.content,
          day: item.createdDate.split("T")[0],
          state: item.communityState
        }
        reslist.push(dataOne);
      });
      setData(reslist);
    });
  }


  return (
    <div>

      <TableBody>
        <Table scroll={{ x: 'max-content' }}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                setSelectedCommunity(record.key);
                modalOpen();
              }
            }
          }}
          rowKey="key"
          dataSource={data}
          columns={columns}
          showSorterTooltip={false}
          pagination={{
            defaultPageSize: 4
          }}
        />
      </TableBody>
      <CommunityReportModal selectedCommunity={selectedCommunity} modalOpen={modalState} handleModalOff={modalOff}></CommunityReportModal>
    </div>
  );
};

export default StateInfoTable

const TableBody = styled.div`
    width: 100%;
    max-width: 23.5rem;
  & thead > tr:nth-child(1) > th {
    font-size: 0.8rem;
    text-align: center;
    background: ${(props) => props.theme.colors.white};
    border-bottom: 2px solid ${(props) => props.theme.colors.lightGray};
  }

  .ant-table-cell {
    font-size: 0.8rem;
    font-family: "BMJUA" !important;
    text-align: center;
    
    .ant-table-filter-column > div {
      display: flex;
      flex-direction: row;
      width: 100%;

      justify-content: center;
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
