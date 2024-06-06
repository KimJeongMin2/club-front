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
import instance from "../../api/instance";

export default function MyClubList({ club }) {


  console.log("club 정보", club?.clubId);
  const navigate = useNavigate();

  const [imageData, setImageData] = useState(null);

  const handleClubBaseInfoDetail = () => {
    navigate(`/ClubBaseInfoDetail/${club?.clubId}`, {state:{club}});
  };

  useEffect(() => {
    if (club?.photo) {
      function decodeBase64(base64String) {
        try {
          return Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
        } catch (error) {
          console.error("Failed to decode base64 string:", error);
          return null;
        }
      }

      const imageBytes = decodeBase64(club.photo);
      if (imageBytes) {
        const imageBlob = new Blob([imageBytes], { type: 'image/png' });
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageData(imageUrl);
      }
    }
  }, [club?.photo]);


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
          onClick={handleClubBaseInfoDetail}
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
                  {club?.clubName}
                </Typography>
              
              </Stack>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Box>
  );
}
