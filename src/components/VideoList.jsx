import React from "react"

const VideoList = (props) => {
  const { videos } = props
  return (
    <>
      {videos.map((video, i) => (
        <h2>{video.snippet.title}</h2>
      ))}
    </>
  )
}

export default VideoList
