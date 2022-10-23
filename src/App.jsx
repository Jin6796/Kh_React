import { Route, Routes } from "react-router-dom"
import LoginPage from "./components/LoginPage"
import HackerNews from "./components/news/HackerNews"
import HackerNewsReple from "./components/news/HackerNewsReple"
import "bootstrap/dist/css/bootstrap.min.css"
import DeptList from "./components/dept/DeptList"
import "./css/dept.css"
import DeptDetail from "./components/dept/DeptDetail"
import YoutubeList from "./components/youtube/YoutubeList"
import NoticeList from "./components/notice/NoticeList"
import NoticeDetail from "./components/notice/NoticeDetail"
import { useEffect, useState } from "react"
import axios from "axios"

const App = ({ authLogic, pictureUpload }) => {
  // 페이징 처리 추가
  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 바라보고 있는 페이지
  const [newsPerPage, setNewsPerPage] = useState(5); // 한 페이지에 출력될 목록 갯수: 5개
  const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json"
  useEffect(() => {
    axios.get(NEWS_URL).then((response) => {
      setNewsList(response.data)
    })
  },[])
  const indexOfLast = currentPage * newsPerPage;
  const indexOfFirst = indexOfLast - newsPerPage;
  const currentNews = (news) => {
    let currentNews = 0;
    currentNews = news.slice(indexOfFirst, indexOfLast)
    return currentNews;
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          exact={true}
          element={<LoginPage authLogic={authLogic} />}
        />
        <Route
          path="/notice"
          exact={true}
          element={<NoticeList />}
        />
        <Route
          path="/youtube"
          exact={true}
          element={<YoutubeList authLogic={authLogic} />}
        />{" "}
        <Route
          path="/dept"
          exact={true}
          element={
            <DeptList authLogic={authLogic} pictureUpload={pictureUpload} />
          }
        />
        <Route
          path="/deptdetail/:deptno"
          exact={true}
          element={<DeptDetail />}
        />
        <Route 
          path="/noticedetail/:n_no" 
          exact={true}
          element={<NoticeDetail />}
        />
        <Route
          path="/hackernews/:userId"
          exact={true}
          element={
            <HackerNews newsList={currentNews(newsList)} newsPerPage={newsPerPage} totalNews={newsList.length}
                        paginate={setCurrentPage} authLogic={authLogic} pictureUpload={pictureUpload} />
          }
        />
        <Route
          path="/newsreple/:id"
          exact={true}
          element={<HackerNewsReple />}
        />
      </Routes>
    </>
  )
}

export default App
