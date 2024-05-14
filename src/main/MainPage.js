import Grid from "@mui/material/Grid";
import MainAppBar from "../common/MainAppBar";
import TabBar from "./TabBar";
import EventNotice from "./EventNotice";
import Board from "./Board";
import ActivityPicture from "./ActivityPicture";
import ActivityVideo from "./ActivityVideo";
export default function MainPage() {
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item xs={12}>
        <MainAppBar />
      </Grid>
      <Grid item xs={12}>
        <TabBar />
      </Grid>
      <Grid
        container
        direction={"row"}
        spacing={1}
      >
        <Grid item xs={6}>
          <EventNotice />
        </Grid>
        <Grid item xs={6}>
          <Board/>
        </Grid>
      </Grid>
      <Grid item xs={12}>
       <ActivityPicture/>
      </Grid>
      <Grid item xs={12}>
        <ActivityVideo/>
      </Grid>
    </Grid>
  );
}
