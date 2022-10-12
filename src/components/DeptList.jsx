import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import HackerFooter from './HackerFooter';
import HackerHeader from './HackerHeader';
import { jsonDeptList } from './service/dbLogic';
// 직접 구조분해 할당 해버리기~~
const DeptList = ({ authLogic }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userId = window.Storage.getItem("userId");
  console.log("DeptList userId: "+userId);

  const [deptList, setDeptList] = useState([]);
  const onLogout = () => {
    console.log("onLogout 호출 성공");
    authLogic.logout();
  }
  // html 렌더링 된 후 호출!
  useEffect(() => {
    console.log("useEffect 호출");
    const oracleDB = async() => {
      console.log("oracleDB 호출");
      const result = await jsonDeptList({ DEPTNO: 30, DNAME: "댄스부", LOC: "경기" });
      console.log(result);
      console.log(result.data);
      console.log(result.data[1].LOC);
      setDeptList(result.data);
    } 
    oracleDB();
  },[userId])
  return (
    <>
      <HackerHeader userId={userId} onLogout={onLogout} />
      <div className="container">
        <div className="page-header">
          <h2>부서관리 <i className='fa-solid fa-angles-right'></i><small> 부서목록</small></h2>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>부서번호</th>
            <th>부서명</th>
            <th>지역</th>
          </tr>
        </thead>
        <tbody>
          {deptList.map((dept, i)=>(
            <tr key={i}>
              <td>1</td>
              <td>{dept.DEPTNO}</td>
              <td>{dept.DNAME}</td>
              <td>{dept.LOC}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <hr />
      <div className="deptlist-footer">
        <Button variant="warning">전체조회</Button>
        <Button variant="success">부서등록</Button>
      </div>
      <HackerFooter />
    </>
  );
}

export default DeptList;