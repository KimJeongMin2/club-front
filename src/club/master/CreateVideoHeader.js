import {
    Box,
    Button,
    Grid,
    Grow,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
  } from "@mui/material";
  import { useLocation } from "react-router-dom";
  import { useRecoilState } from "recoil";
  import {
    contentsState,
    titleState,
  } from "../../recoil/state/videoState";
  import { useState } from "react";
  import axios from "axios";
  import instance from "../../api/instance";
  import { useNavigate } from "react-router";
  export default function CreateVideoHeader({isEdit = false}) {
    const [contents, setContents] = useRecoilState(contentsState);
    const [title, setTitle] = useRecoilState(titleState);
    const location = useLocation();
    const navigate = useNavigate();
  
    const video = location.state?.video;
  
    const videoId = video?.noticeData?.postId;
    const [member, setMember] = useState({
      studentId: "1",
      name: "1",
    });
  
    const createVideo = async () => {
      try {
        const videoData = {
          title: title,
          content: contents,
          member: member,
        };
    
        const formData = new FormData();
        formData.append("dto", new Blob([JSON.stringify(videoData)], { type: "application/json" }));
    
        const url = isEdit ? `/posts/video/${videoId}` : "/posts/video";
        let response;
        if (isEdit) {
          response = await instance.put(url, formData, {
            withCredentials: true,
          });
        } else {
          response = await instance.post(url, formData, {
            withCredentials: true,
          });
        }
    
        console.log("Video created/updated:", response.data);
      } catch (error) {
        console.error("Error creating/updating video:", error);
      }
    };
  
    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };
    
    return (
      <Box>
        <Grid container direction={"row"} spacing={1}>
          <Grid item xs={5}>
            <Typography variant="h6" sx={{ mt: 2 }}>
            {isEdit ? "동영상 수정" : "동영상 등록"}
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={7}
            justifyContent="flex-end"
            sx={{ mt: 2, pr: 2 }}
          >
            <Button variant="contained" onClick={createVideo}>
              {"업로드"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }
  