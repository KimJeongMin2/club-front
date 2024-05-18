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
  export default function NoticeList({ noticeData }) {
    console.log("noticeData", noticeData.id);
    const navigate = useNavigate();
  
    // const handleApply = () => {
    //   navigate(`/MemberRecruitmentDetail/${noticeData.id}`, { state: { noticeData } });
    // };
  
    return (
      <Box sx={{ flexDirection: "row", width: "900px", borderRadius: 3, mt: 2 }}>
        <Grid container direction="column">
          <Card
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              cursor: "pointer",
            }}
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
                    {noticeData?.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "left" }}
                    fontWeight={"bold"}
                  >
                    {noticeData?.notice}
                  </Typography>
                </Stack>
                {/* <Button
                 onClick={handleApply}
                >
                  신청
                </Button> */}
              </CardContent>
            </Grid>
          </Card>
        </Grid>
      </Box>
    );
  }
  