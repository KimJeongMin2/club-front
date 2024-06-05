import { Box, Button, Grid } from "@mui/material";
import ButtonAppBar from "../../common/MainAppBar";
import MyClubList from "./MyClubList";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import instance from "../../api/instance";
import { clubListState } from "../../recoil/state/clubState.js";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";

export default function MyClub() {

  const location = useLocation();
  const navigate = useNavigate();  

  const [member, setMember] = useState({
    studentId: 1,
    name: "서영은",
  });

  const [clubList, setClubList] = useRecoilState(clubListState);
    
  useEffect(() => {
      instance
          .get(`/club/my/${member.studentId}`)
          .then((response) => {
            setClubList(response?.data);
            console.log("club", response?.data)
          })
          .catch((error) => console.error(error));
  }, [member]);  

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
