import {
    Box,
    Button,
    Grid,
    Grow,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import instance from "../../api/instance";
  import { useNavigate, useMatch,useLocation } from "react-router";
import { useRecoilState } from "recoil";
import { fileState, titleState } from "../../recoil/state/noticeState";
import Cookies from 'js-cookie';
  export default function ClubJoinHeader({clubNumber}) {
    //console.log(clubNumber.club.clubId)

    const navigate = useNavigate();
    const location = useLocation();
    const [title, setTitle] = useRecoilState(titleState);
    const [file, setFile] = useRecoilState(fileState);
    const [member, setMember] = useState({
      uid: Cookies.get('userId'),
      name: Cookies.get('name'),
    });

    // const [club, setClub] = useState({
    //   clubId: clubNumber?.club?.clubId,
    // });
    const [club, setClub] = useState({
      clubId: null,
    });
    const clubData = location?.state;
    useEffect(() => {
      if (clubNumber?.club?.clubId) {
        setClub({ clubId: clubNumber.club.clubId });
      } else if (clubData?.clubData?.clubId) {
        setClub({ clubId: clubData.clubData.clubId });
      }
    }, [clubNumber, clubData]);
  
   
    console.log("clubData",clubData)
    console.log("클럽 아이디", club)
    console.log("파일파일", file);

    const createJoinClub = async () => {
        try {
          const joinData = {
            title: title,
            member: member,
            club: club
          };
      
          console.log("joinData", joinData);

          const formData = new FormData();
          formData.append("dto", new Blob([JSON.stringify(joinData)], { type: "application/json" }));
          formData.append("files", file);
          for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }
    
          const response = await axios.post('/api/join-club', formData, {
            withCredentials: true,
          });
          alert("동아리 가입 신청이 완료 되었습니다.");
          navigate("/")
          console.log("Club join created:", response.data);
        } catch (error) {
          console.error("Error creating/ club join:", error);
        }
      };
    
  
    return (
      <Box>
        <Grid container direction={"row"} spacing={1}>
          <Grid item xs={5}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              동아리 가입 신청
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={7}
            justifyContent="flex-end"
            sx={{ mt: 2, pr: 2 }}
          >
            <Button variant="contained" onClick={createJoinClub}>
              {"업로드"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }
  