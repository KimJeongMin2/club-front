import Grid from "@mui/material/Grid";
import MainAppBar from "../common/MainAppBar";
import TabBar from "./TabBar";
export default function MainPage(){
  return(
    <Grid container spacing={1}>
       <Grid item xs={12}>
        <MainAppBar/>
       </Grid>
       <Grid item xs={12}>
        <TabBar/>
       </Grid>
    </Grid>
  )
}