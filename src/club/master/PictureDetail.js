import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import instance from "../../api/instance";
import styled from 'styled-components';
import { Grid, Box, Button, TextField, Typography, Divider } from "@mui/material";
import ButtonAppBar from "../../common/MainAppBar";
import Cookies from 'js-cookie';

const PictureDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [pictureData, setPictureData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const currentUserName = Cookies.get('name'); // 쿠키에서 현재 사용자 이름 가져오기

  useEffect(() => {
    const fetchPictureData = async () => {
      try {
        const response = await instance.get(`posts/picture/${postId}`);
        setPictureData(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPictureData();
  }, [postId]);

  const handleEdit = async () => {
    try {
      const data = { title, content };
      await instance.put(`/posts/picture/${postId}`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      alert("사진 정보가 수정되었습니다.");
      setIsEditing(false);
      navigate(`/picture/`);
    } catch (error) {
      console.error("Error updating picture:", error);
    }
  };

  const handleList = () => {
    navigate(`/picture/`);
  };

  if (!pictureData) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs={12}>
        <ButtonAppBar />
      </Grid>
      <Grid item xs={12}>
        <Box mt={4}>
          <Wrapper>
            <ImageWrapper>
              <img src={`data:image/png;base64,${pictureData.photoBase64}`} alt={pictureData.title} />
            </ImageWrapper>
            <ContentWrapper>
              {isEditing ? (
                <>
                  <TextField
                    label="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    label="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    multiline
                    fullWidth
                    rows={4}
                    sx={{ mb: 1 }}
                  />
                  <Button variant="contained" color="primary" onClick={handleEdit}>
                    수정 완료
                  </Button>
                </>
              ) : (
                <>
                  <TitleAndButtonWrapper>
                    <Typography variant="h5">{pictureData.title}</Typography>
                    {currentUserName === pictureData.member.name && (
                      <>
                        <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                          수정
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleList}>
                          목록
                        </Button>
                      </>
                    )}
                  </TitleAndButtonWrapper>
                  <Divider />
                  <Content dangerouslySetInnerHTML={{ __html: pictureData.content }} />
                  <AuthorInfo>
                    <span>작성자: {pictureData.member.name}</span>
                    <span>작성일: {new Date(pictureData.createdAt).toLocaleDateString()}</span>
                  </AuthorInfo>
                </>
              )}
            </ContentWrapper>
          </Wrapper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PictureDetail;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageWrapper = styled.div`
  width: 50%;
  img {
    width: 100%;
    height: auto;
  }
`;

const ContentWrapper = styled.div`
  width: 50%;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const TitleAndButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  margin-top: 16px;
`;

const AuthorInfo = styled.div`
  margin-top: 16px;
  span {
    display: block;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import instance from "../../api/instance";

// const PictureDetail = () => {
//   const { postId } = useParams();
//   const [pictureData, setPictureData] = useState(null);

//   useEffect(() => {
//     const fetchPictureData = async () => {
//       try {
//         const response = await instance.get(`posts/picture/${postId}`);
//         setPictureData(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchPictureData();
//   }, [postId]);

//   if (!pictureData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>{pictureData.title}</h2>
//       <img src={`data:image/png;base64,${pictureData.photoBase64}`} alt={pictureData.title} />
//       <p>{pictureData.content}</p>
//       <p>작성자: {pictureData.member.name}</p>
//       <p>작성일: {new Date(pictureData.createdAt).toLocaleDateString()}</p>
//     </div>
//   );
// };

// export default PictureDetail;