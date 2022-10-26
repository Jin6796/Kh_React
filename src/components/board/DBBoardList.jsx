import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { jsonBoardList } from '../service/dbLogic';
import DBBoardRow from './DBBoardRow';
import HackerFooter from "../page/HackerFooter"
import HackerHeader from "../page/HackerHeader"

const DBBoardList = (props) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [boards, setBoards] = useState([])
  const userId = window.localStorage.getItem("userId");
  useEffect(() => {
    console.log("useEffect 호출")
    const boardsDB = async () => {
      console.log("oracleDB 호출")
      const result = await jsonBoardList({bm_no: 1})
      console.log(result.data);
      if (result.data) {
        setBoards(result.data)
        return;
      }
      // // 초기화 용도로 사용
      // return () => {
      //   console.log("이전 정보를 깨끗이 비워주기!");
      // }
    } 
    boardsDB();
  }, []); // 빈 깡통이라도 넣어주어야 함.
  const boardSearch = () => {

  }
  const boardInsert = (event) => {
    event.preventDefault();
    document.querySelector("#f_board").action = process.env.REACT_APP_SPRING_IP+"board/rboardInsert";
    document.getElementById("f_board").submit();
    // document.querySelector("#f_board").submit()
  }
  return (
    <>
      <HackerHeader />
      <div className="container">
        <div className="page-header">
          <h2>
            계층형 게시판 <i className="fa-solid fa-angles-right"></i>&nbsp;
            <small>글목록</small>
          </h2>
          <hr />
        </div>

        <div className="row">
          <div className="col-2">
            <select id="gubun" className="form-select" aria-label="분류선택">
              <option defaultValue>분류선택</option>
              <option value="b_title">제목</option>
              <option value="b_writer">작성자</option>
              <option value="b_content">내용</option>
            </select>
          </div>
          <div className="col-7">
            <input id="keyword" type="text" className="form-control" placeholder="검색어를 입력하세요." />
          </div>
          <div className="col-3">
            <Button id="btn_search" variant="danger" onClick={boardSearch}>검색</Button>
          </div>
        </div>
        <hr />
        <div className="dept-list">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>제목</th>
                <th>작성자</th>
                <th>첨부파일</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {boards && Object.keys(boards).map((key) => (
                <DBBoardRow key={key} board={boards[key]} />
              ))}
            </tbody>
          </Table>
        </div>
        <hr />
        <div className="deptlist-footer">
          <Button variant="warning">전체조회</Button>&nbsp;
          <Button variant="success" onClick={handleShow}>
            글쓰기
          </Button>
        </div>
      </div>
      {/* ============================== [[ 게시글 등록 모달 시작 ]] ============================== */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>게시글 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="f_board" method="post" encType="multipart/form-data">
            <input type="hidden" name="filename" id="filename" />
            <input type="hidden" name="fileurl" id="fileurl" />

            {/* 부서 입력 폼 */}
            <Form.Group className="mb-3" controlId="formBasicDeptno">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                name="b_title"
                placeholder="제목"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDname">
              <Form.Label>작성자</Form.Label>
              <Form.Control
                type="text"
                name="b_writer"
                placeholder="작성자"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="text" name="b_pw" placeholder="비밀번호" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>내용</Form.Label>
              <Form.Control as="textarea" name="b_content" placeholder="내용을 작성해주세요." rows="3" style={{ height: '100px' }} />
            </Form.Group>

            {/* 부서 이미지 등록 첨부파일 */}
            <Form.Group className="mb-3">
              <input
                className="form-control"
                type="file"
                id="bs_file"
                name="bs_file"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={boardInsert}>
            저장
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ============================== [[ 게시글 등록 모달 종료 ]] ============================== */}
      <HackerFooter />
    </>
  );
}

export default DBBoardList;