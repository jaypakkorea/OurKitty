import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styled from "styled-components";
import { Dish } from 'Store/Type/DishType';
import { useDispatch } from 'react-redux';
import { fetchDish } from 'Store/dish-actions';

const MapListDishTable = (props: any) => {
  const { dishes, handleBtnClick } = props;

  const dispatch = useDispatch();

  const columns: ColumnsType<Dish> = [
    {
      title: '이름',
      dataIndex: 'dishName',
      key: 'dishName',
      align: "center",
      width: "2rem",
      render: (_, { dishName }) => (
        <>
          {
            <BodyContent>{dishName}</BodyContent>
          }
        </>
      ),
    },
    {
      title: '주소지',
      dataIndex: 'loadAddress',
      key: 'loadAddress',
      align: "center",
      width: "100%",
      render: (_, { loadAddress }) => (
        <>
          {
            <BodyContent>{loadAddress}</BodyContent>
          }
        </>
      ),
    },
    {
      title: '등록상태',
      dataIndex: 'dishState',
      key: 'dishState',
      align: "center",
      width: "1.5rem",
      render: (_, el) => {
        return (
          <>
            {
              el.dishState === 0 ? (<RedCircle>미완료</RedCircle>)
                : (<GreenCircle>완료</GreenCircle>)
            }
          </>
        )
      },
    },
  ];

  const handleRowSelected = (record: any, rowIndex: any) => {
    return {
      onClick: (event: any) => {
        //@ts-ignore
        dispatch(fetchDish({ ...record, click: false }));

        if (record.dishState === 0) {
          handleBtnClick(record);
          return;
        }
      }, // click row
    };
  }

  return (
    <CustomTable>
      <Table
        columns={columns}
        dataSource={dishes && dishes.map((dish: any, index: any) => ({ ...dish, key: index + 1 }))}
        pagination={{ position: ["bottomCenter"], pageSize: 5 }}
        onRow={handleRowSelected}
      />
    </CustomTable>
  )
};

export default MapListDishTable;

const CustomTable = styled.div`
  
  width: 100%;

  .ant-table-filter-trigger-container {
    background: #fff;
  }

  .ant-table-cell {
    font-size: 0.8rem;

    background-color: transparent !important;
    font-family: "BMJUA" !important;
    
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
    
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  .ant-table-row:hover {
    cursor: pointer;
  }
  
  .ant-table-row:nth-child(2n + 1) {
    background-color: lightgray !important;
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
  border-radius: 1rem;
  border: lawngreen solid 0.5px;
  background-color: white;
`

const RedCircle = styled.div`
  border-radius: 1rem;
  border: red solid 0.5px;
  background-color: white;
`