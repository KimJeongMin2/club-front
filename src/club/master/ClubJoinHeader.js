import { Box, Button, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "30%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
}));

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
