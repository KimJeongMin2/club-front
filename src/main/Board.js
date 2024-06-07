import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {latestRecruit } from "../recoil/state/noticeState";
import instance from "../api/instance";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
export default function Board() {
  const [latestRecruitList, setLatestRecruitList] = useRecoilState(latestRecruit);
  useEffect(() => {
    instance
      .get(`/posts/recent/recruit`)
      .then((response) => {
        const cleanedRecruitList = response?.data.map((recruit) => ({
          ...recruit,
          content: extractTextFromHtml(recruit.content),
        }));
        setLatestRecruitList(cleanedRecruitList);
        console.log("setLatestRecruitList", setLatestRecruitList);
        console.log("cleanedRecruitList", cleanedRecruitList)
      })
      .catch((error) => console.error(error));
  }, []);
  const navigate = useNavigate();

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      sx={{ maxWidth: 600, margin: "auto", mt: 4 }}
    >
      <Grid item container justifyContent="space-between" alignItems="center">
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "deepPurple.main", flexGrow: 1 }}
        >
          부원모집 게시판
        </Typography>
        <AddIcon
          sx={{
            color: "primary.main",
            cursor: "pointer",
            "&:hover": {
              color: "primary.dark",
            },
          }}
          onClick={() => {
            navigate("/MemberRecruitment");
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Box
          component="section"
          sx={{
            p: 2,
            border: "1px solid #ddd",
            boxShadow: 3,
            maxHeight: "400px",
            overflow: "auto",
          }}
        >
          <List>
            {latestRecruitList.map((notice, index) => (
              <ListItem
                key={index}
                sx={{
                  borderBottom: "1px solid #eee",
                  "&:last-child": { border: 0 },
                }}
              >
                <ListItemText
                  primary={notice.title}
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    color: "black",
                  }}
                  secondary={notice.content}
                  secondaryTypographyProps={{ fontStyle: "italic" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
    </Grid>
  );
}
function extractTextFromHtml(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const pTags = doc.querySelectorAll('p');
  let extractedText = '';
  pTags.forEach(p => {
    extractedText += p.textContent + '\n'; 
  });

  return extractedText.trim(); 
}