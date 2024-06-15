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
  fileState,
  photoFileState,
  titleState,
} from "../../recoil/state/noticeState";
import { useEffect, useState } from "react";
import axios from "axios";
import instance from "../../api/instance";
import { useNavigate, useMatch } from "react-router";
import { clubIdState } from "../../recoil/state/clubState";
export default function CreateNoticeHeader({ isEdit = false }) {
  const [contents, setContents] = useRecoilState(contentsState);
  const [alignment, setAlignment] = useState("ENTIRE");
  const [title, setTitle] = useRecoilState(titleState);
  const [selectedClubId, setClubIdState] = useRecoilState(clubIdState);
  const [photoFile, setPhotoFile] = useRecoilState(photoFileState);
  console.log("isEdit", isEdit);
  console.log("photoFile:", photoFile);
  console.log("photoFile.file:", photoFile?.file?.name);
  console.log("alignment", alignment);
  const [file, setFile] = useRecoilState(fileState);
  const location = useLocation();
  const navigate = useNavigate();

  const notice = location.state;
  const matchCreateNotice = useMatch("/CreateNotice");
  const matchCreateMemberRecruitment = useMatch("/CreateMemberRecruitment");
  const updateNoticeMatch = useMatch("/UpdateNotice/:id");
  console.log("updateNoticeMatch", updateNoticeMatch);
  const updateRecruitmentMatch = useMatch("/UpdateMemberRecruitment/:id");
  console.log("noticeIDDDD", notice?.recruitment?.recruitment?.postId);

  console.log("matchCreateMemberRecruitment", matchCreateMemberRecruitment);
  console.log("matchCreateNotice", matchCreateNotice);
  let headerText;
  if (matchCreateNotice !== null) {
    headerText = isEdit ? "수정" : "공지사항 등록";
  } else if (matchCreateMemberRecruitment !== undefined) {
    headerText = isEdit ? "수정" : "부원모집 등록";
  } 
  console.log("clubIddd", selectedClubId)
  const noticeId = notice?.noticeData?.postId;
  const [member, setMember] = useState({
    studentId: 1,
    name: "1",
  });

  const clubId = selectedClubId[0];
console.log("clubId임", clubId);
const [club, setClub] = useState({ clubId: selectedClubId[0] });

useEffect(() => {
  setClub({ clubId: selectedClubId[0] });
}, [selectedClubId[0]]);


console.log("clublcubclub", club);
//console.log("fileFile", file.name);
const [fileName, setFileName] = useState(null);

useEffect(() => {
  if (file) {
    setFileName(file.name);
  } else {
    setFileName(null);
  }
}, [file]);

console.log("fileName", fileName);
  const createNotice = async () => {
    try {
      let postData;
    if (matchCreateNotice !== null || updateNoticeMatch !== null) {
      console.log("여기?")
      postData = {
        title: title,
        content: contents,
        category: getCategory(),
        noticeVisibilityType: alignment,
        member: member,
        club: club,
      };
    } else if (
      matchCreateMemberRecruitment !== undefined ||
      updateRecruitmentMatch !== null
    ) {
      console.log("아님 여기?")
      postData = {
        title: title,
        content: contents,
        category: getCategory(),
        noticeVisibilityType: alignment,
        member: member,
        club: club,
        // storedFileName:fileName
      };
    }


      console.log("postData", postData)

  

      const formData = new FormData();
      formData.append(
        "dto",
        new Blob([JSON.stringify(postData)], { type: "application/json" })
      );
      formData.append("photo", photoFile?.file);
      if (matchCreateMemberRecruitment || updateRecruitmentMatch) {
        formData.append("file", file || null);
      }
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      let url;
      if (matchCreateNotice !== null || updateNoticeMatch !== null) {
        if (isEdit && notice?.notice?.noticeData?.postId) {
          url = `/posts/${notice.notice.noticeData.postId}`;
        } else {
          url = "/posts";
        }
      } else if (
        matchCreateMemberRecruitment !== undefined ||
        updateRecruitmentMatch !== null
      ) {
        if (isEdit && notice?.recruitment?.recruitment?.postId) {
          url = `/posts/recruitment/${notice.recruitment.recruitment.postId}`;
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
      if (matchCreateNotice !== null || updateNoticeMatch !== null) {
        alert("공지 등록이 완료 되었습니다.");
      navigate("/Notice")
      }
      else if (
        matchCreateMemberRecruitment !== undefined ||
        updateRecruitmentMatch !== null
      ){
        alert("부원 모집 등록이 완료 되었습니다.");
        navigate("/MemberRecruitment")
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
