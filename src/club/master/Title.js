import { Box, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { titleState } from "../../recoil/state/noticeState";

export default function Title({data}) {
  const [title, setTitle] = useRecoilState(titleState);


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
