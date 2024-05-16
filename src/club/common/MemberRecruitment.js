import { Box, Grid } from "@mui/material";
import ButtonAppBar from "../../common/MainAppBar";
import MemberRecruitmentList from "./MemberRecruitmentList";

export default function MemberRecruitment() {
    const clubData = [{ id: 1, name: '동아리A', description: '동아리A 소개'}, 
                      { id: 2, name: '동아리B', description: '동아리B 소개'}]

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
    </Box>
  );
}
