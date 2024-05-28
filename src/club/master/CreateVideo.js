import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import ButtonAppBar from "../../common/MainAppBar";
import instance from "../../api/instance";
import { useLocation, useNavigate, useMatch} from "react-router-dom";

export default function CreateVideo(){

    const location = useLocation();
    const navigate = useNavigate();

    
    const { video } = location.state || {};
    const matchUpdate = useMatch("/UpdateVideo/:id");
    console.log("EditVideo", video);
    console.log("useMatch", matchUpdate);

    const videoData = matchUpdate && video ? video : null;

    console.log("video: ", videoData);
    
    const [member, setMember] = useState({
        studentId: 1,
        name: "서영은",
    });

    const [formData, setFormData] = useState({
        title: '',
        content: '',
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

        try {
            const videoData = {
                title: formData.title,
                content: formData.content,
                member: member
            };

            console.log("videoData", videoData)

            const response = await instance.post(
                "posts/video",
                videoData,
                {
                    withCredentials: true,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }

            );

            console.log('Video post created:', response.data);
            navigate("/video"); 

        } catch (error) {
            console.error('Error creating video post:', error);
        }
    };

    return (
        <Box sx={{ flexDirection: "column", width: "100%" }}>
            <Box sx={{ width: "100%" }}>
                <ButtonAppBar />
            </Box>
            <Box sx={{ mt: 8, mx: 'auto', p: 3, maxWidth: '600px' }}>
                <Typography variant="h4" gutterBottom>활동 영상 등록</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="동영상 제목"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="동영상 url"
                                name="content"
                                value={formData.content}
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
}