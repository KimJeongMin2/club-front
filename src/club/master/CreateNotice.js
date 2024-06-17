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
import { clubIdState, myClubListState } from '../../recoil/state/clubState';
import ClubDialog from './clubListDialog';
import instance from '../../api/instance';

export default function CreateNotice() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [clubId, setClubIdState] = useRecoilState(clubIdState);
  const [myClub, setMyClubList] = useRecoilState(myClubListState);
  
  const { notice } = location.state || {};
  const { recruitment } = location.state || {};
  const matchUpdate = useMatch('/UpdateNotice/:id');
  const matchRecruitmentUpdate = useMatch('/UpdateMemberRecruitment/:id');
  const CreateMemberRecruitment = useMatch('/CreateMemberRecruitment');
  const CreateNotice = useMatch('/CreateNotice');
  const noticeData = matchUpdate && notice ? notice : null;
  const recruitmentData = matchRecruitmentUpdate && recruitment ? recruitment : null;
  console.log("clubs", clubs)
 console.log("여기", notice)
  const uid = 3528981213;
  console.log("noticeDatanoticeData", noticeData);
  console.log("recruitmentData임", recruitmentData)
  console.log("clubId 여기여기여기", clubId)

  useEffect(() => {
    if(CreateMemberRecruitment|| CreateNotice){
      setClubIdState([]);
    }
}, [CreateNotice, CreateMemberRecruitment]);  

  useEffect(() => {
    instance
        .get('/club')
        .then((response) => {
          setClubs(response?.data);
          console.log("noticeList", response?.data)
        })
        .catch((error) => console.error(error));
}, []);  

    
useEffect(() => {
  instance
      .get(`/club/my/${uid}`)
      .then((response) => {
        setMyClubList(response?.data);
        console.log("myClub", response?.data)
      })
      .catch((error) => console.error(error));
}, [uid]);  

useEffect(() => {
  if (noticeData) {
    setClubIdState([noticeData?.noticeData?.club?.clubId]);
  } else if (recruitmentData) {
    setClubIdState([recruitmentData?.recruitment?.club?.clubId]);
  }
}, [noticeData, recruitmentData]);

  
console.log("recruitmentData?.recruitment?.club?.clubId", recruitmentData?.recruitment?.club?.clubId)
console.log("clubIdclubId", clubId)
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
        <ClubDialog open={open} handleClose={handleClose} clubs={myClub} handleClubSelect={handleClubSelect} />
        <Button onClick={handleOpen}>{clubId.length > 0
            ? `동아리: ${clubId}`
            : '동아리'}</Button>
      </Grid>
    </Grid>
  );
}
