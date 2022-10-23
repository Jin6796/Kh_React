import React, { useEffect } from 'react';
import styled from 'styled-components';

const ToastDIV = styled.div`
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 17px;
`;

const MyToast = (props) => {
  useEffect(() => {
    if(true) {
      let snackbar = document.getElementById("snackbar");
      snackbar.className = "show";
      setTimeout(function(){ snackbar.className=snackbar.className.replace("show", ""); }, 3000);
      setTimeout(() => {

      }, 2500)
    }
  })
  return (
    <>
      <ToastDIV id = "snackbar">토스트메세지 출력</ToastDIV>
    </>
  );
}

export default MyToast;