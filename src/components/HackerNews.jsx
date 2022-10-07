import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HackerFooter from './HackerFooter';
import HackerHeader from './HackerHeader';
import HackerNewsRow from './HackerNewsRow';

const HackerNews = ({authLogic}) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  console.log('구글 인증 아이디: ' + userId);

  const [newsList, setNewsList] = React.useState([]);
  const onLogout = () => {
    console.log("onLogout 호출 성공");
    authLogic.logout();
  }
  const requestOptions = {
  method: 'GET',
  redirect: 'follow'
  };
  useEffect(() => {
    authLogic.onAuthChange((user)=> {
      if(!user) {
        navigate("/")
      }
    })
  })
  // 없으면? sideEffect: 모든 변화에 반응한다.
  // [] 있는데 파라미터가 없으면 처음 한 번만 반응!
  // [keyword] 키워드가 변경될 때마다 재귀 호출이 일어남
  useEffect(()=>{
      fetch("https://api.hnpwa.com/v0/news/1.json", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result); setNewsList(result)})
      .catch(error => console.log('error', error));
  },[]);
  return (
    <>
      <HackerHeader userId={userId} onLogout={onLogout} />
        <div>
          {newsList.map(news => (
            <HackerNewsRow key={news.id} news={news}/>
          ))}
        </div>
      <HackerFooter />
    </>
  );
}

export default HackerNews;