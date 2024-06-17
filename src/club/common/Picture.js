import React, { useState,useEffect  } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TextField, Button, Box } from '@mui/material';
import Cookies from 'js-cookie'; 
import { useNavigate } from "react-router-dom";
import instance from "../../api/instance";
import ButtonAppBar from "../../common/MainAppBar";

const ActivityPostForm = () => {
const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태 추가
  const [isAdmin, setIsAdmin] = useState(false);
  const userId = Cookies.get('userId');

  useEffect(() => {
    const roleType = Cookies.get('roleType'); 
    setIsAdmin(roleType === 'MASTER'); 
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]); // 선택된 이미지 파일 상태에 저장
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
        alert('권한이 없습니다.');
        navigate("/");
        return;
      }
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('userId', userId); // userId 값 추가
      formData.append('imageFile', imageFile); // 이미지 파일 FormData에 추가

      const response = await instance.post('posts/activities', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Activity posted successfully:', response.data);
      alert("등록 성공");
      navigate("/");
      // 성공 메시지 표시 또는 다른 처리 로직 추가
    } catch (error) {
      console.error('Error posting activity:', error);
      // 에러 메시지 표시 또는 다른 처리 로직 추가
    }
  };

  return (
    <Box sx={{ flexDirection: "column" }}>
    <Box sx={{ width: "100%" }}>
      <ButtonAppBar />
    </Box>
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '800px', margin: '0 auto' }}>
      <TextField
        label="제목"
        value={title}
        onChange={handleTitleChange}
        fullWidth
        margin="normal"
      />
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
      />
      <Box mb={2}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageFileChange}
        />
      </Box>
      <Button type="submit" variant="contained" color="primary">
        등록
      </Button>
    </Box>
    </Box>
  );
};

export default ActivityPostForm;