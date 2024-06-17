import React from 'react';
import { Box, Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from 'js-cookie';
import instance from "../../api/instance";

const PictureList = ({ pictureData }) => {
    const navigate = useNavigate();
    const userId = Cookies.get('userId');
    const handleClick = () => {
    navigate(`/PictureDetail/${pictureData.postId}`);
  };
  const sendDeletePicture = (postId) => {
    if (window.confirm("삭제하시겠습니까?")) {
      instance
        .delete(`/posts/${postId}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          alert("삭제가 완료되었습니다.");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("취소합니다.");
    }
  };
    return (
      <Card sx={{ minWidth: 390, maxWidth: 390, pt: 1 }} onClick={handleClick}>
        <CardMedia
          component="img"
          height="200" 
          image={`data:image/png;base64,${pictureData.photoBase64}`}
          alt={pictureData.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pictureData.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            작성자: {pictureData.member.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            작성일: {new Date(pictureData.createdAt).toLocaleDateString()}
          </Typography>
          {userId === pictureData?.member?.uid && (
                <DeleteIcon onClick={(e) => {
                  e.stopPropagation();
                  sendDeletePicture(pictureData?.postId);
                }} />
              )}
        </CardContent>
      </Card>
    );
  };
      
export default PictureList;
