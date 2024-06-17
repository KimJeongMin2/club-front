// import { Grid, Typography, Card, CardContent } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import AddIcon from "@mui/icons-material/Add";
// import instance from "../api/instance";
// import React, { useState, useEffect } from 'react';

// export default function ActivityVideo() {
//   const navigate = useNavigate();
//   const [activityVideos, setActivityVideos] = useState([]);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const response = await instance.get('posts/main-video', {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         setActivityVideos(response.data);
//       } catch (error) {
//         console.error('Error fetching videos:', error);
//       }
//     };

//     fetchVideos();
//   }, []);

//   const handleVideoDetail = (videoData) => {
//     console.log("videoId???", videoData.postId);
//     navigate(`/VideoDetail/${videoData.postId}`, { state: { videoData } });
//   };

//   const extractVideoId = (url) => {
//     const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//     const matches = url.match(regex);
//     return matches ? matches[1] : null;
//   };

//   return (
//     <Grid container direction="column" spacing={1} sx={{ mt: "50px" }}>
//       <Grid item xs={12}>
//         <Grid container direction="row" alignItems="center">
//           <Typography sx={{ ml: "1rem", mr: "0.5rem" }}>활동영상(최신순)</Typography>
//           <AddIcon
//             style={{
//               color: "#F2BED1",
//               cursor: "pointer"
//             }}
//             onClick={() => navigate("/Video")}
//           />
//         </Grid>
//       </Grid>

//       <Grid item xs={12}>
//         <Grid container spacing={2}>
//           {activityVideos.map((video, index) => {
//             const videoId = extractVideoId(video.content);
//             const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`;
//             return (
//               <Grid item xs={12} sm={6} md={3} key={video.id}>
//                 <Card>
//                   <iframe
//                     className="player"
//                     width="100%"
//                     height="140px"
//                     src={embedUrl}
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                     title={`youtube-video-${video.id}`}
//                   ></iframe>
//                   <CardContent onClick={() => handleVideoDetail(video)}>
//                     <Typography gutterBottom variant="h6" component="div">
//                       {video.title}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             );
//           })}
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// }
//

import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import instance from "../api/instance";
import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard';

export default function ActivityVideo() {
  const navigate = useNavigate();
  const [activityVideos, setActivityVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await instance.get('posts/main-video', {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setActivityVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoDetail = (videoData) => {
    console.log("videoId???", videoData.postId);
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
            onClick={() => navigate("/Video")}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          {activityVideos.map((video, index) => ( // index 추가
            <Grid item key={video.id || index} xs={12} sm={6} md={3}> {/* key 속성에 video.id와 index 추가 */}
              <VideoCard video={video} onVideoClick={handleVideoDetail} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
