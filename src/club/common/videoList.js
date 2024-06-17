// import {
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   Stack,
//   Typography,
// } from "@mui/material";

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DeleteIcon from '@mui/icons-material/Delete';
// import instance from "../../api/instance";
// import ReactPlayer from "react-player";

//   export default function VideoList({ videoData }) {

//     console.log("videoData postId:", videoData.postId);

//     const navigate = useNavigate();
//     const [duration, setDuration] = useState(null);
//     const [videoUrl, setVideoUrl] = useState("");


//     useEffect(() => {
//       if (videoData?.content) {
//         setVideoUrl(`https://www.youtube.com/watch?v=${videoData.content}`);
//       }
//     }, [videoData]);

//     const handleVideoDetail = (videoData) => {
//       console.log("videoId???" , videoData.postId)
//       navigate(`/VideoDetail/${videoData.postId}`, { state: { videoData } });
//     };

//     const sendDeleteVideo = (postId) => {
//       if (window.confirm("삭제하시겠습니까?")) {
//           instance
//               .delete(`/posts/${postId}`, {
//                   withCredentials: true,
//               })
//               .then((response) => {
//                   console.log(response);
//                   window.location.reload();
//               })
//               .catch((error) => {
//                   console.log(error);
//               });
//       } else {
//           alert("취소합니다.");
//       }
//   };

//   const handleReady = (player) => {
//     const duration = player.getDuration();
//     setDuration(duration);
//     console.log('Video Duration:', duration);
//   };


//     return (
//       <Box sx={{ flexDirection: "row", width: "900px", borderRadius: 3, mt: 5 }}>
//       <Grid container direction="column">
//         <Card
//           sx={{
//             width: "100%",
//             display: "flex",
//             flexDirection: "row",
//             cursor: "pointer",
//           }}
//           onClick={() => handleVideoDetail(videoData)}
//           key={videoData.postId} 
//         >
//           <Grid item xs={12}>
//             <CardContent>
//               <Stack
//                 direction={"row"}
//                 alignItems={"flex-end"}
//                 spacing={2}
//                 flexWrap={"wrap"}
//               >
//                 <Typography
//                   variant="h5"
//                   sx={{ textAlign: "left" }}
//                   fontWeight={"bold"}
//                 >
//                   {videoData?.title}
//                 </Typography>
//                   <ReactPlayer
//                     className="player"
//                     url={videoUrl}
//                     controls
//                     playing={false}
//                     width="100%"
//                     height="500px"
//                     onReady={handleReady}
//                     config={{
//                       youtube: {
//                         playerVars: {
//                           origin: window.location.origin,
//                           enablejsapi: 1
//                         },
//                         embedOptions: {
//                           origin: window.location.origin
//                         }
//                       }
//                     }}
//                   />
//                   {duration && (
//                     <Typography
//                       variant="h6"
//                       sx={{ textAlign: "left" }}
//                       fontWeight={"bold"}
//                     >
//                     </Typography>
//                   )}
//                   <Typography
//                     variant="h6"
//                     sx={{ textAlign: "left" }}
//                     fontWeight={"bold"}
//                   >
//                     글쓴이 {videoData?.member?.name}
//                 </Typography>
//               </Stack>
//               <DeleteIcon   onClick={(e) => {
//                   e.stopPropagation(); 
//                   sendDeleteVideo(videoData?.postId);
//                 }}/>
//             </CardContent>
//           </Grid>
//         </Card>
//       </Grid>
//     </Box>
//     );
//   }
  

//-------
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import instance from "../../api/instance";

export default function VideoList({ videoData }) {
  console.log("videoData postId:", videoData.postId);
  console.log("videoData content:", videoData.content); // 동영상 ID 확인용

  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (videoData?.content) {
      const videoContent = extractVideoId(videoData.content);
      setVideoUrl(`https://www.youtube.com/embed/${videoContent}?enablejsapi=1&origin=${window.location.origin}`);
    }
  }, [videoData]);

  const handleVideoDetail = (videoData) => {
    console.log("videoId???", videoData.postId);
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

  const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/; 
    const matches = url.match(regex);
    return matches ? matches[1] : null;
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
                {videoUrl && ( 
                  <iframe
                    className="player"
                    width="100%"
                    height="500px"
                    src={videoUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`youtube-video-${videoData.postId}`}
                  ></iframe>
                )}
                <Typography
                  variant="h6"
                  sx={{ textAlign: "left" }}
                  fontWeight={"bold"}
                >
                  글쓴이 {videoData?.member?.name}
                </Typography>
              </Stack>
              <DeleteIcon onClick={(e) => {
                e.stopPropagation();
                sendDeleteVideo(videoData?.postId);
              }} />
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Box>
  );
}
