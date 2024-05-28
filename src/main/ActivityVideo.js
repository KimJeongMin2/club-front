import { Box, Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import instance from "../api/instance";
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';


export default function ActivityVideo() {

  const navigate = useNavigate();

  const [activityVideos, setActivityVideos] = useState([]);

  useEffect(() => {
    
    const fetchVideos = async () => {
      try {
        const response = await instance.get(
          'posts/main-video', 
          {
            withCredentials: true,
          },
          {
            headers: {
              "Content-Type": "application/json",
            }, 
          }
        );
        setActivityVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoDetail = (videoData) => {
    console.log("videoId???" , videoData.postId)
    navigate(`/VideoDetail/${videoData.postId}`, { state: { videoData } });
  };

  return (
    <Grid container direction="column" spacing={1} sx={{ mt: "50px" }}>
      <Grid item xs={12}>
        <Grid container direction="row" alignItems="center">
          <Typography sx={{ ml: "1rem", mr: "0.5rem" }}>활동영상(최신순)</Typography>
          <AddIcon 
            style={{
              color: "#F2BED1",
              cursor: "pointer"
            }}
            onClick={() => {
              navigate("/Video");
            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          {activityVideos.map((video) => (
            <Grid item xs={12} sm={6} md={3} key={video.id}>
              <Card>
              <ReactPlayer
                  className="player"
                  url={`https://www.youtube.com/watch?v=${video.content}`}
                  controls
                  playing={false}
                  width="100%"
                  height="140px"
                />
                <CardContent onClick={() => handleVideoDetail(video)}>
                  <Typography gutterBottom variant="h6" component="div">
                    {video.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
