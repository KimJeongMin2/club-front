import { Box, Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const activityImages = [
  { id: 1, imageUrl: 'https://www.next-t.co.kr/public/uploads/7b7f7e2138e29e598cd0cdf2c85ea08d.jpg', imageName: '활동 사진 1' },
  { id: 2, imageUrl: 'https://www.next-t.co.kr/public/uploads/7b7f7e2138e29e598cd0cdf2c85ea08d.jpg', imageName: '활동 사진 2' },
  { id: 3, imageUrl: 'https://www.next-t.co.kr/public/uploads/7b7f7e2138e29e598cd0cdf2c85ea08d.jpg', imageName: '활동 사진 3' },
  { id: 4, imageUrl: 'https://www.next-t.co.kr/public/uploads/7b7f7e2138e29e598cd0cdf2c85ea08d.jpg', imageName: '활동 사진 4' },
];

export default function ActivityPicture() {
  const navigate = useNavigate();
  return (
    <Grid container direction="column" spacing={1} sx={{ mt: "50px" }}>
      <Grid item xs={12}>
      <Grid container direction="row" alignItems="center">
        <Typography  sx={{ ml: "1rem", mr: "0.5rem" }}>활동사진(최신순)</Typography>
        <AddIcon 
            style={{
              color: "#F2BED1",
              cursor: "pointer"
            }}
            onClick={() => {
              navigate("/Picture");
            }}
          />
          </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {activityImages.map((image) => (
            <Grid item xs={12} sm={6} md={3} key={image.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={image.imageUrl}
                  alt={image.imageName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {image.imageName}
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
