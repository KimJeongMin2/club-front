import { Grid, Typography } from "@mui/material";
import ButtonAppBar from "../../common/MainAppBar";
import Editor from "./Editor";
import CreateNoticeHeader from "./CreateNoticeHeader";
import Title from "./Title";
import { useNavigate } from "react-router";
import { useLocation, useMatch} from "react-router-dom";

export default function CreateNotice(){
    const location = useLocation();
    
    const { notice } = location.state || {};
    const matchUpdate = useMatch("/UpdateNotice/:id");
    console.log("Editnotice", notice);
    console.log("useMatch", matchUpdate);

    const noticeData = matchUpdate && notice ? notice : null;

    console.log("noticenotice", noticeData);
    
    return(
        <Grid container direction={"column"} spacing={1}>
            <Grid item xs={12}>
              <ButtonAppBar/>
            </Grid>
            <Grid item xs={12}>
            {notice ? (
                <CreateNoticeHeader isEdit={true} />
              ) : (
                <CreateNoticeHeader />
              )}
            </Grid>
            <Grid item xs={12}>
                <Title notice={noticeData}/>
            </Grid>
            <Grid item xs={12}>
                <Editor notice={noticeData}/>
            </Grid>
        </Grid>
    )
}