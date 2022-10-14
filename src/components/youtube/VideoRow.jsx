import React from "react"
import { VR_channel, VR_contentdiv, VR_img, VR_li, VR_title,  VR_videodiv } from "../styles/YoutubeStyle"

function VideoRow({ video, videoSelect }) {
  return (
    <>
      <VR_li onClick={()=> videoSelect(video, videoSelect)}>
        <VR_videodiv>
          <VR_img src={video.snippet.thumbnails.medium.url} alt="video thumbnail" />
          <VR_contentdiv>
            <VR_title>{video.snippet.title}</VR_title>
            <VR_channel>{video.snippet.channelTitle}</VR_channel>
          </VR_contentdiv>
        </VR_videodiv>
      </VR_li>
    </>
  )
}

export default VideoRow
