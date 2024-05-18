import { Box, Grid, Typography } from "@mui/material";
import ButtonAppBar from "../../common/MainAppBar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import DownLoadFile from "./DownLoadFile";
export default function MemberRecruitmentDetail() {
  const { state } = useLocation();
  const { club } = state;
  console.log("ccc", club);
  return (
    <Grid container direction={"column"} spacing={1}>
      <Grid item xs={12}>
        <ButtonAppBar />
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            position: "absolute",
            top: "80px",
            left: "100px",
            right: "100px",
            bottom: 0,
          }}
        >
          <Grid container direction={"column"} spacing={1}>
            <Box sx={{ border: "1px dashed grey", bgcolor: '#GA0023', borderRadius:"10px" }}>
              <Grid item xs={5}>
                <Typography>{club?.name}</Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography>
                  {club?.description}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <DownLoadFile/>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
