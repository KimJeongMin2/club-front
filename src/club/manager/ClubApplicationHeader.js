import { Box, Grid, Typography } from "@mui/material";

export default function ClubApplicationHeader() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container direction={"column"}>
        <Grid item xs={12}>
          <Typography variant="h5">동아리 등록 신청 목록</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
