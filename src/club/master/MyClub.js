import { Box, Button, Grid } from "@mui/material";
import ButtonAppBar from "../../common/MainAppBar";
import MyClubList from "./MyClubList";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import instance from "../../api/instance";
import { clubListState } from "../../recoil/state/clubState.js";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import Cookies from 'js-cookie';

export default function MyClub() {
  const location = useLocation();
  const navigate = useNavigate();  

  const userId = Cookies.get('userId');

  const [clubList, setClubList] = useRecoilState(clubListState);
    
  useEffect(() => {
    console.log("실행");
    instance
      .get(`/club/my/${userId}`)
      .then((response) => {
        setClubList(response?.data);
        console.log("club", response?.data);
      })
      .catch((error) => console.error(error));
  }, [userId, setClubList]); 

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
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction={"column"}
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {clubList?.map((data) => (
                <Grid item xs={1} key={data.id}>
                  <MyClubList club={data} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
