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
  import ReactPlayer from "react-player";

  export default function VideoList({ videoData }) {

    console.log("videoData postId:", videoData.postId);
    const navigate = useNavigate();
    // const [videoLoaded, setVideoLoaded] = useState(false); // 비디오 로드 여부 상태


    // useEffect(() => {
    //   // 비디오 로드 후 상태 업데이트
    //   setVideoLoaded(true);
    // }, []);

      // 비디오 URL 상태 설정
  const [videoUrl, setVideoUrl] = useState("");
  

  useEffect(() => {
    if (videoData?.content) {
      setVideoUrl(`https://www.youtube.com/watch?v=${videoData.content}`);
    }
  }, [videoData]);

    const handleVideoDetail = (videoData) => {
      console.log("videoId???" , videoData.postId)
      navigate(`/VideoDetail/${videoData.postId}`, { state: { videoData } });
    };

    const sendDeleteVideo = (postId) => {
      if (window.confirm("삭제하시겠습니까?")) {
          instance
              .delete(`/posts/${postId}`, {
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
          onClick={() => handleVideoDetail(videoData)}
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
                <ReactPlayer
                  className="player"
                  url={videoUrl}
                  controls
                  playing={false}
                  width="100%"
                  height="500px"
                />
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
  