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
export default function MemberRecruitmentList({ recruitment }) {
  console.log("club", recruitment?.postId);
  const navigate = useNavigate();

  const [imageData, setImageData] = useState(null);

  const handleApply = () => {
    navigate(`/MemberRecruitmentDetail/${recruitment.id}`, { state: { recruitment } });
  };

  const handleNoticeDetail = () => {
    navigate(`/NoticeDetail/${recruitment?.postId}`, {state:{recruitment}});
  };


  useEffect(() => {
    function decodeBase64(base64String) {
      return Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
    }
    const base64String = recruitment?.photo;
    const imageBytes = decodeBase64(base64String);
    const imageBlob = new Blob([imageBytes], { type: 'image/png' });
    const imageUrl = URL.createObjectURL(imageBlob);

    setImageData(imageUrl);
  }, [recruitment?.photo]);

  
  const sendDeleteNotice = (noticeId) => {
    if (window.confirm("삭제하시겠습니까?")) {
        instance
            .delete(`/posts/recruitment/${noticeId}`, {
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
                  {recruitment?.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "left" }}
                  fontWeight={"bold"}
                >
                  {recruitment?.content}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "left" }}
                  fontWeight={"bold"}
                >
                 글쓴이 {recruitment?.member?.name}
                </Typography>
              </Stack>
              <Button
               onClick={(e) => {
                e.stopPropagation();
                handleApply();
              }}
              >
                신청
              </Button>
              <DeleteIcon   onClick={(e) => {
                  e.stopPropagation(); 
                  sendDeleteNotice(recruitment?.postId);
                }}/>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Box>
  );
}
