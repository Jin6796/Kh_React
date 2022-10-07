import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NewsRepleList from './NewsRepleList';

const HackerNewsReple = (props) => {
  const { id } = useParams();
  // const [title, setitle] = useState(null);
  // const [title, setitle] = useState({}); // 객체 - Object - XXVO or Map
  // const [title, setitle] = useState([]); // 배열 - Array - 중! 요! 사 용 빈 도 가 높 음
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const CONTENT_URL =`https://api.hnpwa.com/v0/item/${id}.json`;
    axios.get(CONTENT_URL)
    .then(response => {
      const result = JSON.stringify(response.data)
      // 계층형으로 볼 수 있고 직관적이며 반복되는 내부구조 패턴의 파악이 용이하다.
      // 문자열로 치환하지 않고 출력하면 state hook의 타입을 볼 수 있다.
      console.log(response.data);
      console.log(result);
      const jsonDoc = JSON.parse(result);
      console.log(jsonDoc.title);
      setTitle(jsonDoc.title);
      setComments(jsonDoc.comments);
    });
  })
  return (
    <>
      <h2>{title}</h2>
      <div>
        {/* map은 중괄호가 아니라 소괄호로!!!!!!! */}
        {comments.map(comment => (
          <NewsRepleList key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
}

export default HackerNewsReple;