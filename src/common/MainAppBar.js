import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
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
          <Avatar
            sx={{
              bgcolor: stringToColor(localStorage.getItem("name")),
              cursor: "pointer"
            }}
            onClick={() => navigate("/MyPage")}
          >
            {localStorage.getItem("name").substring(0, 1)}
          </Avatar>
          
          {/* <Button color="inherit" onClick={() => navigate("/ClubJoinList")}>동아리 관리</Button> */}
          <Button color="inherit" onClick={() => navigate("/ClubApplicationList")}>동아리 신청관리</Button>
          <Button color="inherit" onClick={() => navigate("/ClubCreateList")}>동아리 신청조회</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}