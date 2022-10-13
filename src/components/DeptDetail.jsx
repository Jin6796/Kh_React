import React, { useEffect, useState } from "react"
import { Button, Card } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { jsonDeptList } from "./service/dbLogic"

const DeptDetail = (props) => {
  // DeptRow에서 쿼리 스트링으로 넘어온 부서번호 담기
  const { deptno } = useParams()
  // useState에서 원시형으로 호출
  const [isOk, setIsOk] = useState(false)
  // 위에서 파라미터로 받은 deptno로 조건 검색 처리를 한 뒤 담을 변수 선언
  // useState에서 함수형으로 호출(javascript에서는 객체로 취급했었음)
  // 함수형의 첫번째 파라미터가 함수이다?
  // 렌더링 될 때마다 함수 초기화를 생략하고 싶다. useCallback()
  // 한 번 초기화되면 리액트 내에서만 유지되고 싶다? >> useMemo()를 사용!
  const [deptVO, setDeptVO] = useState({
    DEPTNO: 0,
    DNAME: "",
    LOC: "",
    FILENAME: "",
    FILEURL: "",
  })
  useEffect(() => {
    // 서버를 왔다갔다 하기 때문에 비동기처리가 필요함
    const asyncDB = async () => {
      // 처리될 때까지 기다려야하기 때문에 반드시 await을 사용!
      const res = await jsonDeptList({ deptno: deptno })
      // 여기서 호출하게 되면 fetch 함수와의 차이점을 발견할 수 있다
      // JSON.stringify, JSON.parse를 사용하지 않아도 바로 json으로 받아내는 것을 볼 수 있음.
      console.log(res)
      console.log(res.data)
      console.log(res.data[0].DNAME)
      console.log(res.data[0].FILEURL)

      // 화면에 보여주려면 배열에 담아야함
      setDeptVO(res.data[0])
    }
    asyncDB()
  }, []) // 의존배열의 존재 유무는 useState의 순서에는 영향이 없음.
  return (
    <>
      <div className="container">
        <div className="page-header">
          <h2>
            부서관리 <i className="fa-solid fa-angles-right"></i>&nbsp;
            <small>부서 상세보기</small>
          </h2>
          <hr />
        </div>
        <Card style={{ width: "58rem" }}>
          <Card.Body>
            <div className="dept-detail">
              <Card.Img
                variant="top"
                style={{ width: "250px" }}
                src={`${deptVO.FILEURL}`}
              />
            </div>
            <div className="dept-header">
              <Card.Title>{deptVO.DNAME}</Card.Title>
              <Card.Text>{deptVO.LOC}</Card.Text>
              <Card.Text>{deptVO.FILENAME}</Card.Text>
            </div>
          </Card.Body>
          <div className="button">
            <Button variant="primary">삭제</Button>
            <Link to="/dept" className="nav-link">
              부서 목록
            </Link>
          </div>
        </Card>
      </div>
    </>
  )
}

export default DeptDetail
