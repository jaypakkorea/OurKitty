import { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styled from "styled-components";
import { Notice } from "./NoticeList"
import NoticeModal from "../../../Component/modal/NoticeModal";

const columns: ColumnsType<Notice> = [
  {
    title: '작성자',
    dataIndex: 'adminName',
    key: 'noticeWriter',
    align: "center",
    width: "1.5rem",
  },
  {
    title: '내용',
    dataIndex: 'content',
    key: 'noticeContent',
    className: "history-content",
    align: "center",
    width: "9rem",
  },
  {
    title: '작성 일자',
    dataIndex: 'createdAt',
    key: 'noticeCreatedAt',
    align: "center",
    width: "5rem",
  },
];

const NoticeTable = (props: any) => {

  const [noticeModal, setNoticeModal] = useState<boolean>(false);
  const [notice, setNotice] = useState<Notice>({
    noticeId: -1,
    adminName: "",
    content: "",
    noticeImgs: [],
    createdAt: ""
  });

  const modalClose = () => {
    setNoticeModal(false);
  }

  const modalOpen = (selectNotice: Notice) => {
    setNotice(selectNotice);
    setNoticeModal(true);
  }

  return (
    <CustomTable>
      <Table
        rowKey="noticeId"
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => modalOpen(record)
          }
        }
        }
        dataSource={props.notices}
        pagination={{ position: ["bottomCenter"], pageSize: 13 }}
      />
      <NoticeModal modalOpen={noticeModal} modalClose={modalClose} notice={notice} reLoad={props.reLoad} />
    </CustomTable>
  )
};

export default NoticeTable;

const CustomTable = styled.div`

  max-width: 95%;

  .ant-table-filter-trigger-container {
    background: #fff;
  }

  .ant-table-cell {
    font-size: 0.8rem;

    background-color: transparent !important;
    font-family: "BMYEONSUNG", serif !important;

    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .ant-table-row {

    :nth-child(2n + 1) {
      background-color: lightgray !important;
    }

    :hover {
      cursor: pointer;
    }
  }

  .history-content {
    min-width: 7.5rem;
    max-width: 7.5rem;
  }

  .history-writer {
    min-width: 5.5rem;
    max-width: 5.5rem;
  }

  .ant-table {
    background: transparent;
  }

  .ant-pagination-item {
    color: gray;
  }

  .ant-pagination-item-active {
    color: black;
    background: transparent;
    border: none;
  }

`
