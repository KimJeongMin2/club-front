import { Box, Button, Grid } from "@mui/material";
import ButtonAppBar from "../../common/MainAppBar";
import VideoList from "./videoList";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import instance from "../../api/instance";
import { videoListState } from "../../recoil/state/videoState.js";

export default function Video() {

  const navigate = useNavigate();

  const [videoList, setVideoList] = useRecoilState(videoListState);
    
  useEffect(() => {
      instance
          .get("/posts/video")
          .then((response) => {
            setVideoList(response?.data);
            console.log("videoList", response?.data)
          })
          .catch((error) => console.error(error));
  }, []);  

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
                onClick={() => navigate("/CreateVideo")}
              >
                활동 영상 등록
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
              {videoList?.map((data) => (
                <Grid item xs={1} key={data.id}>
                  <VideoList videoData={data} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
