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

const KAKAO_SDK_URL = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";



const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [kakaoLoaded, setKakaoLoaded] = useState(false); 
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [department, setDepartment] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [pw, setPw] = useState('');
  const [studentId, setStudentId] = useState('');
  const [roleType, setRoleType] = useState('');

  useEffect(() => {
    const loadKakaoSdk = async () => {
        const script = document.createElement('script');
        script.src = KAKAO_SDK_URL;
        script.integrity = "sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4";
        script.crossOrigin = "anonymous";
        script.onload = () => {
            window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY); 
            setKakaoLoaded(true);
        };
        script.onerror = () => console.error("카카오 SDK 로딩 실패");
        document.head.appendChild(script);
    };
    loadKakaoSdk();
  }, []);

  useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get('code');

      if (code) {
          axios.post('/oauth/callback/kakao', { code })
          .then(response => {
              console.log('인가 코드 전송 완료:', response.data);
              navigate('/KakaoSignup');
          })
          .catch(error => {
              console.error('인가 코드 전송 실패:', error);
          });
      }
  }, [location.search, navigate]);


  const loginWithKakao = () => {
    if (kakaoLoaded && window.Kakao && window.Kakao.Auth && window.Kakao.Auth.authorize) {
      window.Kakao.Auth.authorize({
        redirectUri: process.env.REACT_APP_REDIRECT_URI,
        scope: 'account_email,gender,name,phone_number'
      }).then(authObj => {
        axios.post('/oauth/callback/kakao', {
          code: authObj.code
        })
        .then(response => {
          console.log('인가 코드 전송 완료:', response.data);
          navigate('/KakaoSignup');
        })
        .catch(error => {
          console.error('인가 코드 전송 실패:', error);
        });
      }).catch(error => {
        console.error('카카오 인증 실패:', error);
      });
    } else {
      console.error("Kakao SDK 또는 Auth 모듈이 로드되지 않았습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/members/signup', {
        userId,
        pw,
        name,
        birth,
        gender,
        department,
        phoneNum,
        email,
        studentId,
        roleType
      });
      console.log('회원가입 성공:', response.data);
      navigate('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
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
          <Button
            variant="contained"
            color="primary"
            onClick={loginWithKakao}
            sx={{ bgcolor: "#FEE500", color: "#000", width: '100%',mb: 2 }}
          >
            카카오 회원가입
          </Button>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
                label="아이디"
                variant="outlined"
                fullWidth
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="비밀번호"
                variant="outlined"
                fullWidth
                value={pw}
                onChange={(e) => setPw(e.target.value)}
            />
            </Grid>
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
                label="이름"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="생년월일"
                variant="outlined"
                fullWidth
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
            />
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel>성별</InputLabel>
                <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                >
                <MenuItem value="male">남성</MenuItem>
                <MenuItem value="female">여성</MenuItem>
                </Select>
            </FormControl>
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
            <Grid item xs={12}>
            <TextField
                label="전화번호"
                variant="outlined"
                fullWidth
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="이메일"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

export default SignUp;