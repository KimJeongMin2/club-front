import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';


const KakaoSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [birth, setBirth] = useState('');
  const [department, setDepartment] = useState('');
  const [studentId, setStudentId] = useState('');
  const [roleType, setRoleType] = useState('');
  const [userId, setUserId] = useState('');


  useEffect(() => {
    const uId = new URLSearchParams(location.search).get('userId');
    setUserId(uId)
    if (!uId) {
      navigate('/');
    } else {
      // userId를 사용하여 추가 정보 입력 폼 렌더링 등의 작업 수행
      console.log('Kakao userId:', uId);
    }
  }, [location.search, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup', {
        userId,
        birth,
        department,
        studentId,
        roleType
      });
      console.log('회원가입 성공:', response.data);
      alert('회원가입 성공!');
      navigate('/');
      // 회원가입 후 처리할 작업 추가
    } catch (error) {
      alert('회원가입 실패');
    }
  };

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
          카카오 회원가입
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            p: 2,
            border: "1px solid #ddd",
            boxShadow: 3,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel>역할</InputLabel>
                <Select
                value={roleType}
                onChange={(e) =>setRoleType(e.target.value)}
                >
                <MenuItem value="MANAGER">관리자</MenuItem>
                <MenuItem value="MEMBER">일반 회원</MenuItem>
                <MenuItem value="MASTER">마스터 관리자</MenuItem>
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="생년월일"
                variant="outlined"
                fullWidth
                value={birth}
                onChange={(e) => setBirth(Number(e.target.value))}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="학과"
                variant="outlined"
                fullWidth
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="학번"
                variant="outlined"
                fullWidth
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
            />
            </Grid>
            </Grid>
            <Box mt={2} width="100%">
                <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ bgcolor: "#023E8A", color: "#00", width: '100%' }}
                >
                회원가입
                </Button>
            </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default KakaoSignUp;