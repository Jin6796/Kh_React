import React, { useState } from 'react';
import { initializeApp } from "http://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, set } from "firebase/database";
import HackerFooter from "../page/HackerFooter";
import HackerHeader from "../page/HackerHeader";
import NoticeRow from "./NoticeRow";
import { Button, Form, Modal, Table } from 'react-bootstrap';
import "./notice.css";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FS_APIKEY,
  authDomain: process.env.REACT_APP_FS_AUTHDOMAIN,
  // databaseURL: "https://kh-terrgym-default-rtdb.asia-southeast1.firebasedatabase.app",
  databaseURL: "https://kh-terrgym-default-rtdb.firebaseio.com/",
  projectId: process.env.REACT_APP_FS_PROJECTID,
  storageBucket: process.env.REACT_APP_FS_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FS_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FS_APPID,
  measurementId: process.env.REACT_APP_FS_MEASUREMENTID
}
initializeApp(firebaseConfig);
const database = getDatabase();

const NoticeList = (props) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [notice, setNotice] = useState({
    n_no: 0,
    n_title: "",
    n_writer: "",
    n_content: "",
    n_date: ""
  });
  // useState(""), useState({}) > Object.keys()  // useState([]) > map처리 가능
  const [notices, setNotices] = useState({
    "1": {n_no: 1, n_title: "공지1", n_writer: "관리자1", n_date:"2022-10-20"},
    "2": {n_no: 2, n_title: "공지2", n_writer: "관리자2", n_date:"2022-10-21"},
    "3": {n_no: 3, n_title: "공지3", n_writer: "관리자3", n_date:"2022-10-22"},
  })
  const reactSearch = () => {

  } /////////// end of reactSearch
  const noticeInsert = (event) => {
    // submit 사용 시 페이지 새로고침 처리 방어코드 삽입 - 주의!!!!!!
    event.preventDefault(); // 이벤트 버블링 방어코드 삽입할 것 
    set(ref(database, 'notice/' + notice.n_no), notice);

    console.log(notice);
    handleClose();
  } /////////// end of noticeInsert
  const handleChangeForm = (event) => {
    if(event.currentTarget == null) return;
    // console.log('폼 내용 변경 발생, name: ' + event.target.name);
    // console.log('폼 내용 변경 발생, value: ' + event.target.value); // 입력받은 값
    setNotice({ 
      ...notice,  // 처음 초기화된 정보에 얕은 복사 처리
      n_no: Date.now(),
      [event.target.name]: event.target.value
    })
  }
  return (
    <>
      <HackerHeader />
        <div className="container">
          {/* 조회목록 출력 (firebase) 연동 필요 */}
          <div className="page-header">
            <h2>
              공지사항 <i className="fa-solid fa-angles-right"></i>&nbsp;
              <small>글 목록</small>
            </h2>
            <hr />
          </div>
          <div className="row">
            <div className="col-2">
              <select id="gubun" className="form-select" aria-label="분류선택">
                <option defaultValue>분류선택</option>
                <option value="n_title">제목</option>
                <option value="n_writer">작성자</option>
                <option value="n_content">내용</option>
              </select>
            </div>
            <div className="col-7">
              <input id="keyword" type="text" className="form-control" placeholder="검색어를 입력하세요." />
            </div>
            <div className="col-3">
              <Button id="btn_search" variant="danger" onClick={reactSearch}>검색</Button>
            </div>
          </div>
          <div className="notice-list">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {notices && Object.keys(notices).map(key => (
                <NoticeRow key={key} notice={notices[key]} />
              ))}
            </tbody>
          </Table>
        </div>
        <hr />
        <div className="noticelist-footer">
          <Button variant="warning">전체조회</Button>&nbsp;
          <Button variant="success" onClick={handleShow}>게시글 작성</Button>
        </div>
      </div>
      {/* ============================== [[ 부서등록 모달 시작 ]] ============================== */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>공지 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="f_dept" method="get">
            {/* 부서 입력 폼 */}
            <Form.Group className="mb-3" controlId="formBasicDeptno">
              <Form.Label>제목</Form.Label>
              <Form.Control type="text" name="n_title" placeholder="제목을 입력하세요."
                            onChange={handleChangeForm} />              
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDname">
              <Form.Label>작성자</Form.Label>
              <Form.Control type="text" name="n_writer" placeholder="Enter 작성자"
                            onChange={handleChangeForm} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDname">
              <Form.Label>작성 시간</Form.Label>
              <Form.Control type="text" name="n_writer" placeholder="Enter 작성 시간" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>내용</Form.Label>
              <Form.Control as="textarea" name="n_content" placeholder="내용을 입력하세요." style={{ height: '100px' }}
                            onChange={handleChangeForm} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={noticeInsert}>
            등록
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ============================== [[ 부서등록 모달 종료 ]] ============================== */}
      <HackerFooter />
    </>
  );
}

export default NoticeList;
