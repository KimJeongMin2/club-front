import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
export default function EventNotice() {
  const navigate = useNavigate();
  return (
    <Grid container direction="column" spacing={1}>
      <Grid container direction={"row"} spacing={1}>
        <Grid item xs={11}>
          <Typography sx={{ ml: "1rem" }}>동아리 행사 공지</Typography>
        </Grid>
        <Grid item xs={1}>
          <AddIcon
            style={{
              color: "#F2BED1",
              cursor:"pointer"
            }}
            onClick={() => {
              navigate("/Notice");
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
