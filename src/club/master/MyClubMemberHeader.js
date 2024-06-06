import { Box, Button, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export default function MyClubMemberHeader() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container direction={"column"}>
        <Grid item xs={12}>
          <Typography variant="h5">나의 동아리 부원</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
