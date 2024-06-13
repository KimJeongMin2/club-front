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
  import { useLocation, useNavigate, useParams } from "react-router-dom";
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
    const [registrationUrl, setRegistrationUrl] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [staffListFile, setStaffListFile] = useState(null);
    const [staffListUrl, setStaffListUrl] = useState(null);
  
    const handleFileUpload = (event, setter, urlSetter) => {
      const file = event.target.files[0];
      setter(file);
      urlSetter(URL.createObjectURL(file));
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
  
    useEffect(() => {
      if (location.state && location.state.club) {
        const { club } = location.state;
        console.log("club 있는지", club);
        setClub(club);
        setClubName(club.clubName);
        setHistory(club.history);
        setIntroduction(club.introduction);
        setMeetingTime(club.meetingTime);
        if (club.registration) {
          const registrationBlob = base64ToBlob(club.registration, 'application/octet-stream');
          setPhotoUrl(URL.createObjectURL(registrationBlob));
        }
        if (club.photo) {
          const photoBlob = base64ToBlob(club.photo, 'image/png');
          setPhotoUrl(URL.createObjectURL(photoBlob));
        }
        if (club.staffList) {
          const staffListBlob = base64ToBlob(club.staffList, 'text/plain');
          setStaffListUrl(URL.createObjectURL(staffListBlob));
        }
      } else {
        navigate("/MyClub");
      }
    }, [location.state, navigate]);
    
    // 수정 완료 처리
    const handleEditClub = async () => {
      try {
        console.log("Updating club with clubId:", club?.clubId);

        const formData = new FormData();
        const jsonBlob = new Blob([JSON.stringify({
          clubName: clubName,
          history: history,
          introduction: introduction,
          meetingTime: meetingTime,
        })], { type: "application/json" });
        formData.append("dto", jsonBlob);

        if (registrationFile) formData.append("registration", registrationFile);
        if (photoFile) formData.append("photo", photoFile);
        if (staffListFile) formData.append("file", staffListFile);
    
  
        console.log("보낼 데이터:", formData)
        const response = await instance.post(`/club/detail/${club?.clubId}`, formData, 
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        console.log("Club updated:", response.data);
        navigate("/MyClub");
      } catch (error) {
        console.error("Error updating club:", error);
      }
    };
  
    return (
      <Grid container direction={"row"} spacing={0.5}>
        <Grid item xs={12}>
          <ButtonAppBar />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" onClick={() => navigate("/MyClub")}>
            목록
          </Button>
          {isEditing ? (
            <Button variant="contained" color="primary" onClick={handleEditClub}>
              수정 완료
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
              수정
            </Button>
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
              <Grid
                item
                xs={6}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {photoUrl && (
                  <CardMedia
                    component="img"
                    alt="image"
                    image={photoUrl}
                    sx={{
                      border: "1px solid lightgray",
                      borderRadius: "5%",
                      width: "500px",
                      objectFit: "cover", 
                      mt: "10px",
                    }}
                  />
                )}
                {isEditing && (
                  <Box>
                    <input
                      accept="image/*"
                      id="photo-upload"
                      type="file"
                      onChange={(e) => handleFileUpload(e, setPhotoFile, setPhotoUrl)}
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
              <Grid
                item
                xs={6}
                border={"1px solid lightgrey"}
                borderRadius={5}
                sx={{ mb: 2 }}
              >
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
                        accept=".txt"
                        id="staff-list-upload"
                        type="file"
                        onChange={(e) => handleFileUpload(e, setStaffListFile, setStaffListUrl)}
                        style={{ display: "none" }}
                      />
                      <label htmlFor="staff-list-upload">
                        <Button variant="contained" component="span">
                          임원 명단 업로드
                        </Button>
                      </label>
                      <input
                      accept=".hwp,.pdf"
                      id="registration-upload"
                      type="file"
                      onChange={(e) => handleFileUpload(e, setRegistrationFile, setRegistrationUrl)}
                      style={{ display: "none" }}
                      />
                      <label htmlFor="registration-upload">
                        <Button variant="contained" component="span">
                          동아리 신청 파일 업로드
                        </Button>
                      </label>
                    </>
                  ) : (
                    <>
                      <Typography variant="h5">{clubName}</Typography>
                      <Divider />
                      <Box display="flex" alignItems="center">
                        <CalendarMonthIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                        <Typography
                          variant="body1"
                          sx={{ verticalAlign: "middle", mr: 1 }}
                        >
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
                        <Typography variant="h6" sx={{ mt: 2 }}>동아리 소개</Typography>
                        <Typography>{introduction}</Typography>
                        <Typography variant="h6" sx={{ mt: 2 }}>정기 모임 시간</Typography>
                        <Typography>{meetingTime}</Typography>
                        <Typography variant="h6" sx={{ mt: 2 }}>임원 명단</Typography>
                        {staffListUrl && (
                          <Typography component="a" href={staffListUrl} download>
                            다운로드
                          </Typography>
                        )}
                        <Typography variant="h6" sx={{ mt: 2 }}>등록 파일</Typography>
                        {registrationUrl && (
                          <Typography component="a" href={registrationUrl} download>
                            다운로드
                          </Typography>
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
  