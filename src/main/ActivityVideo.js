import { Box, Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // React Router의 Link 컴포넌트를 import
import AddIcon from "@mui/icons-material/Add";
import instance from "../api/instance";
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';


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
                <CardMedia
                  component="iframe"
                  height="140"
                  src={`https://www.youtube.com/embed/${video.content}`}
                  title={video.title}
                />
                <CardContent>
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
