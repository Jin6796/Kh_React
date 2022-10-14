import styled from "styled-components"

export const VR_ul = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin: 0;
`
export const VR_li = styled.li`
  width: 50%;
  padding: 0.2em;
`
export const VR_img = styled.img`
  width: 40%;
  height: 90%;
`
export const VR_videodiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex; /* 비디오가 한 줄에 출력되게 하려면 flex! */
  align-items: center;
  border: 1px solid lightgray;
  cursor: pointer;
  transition: transform 250ms easy-in;
  &:hover {
    transform: scale(1.02);
  }
`
export const VR_contentdiv = styled.div`
  margin-left: 0.7em;
`
export const VR_title = styled.p`
  margin: 10;
  font-size: 1.2rem;
`
export const VR_channel = styled.p`
  margin: 10;
  font-size: 1.2rem;
`
export const PreDescription = styled.pre`
  white-space: pre-wrap; /* 코드의 줄바꿈이 없어도 */
`