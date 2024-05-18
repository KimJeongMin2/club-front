import { Box, Grid, Fab } from "@mui/material";
import ButtonAppBar from "../../common/MainAppBar";
import MemberRecruitmentList from "./MemberRecruitmentList";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import instance from "../../api/instance";
import { noticeListState } from "../../recoil/state/noticeState";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";


export default function MemberRecruitment() {
    const clubData = [{ id: 1, name: '동아리A', description: '동아리A 소개'}, 
                      { id: 2, name: '동아리B', description: '동아리B 소개'}]
                      
                
    const navigate = useNavigate();

    const handleFabClick = () => {
      navigate('/CreateClub'); 
    };

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
          <Grid item xs={12} spacing={1}>
            <Grid
              container
              direction={"column"}
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {clubData?.map((data) => (
                <Grid item xs={1} key={data.id}>
                  <MemberRecruitmentList club ={data} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Fab
          color="primary"
          aria-label="add"
          sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
          }}
          onClick={handleFabClick}
      >
          <AddIcon />
      </Fab>
    </Box>
  );
}
