import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initializeApp } from "http://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, onValue, remove, set } from "firebase/database";
import HackerHeader from '../page/HackerHeader';
import HackerFooter from '../page/HackerFooter';
import { Modal, Form, Card, ListGroup, Button } from 'react-bootstrap';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FS_APIKEY,
  authDomain: process.env.REACT_APP_FS_AUTHDOMAIN,
  // databaseURL: "https://kh-terrgym-default-rtdb.asia-southeast1.firebasedatabase.app",
  databaseURL: "https://project01-e2f8e-default-rtdb.firebaseio.com/",
  projectId: process.env.REACT_APP_FS_PROJECTID,
  storageBucket: process.env.REACT_APP_FS_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FS_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FS_APPID,
  measurementId: process.env.REACT_APP_FS_MEASUREMENTID
}
initializeApp(firebaseConfig);
const db = getDatabase();

// 수정 삭제
const NoticeDetail = (props) => {
  const navigate = useNavigate();
  // 해시값 가져오기
  let {n_no} = useParams();
  // 상태를 관리하는 state훅은 비동기 처리
  const [notice, setNotice] = useState({
    n_no: 0,
    n_title: "",
    n_writer: "",
    n_content: "",
  })
  // real time database 서버에서 가져오기
  useEffect(()=>{
    const starCountRef = ref(db, "notice/"+n_no);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setNotice(data);
    })
  },[])
  const noticeUpdate = (event) => {
    event.preventDefault();
    console.log("수정할 정보: " + n_no + ", " + notice.n_title + ", " + notice.n_content + ", " + notice.n_writer );
    set(ref(db, "notice/" + n_no), notice)
    handleClose();
  }
  const noticeDelete = () => {
    console.log("삭제할 게시글 번호: " + n_no);
    remove(ref(db, `notice/${n_no}`));
    navigate("/notice"); // 목록으로 페이지 이동
  }
  const noticeList = () => {
    navigate("/notice"); // NoticeList.jsx 출력
  }
  // 모달 관련 상태처리
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleChangeForm = (event) => {
    if(event.currentTarget = null) 
    return event.preventDefault();
    setNotice({
      ...notice, n_no: n_no, [event.target.name]: event.target.value
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
            <small>상세보기</small>
          </h2>
          <hr />
        </div>
      </div>
      <Card style={{ width: '58rem' }}>
        <ListGroup variant="flush">
          <ListGroup.Item>{notice.n_title}</ListGroup.Item>
          <ListGroup.Item>{notice.n_writer}</ListGroup.Item>
          <ListGroup.Item>{notice.n_content}</ListGroup.Item>
        </ListGroup>
        <div className="detail-link">
          <Button variant="primary" onClick={handleShow}>수정</Button>&nbsp;
          <Button variant="primary" onClick={noticeDelete}>삭제</Button>&nbsp;
          <Button variant="primary" onClick={noticeList}>목록</Button>
        </div>
      </Card>
      <HackerFooter />
      {/* ============================== [[ 상세보기 모달 시작 ]] ============================== */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>공지 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="f_dept" method="get">
            {/* 부서 입력 폼 */}
            <Form.Group className="mb-3" controlId="formBasicDeptno">
              <Form.Label>제목</Form.Label>
              <Form.Control type="text" name="n_title" value={notice.n_title} placeholder="제목을 입력하세요."
                            onChange={handleChangeForm} />              
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDname">
              <Form.Label>작성자</Form.Label>
              <Form.Control type="text" name="n_writer" value={notice.n_writer} placeholder="Enter 작성자"
                            onChange={handleChangeForm} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDname">
              <Form.Label>작성 시간</Form.Label>
              <Form.Control type="text" name="n_date" value={notice.n_date} placeholder="Enter 작성 시간" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>내용</Form.Label>
              <Form.Control as="textarea" name="n_content" value={notice.n_content} placeholder="내용을 입력하세요."
                            onChange={handleChangeForm}  style={{ height: '100px' }} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={noticeUpdate}>
            수정
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ============================== [[ 상세보기 모달 종료 ]] ============================== */}      
    </>
  );
}

export default NoticeDetail;