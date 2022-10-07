import React from 'react';

const HackerNewsReple = (props) => {
  const [newsList, setNewsList] = React.useState([]);
  const requestOptions = {
  method: 'GET',
  redirect: 'follow'
  };
  React.useEffect(()=>{
    fetch("https://api.hnpwa.com/v0/news/1.json", requestOptions)
    .then(response => response.json())
    .then(result => {console.log(result); setNewsList(result)})
    .catch(error => console.log('error', error));
},[]);
  return (
    <>
      <div className="cardRow">
        <div className="cardContent">
          <div className="title">{news.title}</div>
          <div className="count">댓글: {news.comments_count}개</div>
        </div>
        <div className="etc">
          🙍🏻 {news.user} | 조회수: {news.points} | 🖍 {news.time_ago} 
        </div>
      </div>
    </>
  );
}

export default HackerNewsReple;