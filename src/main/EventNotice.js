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
import { latestNotice } from "../recoil/state/noticeState";
import instance from "../api/instance";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function EventNotice() {
  const [latestNoticeList, setLatestNoticeList] = useRecoilState(latestNotice);

  useEffect(() => {
    instance
      .get(`/posts/recent/notices`)
      .then((response) => {
        const cleanedNoticeList = response?.data.map((notice) => ({
          ...notice,
          content: extractTextFromHtml(notice.content),
        }));
        setLatestNoticeList(cleanedNoticeList);
        console.log("setLatestNoticeList", cleanedNoticeList);
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
          동아리 행사 공지
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
            navigate("/Notice");
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
            {latestNoticeList.map((notice, index) => (
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
  const paragraphContents = htmlString.match(/<p>(.*?)<\/p>/gs) || [];
  const cleanedTexts = paragraphContents.map((content) =>
    content.replace(/<[^>]+>/g, "")
  );
  return cleanedTexts.join("\n");
}
