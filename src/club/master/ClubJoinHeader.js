import { Box, Button, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export default function ClubJoinHeader() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container direction={"column"}>
        <Grid item xs={12}>
          <Typography variant="h5">동아리 가입 신청 목록</Typography>
        </Grid>
        {/* <Grid item xs={12}>
            <Box sx={{display:"flex", justifyContent:"flex-end"}}>
            <Search sx={{ border: "1px solid black", mr:5 }}>
                <SearchIconWrapper>
                  <SearchIcon style={{ color: "black" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  style={{ color: "black" }}
                />
              </Search>
            </Box>
        </Grid> */}
      </Grid>
    </Box>
  );
}
