import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Button, MenuItem, Typography } from "@mui/material";
import ButtonAppBar from "../../common/MainAppBar";
import instance from "../../api/instance";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


const CreateClub = () => {

  const userId = Cookies.get('userId');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: '',
    clubName: '',
    applicantName: '',
    applicantDepartment: '',
    applicantId: '',
    applicantPhone: '',
    professorName: '',
    professorMajor: '',
    professorPhone: '',
    member: {
      uid: userId,
      name: '',
    },
  });

   // 사용자 정보 가져오기
   useEffect(() => {
    async function fetchMemberInfo() {
      try {
        const response = await instance.get(`members/baseInfo/${userId}`);
        const memberInfo = response.data;

        // setFormData({
        //   ...formData,
        //   applicantName: memberInfo.name,
        //   applicantDepartment: memberInfo.department,
        //   applicantId: memberInfo.studentId,
        //   applicantPhone: memberInfo.phoneNum,
        // });
        setFormData((prevFormData) => ({
          ...prevFormData,
          applicantName: memberInfo.name,
          applicantDepartment: memberInfo.department,
          applicantId: memberInfo.studentId,
          applicantPhone: memberInfo.phoneNum,
        }));

      } catch (error) {
        console.error('Error fetching member information:', error);
      }
    }

    fetchMemberInfo();
  }, [userId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const clubData = {
        type: formData.type,
        clubName: formData.clubName,
        applicantName: formData.applicantName,
        applicantDepartment: formData.applicantDepartment,
        applicantId: formData.applicantId,
        applicantPhone: formData.applicantPhone,
        professorName: formData.professorName,
        professorMajor: formData.professorMajor,
        professorPhone: formData.professorPhone,
        member: { uid: userId, name: formData.applicantName }, 
      };

      const response = await instance.post("club", clubData, { withCredentials: true });

      console.log('Club created:', response.data);
      alert('동아리 신청이 완료되었습니다');
      navigate("/club");
    } catch (error) {
      console.error('Error creating club:', error);
    }
  };

  const handleCancel = () => {
    alert('동아리 신청을 취소합니다.');
    navigate("/club");
  };



  return (
    <Box sx={{ flexDirection: "column", width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <ButtonAppBar />
      </Box>
      <Box sx={{ mt: 8, mx: 'auto', p: 3, maxWidth: '600px' }}>
        <Typography variant="h4" gutterBottom>동아리 등록</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="동아리 종류"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <MenuItem value="CENTER">중앙</MenuItem>
                <MenuItem value="DEPARTMENT">학과</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="동아리 이름"
                name="clubName"
                value={formData.clubName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="신청자 이름"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleChange}
                disabled 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="신청자 소속"
                name="applicantDepartment"
                value={formData.applicantDepartment}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="신청자 학번"
                name="applicantId"
                value={formData.applicantId}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="신청자 연락처"
                name="applicantPhone"
                value={formData.applicantPhone}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="지도교수 이름"
                name="professorName"
                value={formData.professorName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="지도교수 전공"
                name="professorMajor"
                value={formData.professorMajor}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="지도교수 연락처"
                name="professorPhone"
                value={formData.professorPhone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                신청
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="secondary" fullWidth onClick={handleCancel}>
                취소
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default CreateClub;
