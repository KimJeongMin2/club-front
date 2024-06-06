import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate } from "react-router-dom";
export default function ButtonAppBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor:"pointer" }}
          onClick={() => navigate("/")}>
            동아리
          </Typography>
          <Button color="inherit">로그인</Button>
          <Button color="inherit">회원가입</Button>
          <Button color="inherit" onClick={() => navigate("/ClubJoinList")}>동아리 관리</Button>
          <Button color="inherit" onClick={() => navigate("/ClubApplicationList")}>동아리 신청관리</Button>
          {/* <Button color="inherit" onClick={() => navigate("/ClubCreateList")}>동아리 신청조회</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}