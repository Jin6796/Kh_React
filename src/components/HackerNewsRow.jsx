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
  const { news } = props
  const [file, setFile] = useState({fileName: null, fileURL:null});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const imgChange = (event) => {
      console.log("imgChange호출");
      console.log(event.target.files[0]);
  }

  return (
    <>
      <NewsLi key = {news.id}>
        <CardRow>
          <CardContent>
            <Title>
              <Link to={"/newsreple/"+news.id} className="nav-link">{news.title}</Link>
            </Title>
            <Count>댓글: {news.comments_count}개</Count>
          </CardContent>
          <Etc>
            <i className="fas fa-user mr-1"></i>{news.user} |
            <i className="fas fa-heart mr-1"></i> {news.points} | 
            <i className="far fa-clock mr-1"></i> {news.time_ago} 
          </Etc>
        </CardRow>
        <Button variant="primary" onClick={handleShow}>
          모달
        </Button>
      </NewsLi>
 {/*=========================[[[[[사진 업로드 테스트 모달]]]]]=========================*/}
 <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form id="f_img" method="get">
                <Form.Group className="mb-3">
                    <input className="form-control" type="file" onChange={imgChange} />
                </Form.Group>
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