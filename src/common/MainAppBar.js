import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("/api/session", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  const handleLogout = () => {
    axios
      .post("/api/logout", null, { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            동아리
          </Typography>
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              로그아웃
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/signin")}>
                로그인
              </Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>
                회원가입
              </Button>
            </>
          )}
          <Button
            color="inherit"
            onClick={() => navigate("/ClubApplicationList")}
          >
            동아리 신청관리
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}