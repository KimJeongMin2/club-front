import { Box, Grid, Typography } from "@mui/material";

export default function EventNotice(){
    return(
        <Grid container direction="column" spacing={1}>
            <Grid item xs={12}>
                <Typography sx={{ml:"1rem"}}>
                    동아리 행사 공지
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{}}>
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    box
                </Box>
            </Grid>
        </Grid>
    )
}