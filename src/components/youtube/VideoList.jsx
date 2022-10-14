import React from "react"
import { VR_ul } from "../styles/YoutubeStyle"
import VideoRow from "./VideoRow"

const VideoList = (props) => {
  const { videos, videoSelect } = props
  return (
    <>
      <VR_ul>
        {videos.map((video, i) => (
          <VideoRow key={video.id} video={video} videoSelect={videoSelect} />
        ))}
      </VR_ul>
    </>
  )
}

export default VideoList
