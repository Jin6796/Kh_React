import React from 'react';
import HackerFooter from './HackerFooter';
import HackerHeader from './HackerHeader';
import styled from 'styled-components';

const NewsLi = styled.li`
                        list-style: none;
                        margin: 1rem;
                        `;
const HackerNews = (props) => {
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
      <HackerHeader />
        <div>
          {newsList.map(news => (
            <NewsLi key = {news.id} />
          ))}
        </div>
      <HackerFooter />
    </>
  );
}

export default HackerNews;