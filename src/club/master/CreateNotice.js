import { Grid, Typography } from "@mui/material";
import ButtonAppBar from "../../common/MainAppBar";
import Editor from "./Editor";
import CreateNoticeHeader from "./CreateNoticeHeader";
import Title from "./Title";


export default function CreateNotice(){
    return(
        <Grid container direction={"column"} spacing={1}>
            <Grid item xs={12}>
              <ButtonAppBar/>
            </Grid>
            <Grid item xs={12}>
                <CreateNoticeHeader/>
            </Grid>
            <Grid item xs={12}>
                <Title />
            </Grid>
            <Grid item xs={12}>
                <Editor/>
            </Grid>
        </Grid>
    )
}