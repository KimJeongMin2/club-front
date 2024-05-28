import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Button } from '@mui/material';
import ButtonAppBar from '../../common/MainAppBar';
import Editor from './Editor';
import CreateNoticeHeader from './CreateNoticeHeader';
import Title from './Title';
import { useNavigate } from 'react-router';
import { useLocation, useMatch } from 'react-router-dom';
import FileUploader from './FlieUploader';
import { clubIdState } from '../../recoil/state/clubState';
import ClubDialog from './clubListDialog';
import instance from '../../api/instance';

export default function CreateNotice() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [clubId, setClubIdState] = useRecoilState(clubIdState);

  const { notice } = location.state || {};
  const { recruitment } = location.state || {};
  const matchUpdate = useMatch('/UpdateNotice/:id');
  const matchRecruitmentUpdate = useMatch('/UpdateMemberRecruitment/:id');
  const CreateMemberRecruitment = useMatch('/CreateMemberRecruitment');
  const noticeData = matchUpdate && notice ? notice : null;
  const recruitmentData = matchRecruitmentUpdate && recruitment ? recruitment : null;
  console.log("clubs", clubs)


  console.log("clubId", clubId)

  useEffect(() => {
    instance
        .get('/club')
        .then((response) => {
          setClubs(response?.data);
          console.log("noticeList", response?.data)
        })
        .catch((error) => console.error(error));
}, []);  

  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClubSelect = (clubId) => {
    setClubIdState(clubId);
    // setOpen(false);
  };
  return (
    <Grid container direction={'column'} spacing={1}>
      <Grid item xs={12}>
        <ButtonAppBar />
      </Grid>
      <Grid item xs={12}>
        {notice || recruitment ? (
          <CreateNoticeHeader isEdit={true} />
        ) : (
          <CreateNoticeHeader />
        )}
      </Grid>
      <Grid item xs={12}>
        {notice ? <Title notice={noticeData} /> : <Title notice={recruitmentData} />}
      </Grid>
      <Grid item xs={12}>
        {matchRecruitmentUpdate || CreateMemberRecruitment ? <FileUploader /> : ''}
      </Grid>
      <Grid item xs={12}>
        {notice ? <Editor notice={noticeData} /> : <Editor notice={recruitmentData} />}
      </Grid>
      <Grid item xs={12}>
        <ClubDialog open={open} handleClose={handleClose} clubs={clubs} handleClubSelect={handleClubSelect} />
        <Button onClick={handleOpen}>{clubId.length > 0
            ? `동아리: ${clubId}`
            : '동아리'}</Button>
      </Grid>
    </Grid>
  );
}
