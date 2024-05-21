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
  photoFileState,
  titleState,
} from "../../recoil/state/noticeState";
import { useState } from "react";
import axios from "axios";
import instance from "../../api/instance";
import { useNavigate, useMatch } from "react-router";
export default function CreateNoticeHeader({ isEdit = false }) {
  const [contents, setContents] = useRecoilState(contentsState);
  const [alignment, setAlignment] = useState("ENTIRE");
  const [title, setTitle] = useRecoilState(titleState);

  const [photoFile, setPhotoFile] = useRecoilState(photoFileState);
  console.log("isEdit", isEdit);
  console.log("photoFile:", photoFile);
  console.log("photoFile.file:", photoFile?.file?.name);
  console.log("alignment", alignment);
  const location = useLocation();
  const navigate = useNavigate();

  const notice = location.state?.notice;

  const matchCreateNotice = useMatch("/CreateNotice");
  const matchCreateMemberRecruitment = useMatch("/CreateMemberRecruitment");
  const updateNoticeMatch = useMatch("/UpdateNotice/:id");
  console.log("noticeIDDDD", notice?.noticeData?.postId);

  console.log("matchCreateNotice", matchCreateNotice);
  let headerText;
  if (matchCreateNotice !== null) {
    headerText = isEdit ? "수정" : "공지사항 등록";
  } else if (matchCreateMemberRecruitment !== undefined) {
    headerText = isEdit ? "수정" : "부원모집 등록";
  }

  const noticeId = notice?.noticeData?.postId;
  const [member, setMember] = useState({
    studentId: 1,
    name: "1",
  });

  const createNotice = async () => {
    try {
      const postData = {
        title: title,
        content: contents,
        category: getCategory(),
        noticeVisibilityType: alignment,
        member: member,
      };

      const formData = new FormData();
      formData.append(
        "dto",
        new Blob([JSON.stringify(postData)], { type: "application/json" })
      );
      formData.append("photo", photoFile?.file);

      let url;
      if (matchCreateNotice !== undefined) {
        if (isEdit && notice?.noticeData?.postId) {
          url = `/posts/${notice.noticeData.postId}`;
        } else {
          url = "/posts";
        }
      } else if (matchCreateMemberRecruitment !== undefined) {
        if (isEdit && notice?.noticeData?.postId) {
          url = `/recruitment/posts/${notice.noticeData.postId}`;
        } else {
          url = "/posts/new-recruitment-posts";
        }
      }
      console.log("url", url);

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

      console.log("Notice created/updated:", response.data);
    } catch (error) {
      console.error("Error creating/updating notice:", error);
    }
  };

  const getCategory = () => {
    if (matchCreateNotice) {
      return "NOTICE";
    } else if (updateNoticeMatch) {
      return "NOTICE";
    } else {
      return "RECRUIT";
    }
  };

  console.log("headerText", headerText);
  // const createNotice = async () => {
  //   try {
  //     const postData = {
  //       title: title,
  //       content: contents,
  //       category: "NOTICE",
  //       noticeVisibilityType: alignment,
  //       member: member,
  //     };

  //     const formData = new FormData();
  //     formData.append("dto", new Blob([JSON.stringify(postData)], { type: "application/json" }));
  //     formData.append("photo", photoFile?.file);

  //     const url = isEdit ? `/posts/${noticeId}` : "/posts";
  //     let response;
  //     if (isEdit) {
  //       response = await instance.put(url, formData, {
  //         withCredentials: true,
  //       });
  //     } else {
  //       response = await instance.post(url, formData, {
  //         withCredentials: true,
  //       });
  //     }

  //     console.log("Notice created/updated:", response.data);
  //   } catch (error) {
  //     console.error("Error creating/updating notice:", error);
  //   }
  // };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box>
      <Grid container direction={"row"} spacing={1}>
        <Grid item xs={5}>
          <Typography variant="h6" sx={{ mt: 2 }}>
            {headerText}
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={7}
          justifyContent="flex-end"
          sx={{ mt: 2, pr: 2 }}
        >
          {(matchCreateNotice || updateNoticeMatch) && (
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              sx={{ pr: 2 }}
            >
              <ToggleButton value="ENTIRE">ENTIRE</ToggleButton>
              <ToggleButton value="CLUB">CLUB</ToggleButton>
            </ToggleButtonGroup>
          )}

          <Button variant="contained" onClick={createNotice}>
            {"업로드"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
