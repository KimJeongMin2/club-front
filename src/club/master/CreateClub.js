import React, { useState } from 'react';
import { Box, Grid, TextField, Button, MenuItem, Typography } from "@mui/material";
import ButtonAppBar from "../../common/MainAppBar";
import axios from "axios";
import instance from "../../api/instance";

const CreateClub = () => {

  const [member, setMember] = useState({
    studentId: 1,
    name: "서영은",
  });

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
    member: member,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const curmemberPk = 1; // 임의로 둠

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
        member: member
      };

      console.log("clubData", clubData)

      const response = await instance.post(
        // `club?memberPk=${curmemberPk}`,
        "club",
        clubData,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }

      );

      console.log('Club created:', response.data);
    } catch (error) {
      console.error('Error creating club:', error);
    }
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="신청자 소속"
                name="applicantDepartment"
                value={formData.applicantDepartment}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="신청자 학번"
                name="applicantId"
                value={formData.applicantId}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="신청자 연락처"
                name="applicantPhone"
                value={formData.applicantPhone}
                onChange={handleChange}
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
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default CreateClub;
