import { Grid, Typography } from "@mui/material";
import ButtonAppBar from "../../common/MainAppBar";
import { useLocation } from "react-router-dom";
import FileUploader from "../master/FlieUploader";
import CreateNoticeHeader from "../master/CreateNoticeHeader";
import ClubJoinHeader from "./ClubJoinHeader";
import Title from "../master/Title";

export default function ClubJoin() {
  const location = useLocation();
  const { recruitment } = location.state || {};
  console.log("ClubJoin", recruitment);
  return (
    <Grid container direction={"column"} spacing={1}>
      <Grid item xs={12}>
        <ButtonAppBar />
      </Grid>
      <Grid item xs={12}>
        <ClubJoinHeader clubNumber={recruitment}/>
      </Grid>
      <Grid item xs={12}>
        <Title />
      </Grid>
      <Grid item xs={12}>
        <FileUploader/>
      </Grid>
    </Grid>
  );
}
