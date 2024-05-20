import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Rating,
    Stack,
    Typography,
  } from "@mui/material";

  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import DeleteIcon from '@mui/icons-material/Delete';
  import instance from "../../api/instance";

  export default function VideoList({ videoData }) {
    console.log("videoData", videoData.postId);
    const navigate = useNavigate();

    const handleVideoDetail = () => {
      navigate(`/VideoDetail/${videoData?.postId}`, {state:{ videoData}});
    };

    const sendDeleteVideo = (videoId) => {
      if (window.confirm("삭제하시겠습니까?")) {
          instance
              .delete(`/posts/video/${videoId}`, {
                  withCredentials: true,
              })
              .then((response) => {
                  console.log(response);
                  window.location.reload();
              })
              .catch((error) => {
                  console.log(error);
              });
      } else {
          alert("취소합니다.");
      }
  };
  
    return (
      <Box sx={{ flexDirection: "row", width: "900px", borderRadius: 3, mt: 5 }}>
      <Grid container direction="column">
        <Card
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
          }}
          onClick={handleVideoDetail}
        >
          <Grid item xs={12}>
            <CardContent>
              <Stack
                direction={"row"}
                alignItems={"flex-end"}
                spacing={2}
                flexWrap={"wrap"}
              >
                <Typography
                  variant="h5"
                  sx={{ textAlign: "left" }}
                  fontWeight={"bold"}
                >
                  {videoData?.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "left" }}
                  fontWeight={"bold"}
                >
                  {videoData?.content}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "left" }}
                  fontWeight={"bold"}
                >
                 글쓴이 {videoData?.member?.name}
                </Typography>
              </Stack>
              <DeleteIcon   onClick={(e) => {
                  e.stopPropagation(); 
                  sendDeleteVideo(videoData?.postId);
                }}/>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Box>
    );
  }
  