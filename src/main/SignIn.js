import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import axios from 'axios';
import Cookies from 'js-cookie';
import instance from "../api/instance";

const KAKAO_SDK_URL = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [kakaoLoaded, setKakaoLoaded] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [sessionInfo, setSessionInfo] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


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
      instance.get(`oauth/callback/kakao/login?code=${code}`, { withCredentials: true })
        .then(response => {
          const userInfo = response.data;
          navigate('/');
          if (userInfo.isLoggedIn) {
            window.localStorage.setItem('userId', userInfo.id);
            window.localStorage.setItem('roleType', userInfo.roleType);
            window.localStorage.setItem('isLoggedIn', userInfo.isLoggedIn);
          }
          setSessionInfo(response.data); // 세션 정보 상태에 저장
          console.log('Session Info:', response.data);
        })
        .catch(error => {
          console.error('인가 코드 전송 실패:', error);
        });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const cookieData = {};

    cookies.forEach(cookie => {
      const [key, value] = cookie.trim().split('=');
      cookieData[key] = value;
    });

    if (cookieData.userId && cookieData.roleType && cookieData.isLoggedIn === 'true') {
      localStorage.setItem('userId', cookieData.userId);
      localStorage.setItem('roleType', cookieData.roleType);
      localStorage.setItem('isLoggedIn', cookieData.isLoggedIn);
      navigate('/');
    }
  }, [navigate]);

  const loginWithKakao = () => {
    if (kakaoLoaded && window.Kakao && window.Kakao.Auth && window.Kakao.Auth.authorize) {
      window.Kakao.Auth.authorize({
        redirectUri: process.env.REACT_APP_REDIRECT_URI
      });
    } else {
      console.error("Kakao SDK 또는 Auth 모듈이 로드되지 않았습니다.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post('/login', { userId, password }, { withCredentials: true });
      const userInfo = response.data;

      if (userInfo.isLoggedIn===true) {
        localStorage.setItem('userId', userInfo.id);
        localStorage.setItem('roleType', userInfo.roleType);
        localStorage.setItem('isLoggedIn', userInfo.isLoggedIn);
        localStorage.setItem('name', userInfo.name);
        navigate('/'); // 로그인 후 홈으로 리다이렉트
      }
    } catch (error) {
      console.log(error)
      alert('로그인 실패');
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
          로그인
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
                label="패스워드"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box mt={2} width="100%">
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ bgcolor: "#023E8A", color: "#00", width: '100%' }}
            >
              로그인
            </Button>
          </Box>
          <Box mt={2} width="35%">
            <img
              src="/kakao_login.png"
              alt="카카오로 로그인하기"
              onClick={loginWithKakao}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;