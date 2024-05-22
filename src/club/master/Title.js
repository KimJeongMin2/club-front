import { Box, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { titleState } from "../../recoil/state/noticeState";
import { useEffect } from "react";

export default function Title({notice}) {
  const [title, setTitle] = useRecoilState(titleState);

  useEffect(() => {
    setTitle(""); 
  }, [setTitle]);
  

  console.log("abce", notice);

  useEffect(() => {
    if (notice) {
      if (notice.noticeData) {
        setTitle(notice.noticeData.title);
      } else if (notice.recruitment) {
        setTitle(notice.recruitment.title);
      }
    }
  }, [notice]);

  const handleChange = (event) => {
    setTitle(event.target.value);
  }
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField id="title" label="제목을 입력해주세요." variant="outlined" sx={{width:"99%"}} value={title} onChange={handleChange}/>
    </Box>
  );
}
