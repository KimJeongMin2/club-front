import { Box, Grid } from "@mui/material";
import ClubJoinHeader from "./ClubJoinHeader";
import ClubJoinListTable from "./ClubJoinListTable";
import ButtonAppBar from "../../common/MainAppBar";
import MyPageAppBar from "./mypage/MyPage";
import MyClubMemberHeader from "./MyClubMemberHeader";
import MyClubMemberListTable from "./MyClubMemberListTable";

export default function MyClubMember() {
  return (
    <Grid container direction={"column"} spacing={0.5}>
      <Grid item xs={1}>
        <MyPageAppBar/>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            position: "absolute",
            top: "64px",
            left: "220px",
            right: 0,
            bottom: 0,
            overflow: "auto",
            marginLeft: "2%",
          }}
        >
          <Grid container direction={"column"} spacing={0}>
            <Grid item={12} ml={2} mt={2}>
              <MyClubMemberHeader />
            </Grid>
          </Grid>
          <Grid item={12}>
            <MyClubMemberListTable />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
