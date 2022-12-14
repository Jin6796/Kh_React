import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginGoogle } from './service/authLogic';
import { useSelector } from "react-redux";

const LoginPage = ({authLogic}) => {
  const auth = useSelector((state) => state.auth)
  const googleProvider = useSelector((state) => state.googleProvider)
  console.log(auth + ", " + googleProvider);
  const navigate = useNavigate();
  const moveHacker = (userId) => {
    window.localStorage.setItem("userId", userId);
    navigate({pathname: '/hackernews/' + userId});
  }
  const loginG = async() => {
    try {
      const result = await loginGoogle(auth, googleProvider);
      console.log(result.uid);
      window.localStorage.setItem("userId", result.uid);
      moveHacker(result.uid);
    } catch (error) {
      console.log(error);
    }
  }
  const handleLogin = (event) => {
    // 로그인 성공 후 넘어온 정보 확인하기
    authLogic.login("Google").then(data => moveHacker(data.user.uid));
  }
  return (
    <>
      <h2>로그인 페이지</h2>
      <button onClick={loginG}>Google</button>
    </>
  );
}

export default LoginPage;