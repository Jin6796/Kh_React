import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import HackerFooter from "../page/HackerFooter"
import HackerHeader from "../page/HackerHeader"
import VideoDetail from "./VideoDetail"
import VideoList from "./VideoList"

const YoutubeList = ({ authLogic }) => {
  const navigate = useNavigate()
  // useState(""), useState(null), useState([]), useState({})
  const [videos, setVideos] = useState([])
  const [keyword,setKeyword] = useState()
  // 상세화면 추가 작성 건
  const [selectedVideo, setSelectedVideo] = useState(null);
  // 비디오를 선택하면 호출할 함수 구현
  const videoSelect = (video) => {
    console.log(video);
    setSelectedVideo(video);
  }
  const onLogout = () => {
    console.log("onLogout 호출 성공")
    authLogic.logout()
  }
  useEffect(() => {
    authLogic.onAuthChange((user) => {
      if (!user) {
        navigate("/")
      }
    })
  }, []) // 처음에 한 번만 처리되게 하려면 의존성 배열을 넣어주자
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&key=AIzaSyA-mwx857fMztPfaoSHuJ2iq-tsnlGyYvQ`
      )
      .then((result) => {
        setVideos(result.data.items)
      })
  }, [])
  // 검색 버튼 클릭 시 
  const youtubeSearch = (event) => {
    axios
    .get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=AIzaSyA-mwx857fMztPfaoSHuJ2iq-tsnlGyYvQ&type=video`
    )
    .then((result) => result.data)
    .then((data) => (
      data.items.map((item) => ({...item, id: item.id.videoId})) // 얕은 복사 - spread 연산자
    ))
    .then((items) => {
      console.log(items);
      setVideos(items);
      setSelectedVideo(null);
    })
    .catch((error) =>
    console.log("error", error))
  }
  // 타이핑 시
  const onChangeInput = (event) => {
    console.log("타이핑 할 때마다!! : " + event.target.value);
    setKeyword(event.target.value);
  }
  return (
    <>
      <HackerHeader onLogout={onLogout} />
      <div className="container">
        <div className="page-header">
          <h2>
            Youtube <i className="fa-solid fa-angles-right"></i>&nbsp;
            <small>영상목록</small>
          </h2>
          <hr />
        </div>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="검색어를 입력하세요."
            aria-label="검색"
            name="keyword"
            aria-describedby="basic-addon1"
            onChange={onChangeInput}
            onKeyPress={youtubeSearch}
          />
          <Button className="btn btn-danger" id="basic-addon1" onClick={youtubeSearch}>검색</Button>
        </InputGroup>
        { selectedVideo && (
          <div>
            <VideoDetail videos={selectedVideo}  />
          </div>
        )}
        <VideoList videos={videos} videoSelect={videoSelect} />
      </div>
      <HackerFooter />
    </>
  )
}

export default YoutubeList
