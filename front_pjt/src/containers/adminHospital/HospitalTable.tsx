import { useState } from 'react';
import styled from 'styled-components';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Hospital } from 'Store/Type/hospitalType';
import HospitalDetailModal from './HospitalDetailModal';


const columns: ColumnsType<Hospital> = [
  {
    title: '병원명',
    dataIndex: 'name',
    key: 'name',
    align: "center",
  },
  {
    title: '연계병원',
    key: 'state',
    dataIndex: 'state',
    align: "center",
    render: (state: boolean) => {
      return (
        <>{
          state === false ? (<YellowCircle>비연계</YellowCircle>)
            : (<GreenCircle>연계</GreenCircle>)
        }</>

      )
    }
  },
  {
    title: '주소',
    key: 'address',
    dataIndex: 'address',
    align: "center",
  },
  {
    title: '전화번호',
    dataIndex: 'phone',
    key: 'phone',
    align: "center",
  },
];

function HospitalDetailTable(props: any) {
  const { hospitals } = props;
  const [modalState, setModalState] = useState(false);
  const [selectHospital, setSelectHospital] = useState<Hospital>();

  const modalOpen = () => {
    setModalState(true);
  }

  const modalOff = () => {
    setModalState(false);
  }


  return (
    <Container>
      <CustomTable>
        <Table scroll={{ x: 'max-content' }}
          dataSource={hospitals}
          columns={columns}
          pagination={{ pageSize: 10 }}
          onRow={(record) => ({
            onClick: () => {
              setSelectHospital(record);
              modalOpen();
            },
          })}
          rowKey={(render) => render.hospitalId}
        />
      </CustomTable>
      <HospitalDetailModal hospital={selectHospital} modalOpen={modalState} handleModalOff={modalOff}></HospitalDetailModal>
    </Container>
  );
};

export default HospitalDetailTable

const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: auto;
    max-width: 23.5rem;
    padding-bottom: 80px;
    padding: 0 24px; 
`;


const CustomTable = styled.div`

    width: 100%;


  .ant-table-filter-trigger-container {
    background: #fff;
  }

  .ant-table-cell {
    font-size: 0.8rem;

    background-color: transparent !important;
    font-family: "BMYEONSUNG",serif !important;

    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
    
  }

  .ant-table-row:hover {
    cursor: pointer;
  }

  .ant-table-row:nth-child(2n) {
    background-color: lightgray !important;
  }

  .ant-table {
    background: transparent;
  }

  .ant-pagination-item {
    color: gray;
  }

  .ant-table-pagination-right {
    justify-content: center;
  }


  .ant-pagination-item-active {
    color: black;
    background: transparent;
    border: none;
  }
`;

const GreenCircle = styled.div`
  border-radius: 1rem;
  border: lawngreen solid 0.5px;
  background-color: white;
  text-align: center;
`

const YellowCircle = styled.div`
  border-radius: 1rem;
  border: yellow solid 0.5px;
  background-color: white;
  text-align: center;
`