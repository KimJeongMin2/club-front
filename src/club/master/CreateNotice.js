import { Grid, Typography } from "@mui/material";
import ButtonAppBar from "../../common/MainAppBar";
import Editor from "./Editor";
import CreateNoticeHeader from "./CreateNoticeHeader";
import Title from "./Title";
import { useNavigate } from "react-router";
import { useLocation, useMatch } from "react-router-dom";
import FileUploader from "./FlieUploader";

export default function CreateNotice() {
  const location = useLocation();

  const { notice } = location.state || {};
  const { recruitment } = location.state || {};
  const matchUpdate = useMatch("/UpdateNotice/:id");
  const matchRecruitmentUpdate = useMatch("/UpdateMemberRecruitment/:id");
  const CreateMemberRecruitment = useMatch("/CreateMemberRecruitment");
  console.log("Editnotice", notice);
  console.log("useMatch", matchUpdate);
  console.log("hihi", matchRecruitmentUpdate);
  const noticeData = matchUpdate && notice ? notice : null;
  const recruitmentData = matchRecruitmentUpdate && recruitment ? recruitment: null;
  console.log("noticenotice", noticeData);
  console.log("ddurlsedj", recruitmentData);
  return (
    <Grid container direction={"column"} spacing={1}>
      <Grid item xs={12}>
        <ButtonAppBar />
      </Grid>
      <Grid item xs={12}>
        {notice || recruitment ? (
          <CreateNoticeHeader isEdit={true} />
        ) : (
          <CreateNoticeHeader />
        )}
      </Grid>
      <Grid item xs={12}>
        {notice ? <Title notice={noticeData} /> : <Title notice={recruitmentData} />}
      </Grid>
      <Grid item xs={12}>
       {matchRecruitmentUpdate || CreateMemberRecruitment?         <FileUploader/> :        ""}
      </Grid>
      <Grid item xs={12}>
        {notice? (<Editor notice={noticeData} />): (<Editor notice={recruitmentData} />)}
      </Grid>
    </Grid>
  );
}
