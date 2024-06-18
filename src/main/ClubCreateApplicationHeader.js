import { Box, Grid, Typography } from "@mui/material";

export default function ClubCreateApplicationHeader() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container direction={"column"}>
        <Grid item xs={12}>
          <Typography variant="h5">내가 신청한 동아리 목록</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
