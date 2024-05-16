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
import BusinessIcon from "@mui/icons-material/Business";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function MemberRecruitmentList({ club }) {
  console.log("club", club);
  const navigate = useNavigate();

  const handleApply = () => {
    navigate(`/MemberRecruitmentDetail/${club.id}`, { state: { club } });
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
          
        >
          <Grid item xs={5}>
            {/* <CardMedia
              component="img"
              alt="image"
              height="150"
              image={
                club?.profileImage
                  ? `${process.env.REACT_APP_API}${club?.fileUrl}`
                  : "https://cdn-icons-png.flaticon.com/512/7542/7542670.png"
              }
              sx={{
                border: "1px solid lightgray",
                borderRadius: "100%",
                width: "200px",
                ml: "10%",
                mt: "10px",
              }}
            /> */}
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
                  {club?.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "left" }}
                  fontWeight={"bold"}
                >
                  {club?.description}
                </Typography>
              </Stack>
              <Button
               onClick={handleApply}
              >
                신청
              </Button>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Box>
  );
}
