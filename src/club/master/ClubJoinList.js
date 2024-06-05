import { Box, Grid } from "@mui/material";
import ClubJoinHeader from "./ClubJoinHeader";
import ClubJoinListTable from "./ClubJoinListTable";
import ButtonAppBar from "../../common/MainAppBar";

export default function ClubJoinList() {
  return (
    <Grid container direction={"column"} spacing={0.5}>
      <Grid item xs={1}>
        <ButtonAppBar/>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            position: "absolute",
            top: "64px",
            left: "100px",
            right: 0,
            bottom: 0,
            overflow: "auto",
            marginLeft: "2%",
          }}
        >
          <Grid container direction={"column"} spacing={0}>
            <Grid item={12} ml={2} mt={2}>
              <ClubJoinHeader />
            </Grid>
          </Grid>
          <Grid item={12}>
            <ClubJoinListTable />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
