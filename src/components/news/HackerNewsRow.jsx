import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NewsLi = styled.li`
                        list-style: none;
                        margin: 1rem;
                        `;
const CardRow = styled.div`
                          background-color: white;
                          border: 1px solid lightgray;
                          border-radius: 1rem;
                          padding: 1rem;
                          `;
const CardContent = styled.div`
                              display: flex;
                              justify-content: space-between;
                              `;
const Title = styled.div`
                        font-size: 20px;
                        cursor: pointer;
                        `;
const Count = styled.div`
                        background: lightblue;
                        width: 100px;
                        height: 30px;
                        text-align: center;
                        border-radius: 1rem;
                        `;
const Etc = styled.div`
                      display: flex;
                      flex-direction: row;
                      height: 30px;
                      padding-left: 10px;
                      padding-top: 0.5rem;
                      `;

const HackerNewsRow = (props) => {
  // 구조분해 할당
  const { news, pictureUpload } = props;
  // 업로드되는 이미지에 대한 정보를 담기
  const [file, setFile] = useState({fileName: null, fileURL:null});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // async 비동기처리위한 선언 -  await 선언하면 업로드 될 때까지 기다렸다가 처리함
  // 스프링 서버와의 연계 시에도 비동기처리 코드가 추가되어야 함 - 크로스 서비스
  const imgChange = async (event) => {
    console.log("imgChange호출")
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
      img.src = event.target.result;
      // if (img.width > 150) {
        // }
      //넣으려는 사진 크기에 맞춰 width값을 제한하면 된다.
      img.width = 200;
      holder.innerHTML = "";
      holder.appendChild(img)
    }
    reader.readAsDataURL(file)
    return false;
  }

  return (
    <>
      {/* {file.fileName+", "+file.fileURL} */}
      <NewsLi key = {news.id}>
        <CardRow>
          <CardContent>
            <Title>
              <Link to={"/newsreple/"+news.id} className="nav-link">{news.title}</Link>
            </Title>
            <Count>댓글: {news.comments_count}개</Count>
          </CardContent>
          <Etc>
            {/* <i className="fas fa-user mr-1"></i>🙍🏻‍♂️{news.user} |  */}
            🙍🏻‍♂️{news.user} | 
            ❤{news.points} | 
            ⏰{news.time_ago} &nbsp;
            <Button variant="primary" onClick={handleShow}>
              **
            </Button>
          </Etc>
        </CardRow>
      </NewsLi>
{/*=========================[[[[[사진 업로드 테스트 모달]]]]]=========================*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="f_img" method="get">
            <Form.Group className="mb-3">
              <input
                className="form-control"
                type="file"
                id="img"
                name="img"
                onChange={imgChange}
              />
            </Form.Group>
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
            Close
          </Button>
        </Modal.Footer>
      </Modal>
{/*=========================[[[[[사진 업로드 테스트 모달]]]]]=========================*/}
    </>
  );
}

export default HackerNewsRow;