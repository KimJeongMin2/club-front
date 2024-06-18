import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../api/instance";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ButtonAppBar from "../../common/MainAppBar";

export default function ClubBaseInfoDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [club, setClub] = useState(null); // 동아리 상세 정보
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [clubName, setClubName] = useState(""); // 동아리 이름
  const [history, setHistory] = useState(""); // 동아리 역사
  const [introduction, setIntroduction] = useState(""); // 동아리 소개
  const [meetingTime, setMeetingTime] = useState(""); // 정기 모임 시간
  const [registrationFile, setRegistrationFile] = useState(null);
  const [registrationFileName, setRegistrationFileName] = useState(null);
  const [registrationUrl, setRegistrationUrl] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [staffListFile, setStaffListFile] = useState(null);
  const [staffListFileName, setStaffListFileName] = useState(null);
  const [staffListUrl, setStaffListUrl] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false); // 등록 모드 상태

  const handleFileUpload = (event, setter, urlSetter, nameSetter) => {
    const file = event.target.files[0];
    setter(file);
    urlSetter(URL.createObjectURL(file));
    nameSetter(file.name);
  };

  const base64ToBlob = (base64, type) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: type });
  };

  const fetchFile = async (clubId, type, setUrl) => {
    try {
      const response = await instance.get(`/club/download/${type}/${clubId}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      if (type === "registration") {
        link.setAttribute("download", "동아리 가입신청서.hwp");
      } else if (type === "staffList") {
        link.setAttribute("download", "동아리 임원 명단.hwp");
      }
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(`Error fetching the ${type} file:`, error);
    }
  };

  useEffect(() => {
    const state = location.state;

    if (state && state.club) {
      const clubData = state.club;
      setClub(clubData);
      setClubName(clubData.clubName || "");
      setHistory(clubData.history || "");
      setIntroduction(clubData.introduction || "");
      setMeetingTime(clubData.meetingTime || "");
      if (clubData.registration) {
        setRegistrationUrl(`/club/download/registration/${clubData.clubId}`);
      }
      if (clubData.photo) {
        const photoBlob = base64ToBlob(clubData.photo, "image/png");
        setPhotoUrl(URL.createObjectURL(photoBlob));
      }
      if (clubData.staffList) {
        setStaffListUrl(`/club/download/staffList/${clubData.clubId}`);
      }
      if (state.isRegistering) {
        setIsRegistering(true);
        setIsEditing(true);
      }
    } else {
      navigate("/MyClub");
    }
  }, [location.state, navigate]);

  // 등록 또는 수정 완료 처리
  const handleSaveClub = async () => {
    try {
      console.log("Saving club with clubId:", club?.clubId);

      const formData = new FormData();
      const jsonBlob = new Blob(
        [
          JSON.stringify({
            clubName: clubName,
            history: history,
            introduction: introduction,
            meetingTime: meetingTime,
          }),
        ],
        { type: "application/json" }
      );
      formData.append("dto", jsonBlob);

      if (registrationFile) formData.append("registration", registrationFile);
      if (photoFile) formData.append("photo", photoFile);
      if (staffListFile) formData.append("staffList", staffListFile);

      formData.forEach((value, key) => {
        console.log(key, value);
      });

      console.log("보낼 데이터:", formData);
      const response = await instance.post(`/club/detail/${club?.clubId}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Club saved:", response.data);

      if (isRegistering) {
        alert("동아리 기본 정보 등록이 완료되었습니다.");
      } else {
        alert("동아리 기본 정보 수정이 완료되었습니다.");
      }

      navigate("/MyClub");
    } catch (error) {
      console.error("Error saving club:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (isRegistering) {
      alert("동아리 기본 정보 등록이 취소되었습니다.");
    } else {
      alert("동아리 기본 정보 수정이 취소되었습니다.");
    }
  };


  return (
    <Grid container direction={"row"} spacing={0.5}>
      <Grid item xs={12}>
        <ButtonAppBar />
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>

        {isEditing ? (
          <>
            <Button variant="contained" color="primary" onClick={handleSaveClub}>
              {isRegistering ? "등록" : "수정 완료"}
            </Button>
            <Button variant="contained" color="primary" onClick={handleCancelEdit}>
              취소
            </Button>
          </>
        ) : (
          <>
          <Button variant="contained" color="primary" onClick={() => navigate("/MyClub")}>
            목록
          </Button>
          <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
            수정
          </Button>
          </>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        <Box
          sx={{
            width: "80%",
          }}
        >
          <Grid container direction={"row"}>
            <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
              {photoUrl && (
                <CardMedia
                  component="img"
                  alt="image"
                  height="800"
                  image={photoUrl}
                  sx={{
                    border: "1px solid lightgray",
                    borderRadius: "5%",
                    width: "100%",
                    objectFit: "cover",
                    mt: 2,
                    mr: 2,
                    overflow: "auto",
                  }}
                />
              )}
              {isEditing && (
                <Box>
                  <input
                    accept="image/*"
                    id="photo-upload"
                    type="file"
                    onChange={(e) => handleFileUpload(e, setPhotoFile, setPhotoUrl, () => {})}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="photo-upload">
                    <Button variant="contained" component="span">
                      대표 사진 업로드
                    </Button>
                  </label>
                </Box>
              )}
            </Grid>
            <Grid item xs={6} border={"1px solid lightgrey"} borderRadius={5} sx={{ mb: 2 }}>
              <CardContent>
                {isEditing ? (
                  <>
                    <TextField
                      label="동아리 이름"
                      value={clubName}
                      onChange={(e) => setClubName(e.target.value)}
                      fullWidth
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      label="동아리 역사"
                      value={history}
                      onChange={(e) => setHistory(e.target.value)}
                      multiline
                      fullWidth
                      rows={4}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      label="동아리 소개"
                      value={introduction}
                      onChange={(e) => setIntroduction(e.target.value)}
                      multiline
                      fullWidth
                      rows={4}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      label="정기 모임 시간"
                      value={meetingTime}
                      onChange={(e) => setMeetingTime(e.target.value)}
                      fullWidth
                      sx={{ mb: 1 }}
                    />
                    <input
                      accept=".hwp,.pdf"
                      id="staff-list-upload"
                      type="file"
                      onChange={(e) => handleFileUpload(e, setStaffListFile, setStaffListUrl, setStaffListFileName)}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="staff-list-upload">
                      <Button variant="contained" component="span">
                        임원 명단 업로드
                      </Button>
                    </label>
                    {staffListFileName && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {staffListFileName}
                      </Typography>
                    )}
                    <input
                      accept=".hwp,.pdf"
                      id="registration-upload"
                      type="file"
                      onChange={(e) => handleFileUpload(e, setRegistrationFile, setRegistrationUrl, setRegistrationFileName)}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="registration-upload">
                      <Button variant="contained" component="span">
                        동아리 가입 신청서 업로드
                      </Button>
                    </label>
                    {registrationFileName && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {registrationFileName}
                      </Typography>
                    )}
                  </>
                ) : (
                  <>
                    <Typography variant="h5">{clubName}</Typography>
                    <Divider />
                    <Box display="flex" alignItems="center">
                      <CalendarMonthIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                      <Typography variant="body1" sx={{ verticalAlign: "middle", mr: 1 }}>
                        정기 모임 시간: {meetingTime}
                      </Typography>
                    </Box>
                    <CardContent
                      sx={{
                        borderTop: "1px solid lightgrey",
                        height: "500px",
                        mt: 2,
                        mr: 2,
                        overflow: "auto",
                      }}
                      borderRadius={2}
                    >
                      <Typography variant="h6">동아리 역사</Typography>
                      <Typography>{history}</Typography>
                      <Typography variant="h6" sx={{ mt: 2 }}>
                        동아리 소개
                      </Typography>
                      <Typography>{introduction}</Typography>
                      <Typography variant="h6" sx={{ mt: 2 }}>
                        정기 모임 시간
                      </Typography>
                      <Typography>{meetingTime}</Typography>
                      <Typography variant="h6" sx={{ mt: 2 }}>
                        임원 명단
                      </Typography>
                      {staffListUrl && (
                        <Button variant="contained" onClick={() => fetchFile(club.clubId, "staffList")}>
                          다운로드
                        </Button>
                      )}
                      <Typography variant="h6" sx={{ mt: 2 }}>
                        동아리 가입 신청서
                      </Typography>
                      {registrationUrl && (
                        <Button variant="contained" onClick={() => fetchFile(club.clubId, "registration")}>
                          다운로드
                        </Button>
                      )}
                    </CardContent>
                  </>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
