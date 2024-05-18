import { Box, Button, Grid } from "@mui/material";
import ButtonAppBar from "../../common/MainAppBar";
import MemberRecruitmentList from "./MemberRecruitmentList";
import NoticeList from "./noticeList";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import { useNavigate } from "react-router-dom";
export default function Notice() {
  const noticeData = [
    { id: 1, name: "동아리A", notice: "동아리A 공지" },
    { id: 2, name: "동아리B", notice: "동아리B 공지" },
  ];
  const navigate = useNavigate();

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
                onClick={() => navigate("/CreateNotice")}
              >
                공지 등록
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction={"column"}
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {noticeData?.map((data) => (
                <Grid item xs={1} key={data.id}>
                  <NoticeList noticeData={data} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
