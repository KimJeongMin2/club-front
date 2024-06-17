import { Typography, Card, CardContent } from "@mui/material";
import React from 'react';

const VideoCard = ({ video, onVideoClick }) => {
  const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/; 
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };

  const videoId = extractVideoId(video.content);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`;

  return (
    <Card> {/* key 속성 제거 */}
      <iframe
        className="player"
        width="100%"
        height="140px"
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={`youtube-video-${video.id}`}
      ></iframe>
      <CardContent onClick={() => onVideoClick(video)}>
        <Typography gutterBottom variant="h6" component="div">
          {video.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
