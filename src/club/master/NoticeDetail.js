import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ButtonAppBar from "../../common/MainAppBar";
import { useEffect, useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";

export default function NoticeDetail() {
  const location = useLocation();
  const notice = location?.state;
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  console.log("notice", notice);

  useEffect(() => {
    function decodeBase64(base64String) {
      return Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));
    }
    const base64String = notice?.noticeData?.photo;
    const imageBytes = decodeBase64(base64String);
    const imageBlob = new Blob([imageBytes], { type: "image/png" });
    const imageUrl = URL.createObjectURL(imageBlob);

    setImage(imageUrl);
  }, [notice?.photo]);

  const editNotice = () => {
    navigate(`/UpdateNotice/${notice?.noticeData?.postId}`, {
      state: { notice },
    });
  };

  return (
    <Grid container direction={"row"} spacing={0.5}>
      <Grid item xs={12}>
        <ButtonAppBar />
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" onClick={editNotice}>
          수정
        </Button>
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
              {image && (
                <CardMedia
                  component="img"
                  alt="image"
                  image={image}
                  sx={{
                    border: "1px solid lightgray",
                    borderRadius: "5%",
                    width: "full",
                    height: "full",
                    mt: "10px",
                  }}
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
                <Typography variant="h5">
                  {notice?.noticeData?.title}
                </Typography>
                <Divider />
                <Box display="flex" alignItems="center">
                  <CalendarMonthIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                  <Typography
                    variant="body1"
                    sx={{ verticalAlign: "middle", mr: 1 }}
                  >
                    {notice?.noticeData?.createdAt}
                  </Typography>
                  <CategoryIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                  <Typography>{notice?.noticeData?.category}</Typography>
                </Box>
              </CardContent>
              <Box>
                <Typography variant="body1">
                  {notice?.notice?.tags.length > 0
                    ? notice?.notice?.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          color="primary"
                          style={{ margin: 2 }}
                        />
                      ))
                    : ""}
                </Typography>
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
                <Typography variant="h6">
                  {notice?.noticeData?.content}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
