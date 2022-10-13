import axios from "axios"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import HackerFooter from "../HackerFooter"
import HackerHeader from "../HackerHeader"
import VideoList from "./VideoList"

const YoutubeList = ({ authLogic }) => {
  const navigate = useNavigate()
  const [videos, setVideos] = useState([])
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
        <VideoList videos={videos} />
      </div>
      <HackerFooter />
    </>
  )
}

export default YoutubeList
