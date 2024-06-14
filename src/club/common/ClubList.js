import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Rating,
    Stack,
    Typography,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import DeleteIcon from '@mui/icons-material/Delete';
  import instance from "../../api/instance";
  export default function ClubList({ clubData }) {
    console.log("club", clubData);
    const navigate = useNavigate();
  
    const [imageData, setImageData] = useState(null);
  
    const mockMember = {
      studentId: 1,
      name: '홍길동',
      clubMembers: [
        {
          club: { clubId: 9 },
          memberStatus: 'ACTIVITY', 
        },
      ],
    };
 
    const isMemberInClub = clubData?.members?.some(member =>
        member.member.studentId === mockMember.studentId &&
        member.memberStatus === 'ACTIVITY'
      );
    console.log("isMemberInClub", isMemberInClub)
  
    const handleApply = () => {
      navigate(`/ClubJoin/${clubData?.clubId}`, { state: { clubData } });
    };
  
    const handleRecruitmentDetail = () => {
      navigate(`/ClubDetail/${clubData?.clubId}`, {state:{clubData}});
    };
  
    return (
      <Box sx={{ flexDirection: "row", width: "900px", borderRadius: 3, mt: 5 }}>
        <Grid container direction="column">
          <Card
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              cursor: "pointer",
            }}
            onClick={handleRecruitmentDetail}
          >
            {/* <Grid item xs={5}>
            {imageData && (
                <CardMedia
                  component="img"
                  alt="image"
                  height="150"
                  image={imageData}
                  sx={{
                    border: "1px solid lightgray",
                    borderRadius: "5%",
                    width: "200px",
                    ml: "10%",
                    mt: "10px",
                  }}
                />
              )}
            </Grid> */}
            <Grid item xs={12}>
              <CardContent>
                <Stack
                  direction={"row"}
                  alignItems={"flex-end"}
                  spacing={2}
                  flexWrap={"wrap"}
                >
                  <Typography
                    variant="h5"
                    sx={{ textAlign: "left" }}
                    fontWeight={"bold"}
                  >
                    {clubData?.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "left" }}
                    fontWeight={"bold"}
                  >
                    {clubData?.content}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "left" }}
                    fontWeight={"bold"}
                  >
                   글쓴이 {clubData?.member?.name}
                  </Typography>
                </Stack>
                <Button
                 onClick={(e) => {
                  e.stopPropagation();
                  handleApply();
                }}
                disabled={isMemberInClub}
                >
                  신청
                </Button>
                {/* <DeleteIcon   onClick={(e) => {
                    e.stopPropagation(); 
                    sendDeleteNotice(clubData?.postId);
                  }}/> */}
              </CardContent>
            </Grid>
          </Card>
        </Grid>
      </Box>
    );
  }
  