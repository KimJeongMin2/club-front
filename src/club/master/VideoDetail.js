import {
    Box,
    Button,
    CardContent,
    Divider,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import { useLocation, useNavigate } from "react-router-dom";
  import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
  import ButtonAppBar from "../../common/MainAppBar";
  import { useEffect, useState } from "react";
  import CategoryIcon from "@mui/icons-material/Category";
  import ReactPlayer from "react-player";
  import instance from "../../api/instance";


  export default function VideoDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const [videoData, setVideoData] = useState(null); // 비디오 상세 정보
    const [videoUrl, setVideoUrl] = useState(""); // 비디오 URL
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
    const [title, setTitle] = useState(""); // 제목
    const [content, setContent] = useState(""); // 내용
  
    useEffect(() => {
        // location.state에 비디오 정보가 있는지 확인
        if (location.state && location.state.videoData) {
          const { videoData } = location.state;
          setVideoData(videoData);
          setTitle(videoData.title);
          setContent(videoData.content);
          setVideoUrl(`https://www.youtube.com/watch?v=${videoData.content}`);
        } else {
          // 비디오 정보가 없으면 이전 페이지로 이동
          navigate("/video");
        }
      }, [location.state, navigate]);
      
  
    // 수정 완료 처리
    const handleEditVideo = async () => {
      try {
        console.log("Updating video with postId:", videoData?.postId);

        const data = {
            title: title,
            content: content
          };

        const response = await instance.put(
          `/posts/video/${videoData?.postId}`,
          data,
          {
            withCredentials: true,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
  
        );
  
        console.log("Video updated:", response.data);
        navigate("/video");
        
      } catch (error) {
        console.error("Error updating video:", error);
      }
    };
  
    return (
      <Grid container direction={"row"} spacing={0.5}>
        <Grid item xs={12}>
          <ButtonAppBar />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" onClick={() => navigate("/video")}>
             목록
            </Button>
          {isEditing ? (
            <Button variant="contained" color="primary" onClick={handleEditVideo}>
              수정 완료
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
              수정
            </Button>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 64px)",
          }}
        >
          <Box
            sx={{
              width: "80%",
            }}
          >
            <Grid container direction={"row"}>
              <Grid
                item
                xs={6}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {videoUrl && (
                  <ReactPlayer
                    className="player"
                    url={videoUrl}
                    controls
                    playing={false}
                    width="100%"
                    height="500px"
                  />
                )}
              </Grid>
              <Grid
                item
                xs={6}
                border={"1px solid lightgrey"}
                borderRadius={5}
                sx={{ mb: 2 }}
              >
                  <CardContent>
                    {isEditing ? (
                        <>
                        <TextField
                            label="제목"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            sx={{ mb: 1 }}
                        />
                        <TextField
                            label="내용"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            multiline
                            fullWidth
                            rows={4}
                            sx={{ mb: 1 }}
                        />
                        </>
                    ) : (
                        <>
                    <Typography variant="h5">{title}</Typography>
                    <Divider />
                    <Box display="flex" alignItems="center">
                        <CalendarMonthIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                        <Typography
                        variant="body1"
                        sx={{ verticalAlign: "middle", mr: 1 }}
                        >
                        등록시간: {videoData?.createdAt}
                        </Typography>
                        <CalendarMonthIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                        <Typography
                        variant="body1"
                        sx={{ verticalAlign: "middle", mr: 1 }}
                        >
                        수정시간: {videoData?.updateAt}
                        </Typography>
                        <CategoryIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                        <Typography>{videoData?.category}</Typography>
                    </Box>
                    <CardContent
                        sx={{
                        borderTop: "1px solid lightgrey",
                        height: "210px",
                        mt: 2,
                        mr: 2,
                        overflow: "auto",
                        }}
                        borderRadius={2}
                    >
                        <Typography variant="h6">{content}</Typography>
                    </CardContent>
                    </>
                )}
                </CardContent>
                
        
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
  }
  