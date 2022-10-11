import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import HackerFooter from './HackerFooter';
import HackerHeader from './HackerHeader';
import { jsonDeptList } from './service/dbLogic';
// 직접 구조분해 할당 해버리기~~
const DeptList = ({ authLogic }) => {
  const {userId} = useParams();
  // console.log(userId);
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
  },[])
  return (
    <>
      <HackerHeader userId={userId} onLogout={onLogout} />
      <h2>부서 목록</h2>
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
      <HackerFooter />
    </>
  );
}

export default DeptList;