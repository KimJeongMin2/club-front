import { Box, Grid, Fab, Button } from "@mui/material";
import ButtonAppBar from "../../common/MainAppBar";
import MemberRecruitmentList from "./MemberRecruitmentList";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import instance from "../../api/instance";
import { noticeListState, recruitmentListState } from "../../recoil/state/noticeState";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";

export default function MemberRecruitment() {
    const clubData = [{ id: 1, name: '동아리A', description: '동아리A 소개'}, 
                      { id: 2, name: '동아리B', description: '동아리B 소개'}]
                      
                
    const navigate = useNavigate();

    const [recruitment, setRecruitment] = useRecoilState(recruitmentListState);
    
    useEffect(() => {
        instance
            .get("/posts/recruitment")
            .then((response) => {
              setRecruitment(response?.data);
              console.log("recruitment", response?.data)
            })
            .catch((error) => console.error(error));
    }, []);  
  
  console.log("recruitmentrecruitment", recruitment)
  return (
    <Box sx={{ flexDirection: "column" }}>
      <Box sx={{ width: "100%" }}>
        <ButtonAppBar />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "75px",
          left: "200px",
          right: 0,
          bottom: 0,
        }}
      >
        <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
            <Grid container direction={"row"} justifyContent={"flex-end"}>
              <Button
                variant="outlined"
                endIcon={<ContentPasteGoIcon />}
                onClick={() => navigate("/CreateMemberRecruitment")}
              >
                부원모집 등록
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction={"row"} justifyContent={"flex-end"}>
              <Button
                variant="outlined"
                endIcon={<ContentPasteGoIcon />}
                onClick={() => navigate("/CreateClub")}
              >
                동아리 등록
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} spacing={1}>
            <Grid
              container
              direction={"column"}
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {recruitment?.map((data) => (
                <Grid item xs={1} key={data.id}>
                  <MemberRecruitmentList recruitment ={data} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}