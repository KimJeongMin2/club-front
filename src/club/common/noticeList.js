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
  export default function NoticeList({ noticeData }) {
    console.log("noticeData", noticeData.postId);
    const navigate = useNavigate();

    const [imageData, setImageData] = useState(null);

    useEffect(() => {
      function decodeBase64(base64String) {
        return Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
      }
      const base64String = noticeData?.photo;
      const imageBytes = decodeBase64(base64String);
      const imageBlob = new Blob([imageBytes], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(imageBlob);
  
      setImageData(imageUrl);
    }, [noticeData?.photo]);
  
  console.log("noticeData", noticeData)

    const handleNoticeDetail = () => {
      navigate(`/NoticeDetail/${noticeData?.postId}`, {state:{noticeData}});
    };

    const sendDeleteNotice = (postId) => {
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
          onClick={handleNoticeDetail}
        >
          <Grid item xs={5}>
          {imageData && (
              <CardMedia
                component="img"
                alt="image"
                height="150"
                image={imageData}
                sx={{
                  border: "1px solid lightgray",
                  borderRadius: "5%",
                  width: "200px",
                  ml: "10%",
                  mt: "10px",
                }}
              />
            )}
          </Grid>
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
                  {noticeData?.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "left" }}
                  fontWeight={"bold"}
                >
                  {noticeData?.content}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "left" }}
                  fontWeight={"bold"}
                >
                 글쓴이 {noticeData?.member?.name}
                </Typography>
              </Stack>
              <DeleteIcon   onClick={(e) => {
                  e.stopPropagation(); 
                  sendDeleteNotice(noticeData?.postId);
                }}/>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Box>
    );
  }
  