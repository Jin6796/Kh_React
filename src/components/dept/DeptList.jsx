import React, { useEffect, useState } from "react"
import { Button, Form, Modal, Table } from "react-bootstrap"
import DeptRow from "./DeptRow"
import HackerFooter from "../page/HackerFooter"
import HackerHeader from "../page/HackerHeader"
import { jsonDeptList } from "../service/dbLogic"

// 직접 구조분해 할당 해버리기~~
const DeptList = ({ authLogic, pictureUpload }) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [file, setFile] = useState({ fileName: null, fileURL: null })
  const userId = window.localStorage.getItem("userId")
  console.log("DeptList userId: " + userId)

  const [deptList, setDeptList] = useState([])
  const onLogout = () => {
    console.log("onLogout 호출 성공")
    authLogic.logout()
  }
  // html 렌더링 된 후 호출!
  useEffect(() => {
    console.log("useEffect 호출")
    const oracleDB = async () => {
      console.log("oracleDB 호출")
      const result = await jsonDeptList({
        DEPTNO: 30,
        DNAME: "댄스부",
        LOC: "경기",
      })
      console.log(result)
      console.log(result.data)
      console.log(result.data[1].LOC)
      setDeptList(result.data)
    }
    oracleDB()
  }, [userId])
  const imgChange = async (event) => {
    console.log("imgChange 호출")
    console.log(event.target.files[0])
    const upload = await pictureUpload.upload(event.target.files[0])
    setFile({
      fileName: upload.public_id + "." + upload.format,
      fileURL: upload.url,
    })
    const uploadIMG = document.getElementById("img") //input의 이미지 객체 얻어오기
    const holder = document.getElementById("uploadImg") //이미지를 집어넣을 곳의 부모태그
    const file = uploadIMG.files[0]
    const reader = new FileReader()
    reader.onload = function (event) {
      const img = new Image()
      img.src = event.target.result
      // if (img.width > 150) {
      //   //넣으려는 사진 크기에 맞춰 width값을 제한
      // }
      img.width = 150
      holder.innerHTML = ""
      holder.appendChild(img)
    }
    reader.readAsDataURL(file)
    return false
  }
  const deptInsert = () => {
    document.querySelector("#filename").value = file.fileName
    document.querySelector("#fileurl").value = file.fileURL
    document.querySelector("#f_dept").action =
      "http://localhost:9000/dept/deptInsert"
    document.querySelector("#f_dept").submit()
  }
  return (
    <>
      <HackerHeader userId={userId} onLogout={onLogout} />
      <div className="container">
        <div className="page-header">
          <h2>
            부서관리 <i className="fa-solid fa-angles-right"></i>&nbsp;
            <small>부서목록</small>
          </h2>
          <hr />
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
            {deptList.map((dept, i) => (
              <DeptRow key={i} dept={dept} />
            ))}
          </tbody>
        </Table>
        <hr />
        <div className="deptlist-footer">
          <Button variant="warning">전체조회</Button>&nbsp;
          <Button variant="success" onClick={handleShow}>
            부서등록
          </Button>
        </div>
      </div>

      {/* ============================== [[ 부서등록 모달 시작 ]] ============================== */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>부서 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="f_dept" method="get">
            <input type="hidden" name="filename" id="filename" />
            <input type="hidden" name="fileurl" id="fileurl" />

            {/* 부서 입력 폼 */}
            <Form.Group className="mb-3" controlId="formBasicDeptno">
              <Form.Label>부서번호</Form.Label>
              <Form.Control
                type="text"
                name="deptno"
                placeholder="Enter 부서번호"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDname">
              <Form.Label>부서명</Form.Label>
              <Form.Control
                type="text"
                name="dname"
                placeholder="Enter 부서명"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>지역</Form.Label>
              <Form.Control type="text" name="loc" placeholder="Enter 지역" />
            </Form.Group>

            {/* 부서 이미지 등록 첨부파일 */}
            <Form.Group className="mb-3">
              <input
                className="form-control"
                type="file"
                id="img"
                name="img"
                onChange={imgChange}
              />
            </Form.Group>

            {/* 부서 등록 이미지 미리보기 */}
            <div id="uploadImg">
              <img
                className="thumbNail"
                src="https://via.placeholder.com/200"
                alt="미리보기"
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={deptInsert}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ============================== [[ 부서등록 모달 종료 ]] ============================== */}
      <HackerFooter />
    </>
  )
}

export default DeptList
