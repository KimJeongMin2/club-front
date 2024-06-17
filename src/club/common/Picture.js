import React, { useEffect } from 'react';
import { Box, Button, Grid } from '@mui/material';
import ButtonAppBar from '../../common/MainAppBar';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import instance from '../../api/instance';
import { pictureListState } from '../../recoil/state/pictureState.js';
import Cookies from 'js-cookie';
import PictureList from './PictureList';

export default function Picture() {
  const navigate = useNavigate();
  const [pictureList, setPictureList] = useRecoilState(pictureListState);
  const roleType = Cookies.get('roleType');

    useEffect(() => {
      instance
        .get("/posts/picture")
        .then((response) => {
          setPictureList(response?.data);
          console.log("setPictureList", response?.data);
        })
        .catch((error) => console.error(error));
    }, [setPictureList]);


  return (
    <Box sx={{ flexDirection: 'column' }}>
      <Box sx={{ width: '100%' }}>
        <ButtonAppBar />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '75px',
          left: '200px',
          right: 0,
          bottom: 0,
        }}
      >
        <Grid container direction="column" spacing={2}>
          {roleType === 'MASTER' && (
            <Grid item xs={12}>
              <Grid container direction={'row'} justifyContent={'flex-end'}>
                <Button
                  variant="outlined"
                  endIcon={<ContentPasteGoIcon />}
                  onClick={() => navigate('/CreatePicture')}
                >
                  활동 사진 등록
                </Button>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12}>
            <Grid
              container
              direction={'column'}
              spacing={2}
              justifyContent={'center'}
              alignItems={'center'}
            >
            <Grid container spacing={2}>
              {pictureList?.map((data) => (
                <PictureList key={data.postId} pictureData={data} />
              ))}
            </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}