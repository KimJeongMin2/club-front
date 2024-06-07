import { Box, Button, Grid } from "@mui/material";
import ButtonAppBar from "../../common/MainAppBar";
import MemberRecruitmentList from "./MemberRecruitmentList";
import NoticeList from "./noticeList";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import instance from "../../api/instance";
import { noticeListState } from "../../recoil/state/noticeState";
export default function Notice() {
  const noticeData = [
    { id: 1, name: "동아리A", notice: "동아리A 공지" },
    { id: 2, name: "동아리B", notice: "동아리B 공지" },
  ];
  const navigate = useNavigate();

    
  const [noticeList, setNoticeList] = useRecoilState(noticeListState);
    
  useEffect(() => {
    instance
      .get(`/posts`)
      .then((response) => {
        const cleanedNoticeList = response?.data.map((recruit) => ({
          ...recruit,
          content: extractTextFromHtml(recruit.content),
        }));
        setNoticeList(cleanedNoticeList);
        console.log("setLatestRecruitList", setNoticeList);
        console.log("cleanedRecruitList", cleanedNoticeList)
      })
      .catch((error) => console.error(error));
  }, []);
console.log("noticeList", noticeList)
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
              {noticeList?.map((data) => (
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