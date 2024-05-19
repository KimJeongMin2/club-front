import React, { useState } from 'react';
import { Box, Grid, TextField, Button, MenuItem, Typography } from "@mui/material";
import ButtonAppBar from "../../common/MainAppBar";

const CreateClub = () => {
  const [formData, setFormData] = useState({
    type: 'CENTER',
    clubName: '',
    applicantName: '',
    applicantDepartment: '',
    applicantId: '',
    applicantPhoneNum: '',
    professorName: '',
    professorMajor: '',
    professorPhoneNum: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
                name="applicantPhoneNum"
                value={formData.applicantPhoneNum}
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
                value={formData.professorPhoneNum}
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
