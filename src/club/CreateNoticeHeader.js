
  import { Box, Button, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
  export default function CreateNoticeHeader() {
   
  
    return (
      <Box>
        <Grid container direction={"row"} spacing={1}>
          <Grid item xs={5}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              공지사항 
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={7}
            justifyContent="flex-end"
            sx={{ mt: 2, pr: 2 }}
          >
            <Button
              variant="contained"
              //onClick={}
            >
              {"업로드"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }
  