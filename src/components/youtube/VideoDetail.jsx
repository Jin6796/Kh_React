import React from 'react';
import { PreDescription } from '../styles/YoutubeStyle';

const VideoDetail = ({video}) => {
  return (
    <>
      <section>
        <iframe
          type="text/html"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${video.id}`}
          frameborder="0"
          allowfullscreen="allowfullscreen">
        </iframe>
        <h2>{video.snippet.title}</h2>
        <h3>{video.snippet.channelTitle}</h3>
        <PreDescription>{video.snippet.description}</PreDescription>
      </section>
    </>
  );
}

export default VideoDetail;