import { Box, Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";

const activityVideos = [
  { id: 1, videoUrl: 'https://www.youtube.com/watch?v=DqvlxSsR8gI', videoName: '활동 비디오 1' },
  { id: 2, videoUrl: 'https://www.youtube.com/watch?v=DqvlxSsR8gI', videoName: '활동 비디오 2' },
  { id: 3, videoUrl: 'https://www.youtube.com/watch?v=DqvlxSsR8gI', videoName: '활동 비디오 3' },
  { id: 4, videoUrl: 'https://www.youtube.com/watch?v=DqvlxSsR8gI', videoName: '활동 비디오 4' },
];

export default function ActivityVideo() {
  return (
    <Grid container direction="column" spacing={1} sx={{ mt: "50px" }}>
      <Grid item xs={12}>
        <Typography sx={{ ml: "1rem" }}>활동비디오</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {activityVideos.map((video) => (
            <Grid item xs={12} sm={6} md={3} key={video.id}>
              <Card>
                <CardMedia
                  component="video"
                  controls
                  height="140"
                  src={video.videoUrl}
                  title={video.videoName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {video.videoName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
