import React, { useEffect, useState } from 'react';
import { jsonBoardList } from '../service/dbLogic';

const DBBoardList = (props) => {
  const [boards, setBoards] = useState([])
  const userId = window.localStorage.getItem("userId");
  useEffect(() => {
    console.log("useEffect 호출")
    const boardsDB = async () => {
      console.log("oracleDB 호출")
      const result = await jsonBoardList({
        bm_no: 1
      })
      if (result.data) {
        setBoards(result.data)
        console.log(boards);
      }
    } 
    boardsDB();
  }, [userId]); // 빈 깡통이라도 넣어주어야 함.
  return (
    <div>
      여기 반영 plz
    </div>
  );
}

export default DBBoardList;