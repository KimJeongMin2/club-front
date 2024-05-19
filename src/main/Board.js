import { Box, Grid, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // React Router의 Link 컴포넌트를 import
import AddIcon from "@mui/icons-material/Add";
export default function Board() {
    const navigate = useNavigate();
  return (
    <Grid container direction="column" spacing={1}>
      <Grid container direction={"row"} spacing={1}>
        <Grid item xs={11}>
          <Typography sx={{ ml: "1rem" }}>부원모집 게시판</Typography>
        </Grid>
        <Grid item xs={1}>
            <AddIcon style={{
                color: "#F2BED1",
                cursor:"pointer"
            }}
            onClick={() => {
                navigate("/memberRecruitment")
            }}
            ></AddIcon>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{}}>
        <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
          box
        </Box>
      </Grid>
    </Grid>
  );
}
