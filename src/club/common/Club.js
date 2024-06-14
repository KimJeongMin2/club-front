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
import { clubListState } from "../../recoil/state/clubState";
import ClubList from "./ClubList";

export default function Club() {
                
    const navigate = useNavigate();

    const [club, setClub] = useRecoilState(clubListState);
    
    useEffect(() => {
      instance
        .get(`/club`)
        .then((response) => {
            setClub(response?.data);
            console.log("response?.data", response?.data);
          })
        .catch((error) => console.error(error));
    }, []);
  
  console.log("club", club)
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
          </Grid>
          <Grid item xs={12} spacing={1}>
            <Grid
              container
              direction={"column"}
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {club?.map((data) => (
                <Grid item xs={1} key={data.id}>
                  <ClubList clubData ={data} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
function extractTextFromHtml(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const pTags = doc.querySelectorAll('p');
  let extractedText = '';
  pTags.forEach(p => {
    extractedText += p.textContent + '\n'; 
  });

  return extractedText.trim(); 
}