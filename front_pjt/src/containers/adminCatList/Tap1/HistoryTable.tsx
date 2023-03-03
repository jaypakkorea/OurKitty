import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styled from "styled-components";
import DishHistory from "./dishHistory";
import DishHistoryAddModal from "../../../Component/modal/DishHistoryAddModal";
import DishHistoryShowModal from "../../../Component/modal/DishHistoryShowModal";

const columns: ColumnsType<DishHistory> = [
  {
    title: '상태',
    dataIndex: 'state',
    key: 'state',
    align: "center",
    width: "1.5rem",
    render: (_, { state }) => (
      <>
        {
          state === 0 ? (<GreenCircle></GreenCircle>)
            : state === 1 ? (<YellowCircle></YellowCircle>)
              : (<RedCircle></RedCircle>)
        }
      </>
    ),
  },
  {
    title: '내용',
    dataIndex: 'content',
    key: 'content',
    className: "history-content",
    align: "center",
    width: "7.5rem",
    render: (_, { content }) => (
      <>
        {
          <BodyContent>{content}</BodyContent>
        }
      </>
    ),
  },
  {
    title: '작성자',
    dataIndex: 'adminName',
    key: 'adminName',
    className: "history-writer",
    align: "center",
    width: "6rem",
    render: (_, { adminName }) => (
      <>
        {
          <BodyContent>{adminName}</BodyContent>
        }
      </>
    ),
  },
  {
    title: '작성 일자',
    dataIndex: 'createdDate',
    key: 'createdDate',
    align: "center",
    render: (_, { createdDate }) => (
      <>
        {
          <BodyContent>{createdDate}</BodyContent>
        }
      </>
    ),
  },
];

const HistoryTable = (props: any) => {

  const [historyShowModal, setHistoryShowModal] = useState<boolean>(false);
  const [dishHistory, setDishHistory] = useState<DishHistory>({
    state: -1,
    content: "",
    adminId: -1,
    adminName: "",
    createdDate: "",
    dishId: -1,
    id: -1
  });

  const modalClose = () => {
    setHistoryShowModal(false);
  }

  const modalOpen = (dishHistory: DishHistory) => {
    setDishHistory(dishHistory);
    setHistoryShowModal(true);
  }

  return (
    <CustomTable>
      <Table
        rowKey="id"
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => modalOpen(record)
          }
        }
        }
        dataSource={props.histories}
        pagination={{ position: ["bottomCenter"], pageSize: 5 }}
      />
      <DishHistoryShowModal modalOpen={historyShowModal} modalClose={modalClose} dishHistory={dishHistory} />
    </CustomTable>
  )
};

export default HistoryTable;

const CustomTable = styled.div`
  
  max-width: 95%;

  .ant-table-filter-trigger-container {
    background: #fff;
  }

  .ant-table-cell {
    font-size: 0.8rem;

    background-color: transparent !important;
    font-family: "BMYEONSUNG",serif !important;
    
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
  
  .ant-pagination-item{
    color: gray;
  }
  
  .ant-pagination-item-active {
    color: black;
    background: transparent;
    border: none;
  }

`

const BodyContent = styled.div`
  font-size: 0.7rem;
  
  max-width: 100%;
  
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const GreenCircle = styled.div`
  border-radius: 50%;
  border: black solid 0.5px;
  background-color: lawngreen;

  height: 2.5vh;
  width: 2.5vh;
`

const YellowCircle = styled.div`
  border-radius: 50%;
  border: black solid 0.5px;
  background-color: yellow;

  height: 2.5vh;
  width: 2.5vh;
`

const RedCircle = styled.div`
  border-radius: 50%;
  border: black solid 0.5px;
  background-color: red;

  height: 2.5vh;
  width: 2.5vh;
`