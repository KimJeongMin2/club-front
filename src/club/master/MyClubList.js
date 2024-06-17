import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyClubList({ club }) {
  console.log("club 정보", club?.clubId);
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(null);

  const handleClubBaseInfoDetail = () => {
    navigate(`/ClubBaseInfoDetail/${club?.clubId}`, { state: { club } });
  };

  const handleRegisterClub = () => {
    navigate(`/ClubBaseInfoDetail/${club?.clubId}`, { state: { isRegistering: true, club } });
  };

  useEffect(() => {
    if (club?.photo) {
      function decodeBase64(base64String) {
        try {
          return Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));
        } catch (error) {
          console.error("Failed to decode base64 string:", error);
          return null;
        }
      }

      const imageBytes = decodeBase64(club.photo);
      if (imageBytes) {
        const imageBlob = new Blob([imageBytes], { type: "image/png" });
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageData(imageUrl);
      }
    }
  }, [club?.photo]);

  const isBasicInfoEmpty =
    !club?.photo &&
    !club?.history &&
    !club?.introduction &&
    !club?.meetingTime &&
    !club?.registration &&
    !club?.staffList;

  return (
    <Box sx={{ flexDirection: "row", width: "900px", borderRadius: 3, mt: 5 }}>
      <Grid container direction="column">
        {/* {isBasicInfoEmpty && (
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" onClick={handleRegisterClub}>
              등록
            </Button>
          </Grid>
        )}
        {!isBasicInfoEmpty && (
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" onClick={handleClubBaseInfoDetail}>
              수정
            </Button>
          </Grid>
        )} */}
      <Card
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            cursor: isBasicInfoEmpty ? "default" : "pointer",
          }}
          onClick={!isBasicInfoEmpty ? handleClubBaseInfoDetail : undefined}
        >
          <Grid item xs={5}>
            {imageData && (
              <CardMedia
                component="img"
                alt="image"
                height="250"
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
                  {club?.clubName}
                </Typography>
                {isBasicInfoEmpty ? (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ ml: "auto" }}
                  onClick={handleRegisterClub}
                >
                  등록
                </Button>
                ) : (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ ml: "auto" }}
                  onClick={handleClubBaseInfoDetail}
                >
                  수정
                </Button>
              )}

              </Stack>
              <Stack direction={"column"} spacing={1} sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  동아리 종류: {club?.type}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  신청자 이름: {club?.applicantName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  신청자 학과: {club?.applicantDepartment}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  신청자 학번: {club?.applicantId}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  신청자 전화번호: {club?.applicantPhone}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  지도교수 성함: {club?.proffessorName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  지도교수 전공: {club?.proffessorMajor}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  지도교수 전화번호: {club?.proffessorPhone}
                </Typography>
              </Stack>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Box>
  );
}
