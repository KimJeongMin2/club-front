import { Box, Grid } from "@mui/material";
import MasterDrawerLeft from "./MasterDrawerLeft";
import ButtonAppBar from "../../../common/MainAppBar";

export default function MyPageAppBar() {
  return (
    <Grid container direction={"column"} spacing={0.5}>
      <Grid item xs={12}>
        <ButtonAppBar />
      </Grid>
      <Grid item xs={12}>
        <MasterDrawerLeft />
      </Grid>
    </Grid>
  );
}
