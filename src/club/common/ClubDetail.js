import {
    Box,
    Button,
    CardContent,
    CardMedia,
    Chip,
    Divider,
    Grid,
    Typography,
  } from "@mui/material";
  import ButtonAppBar from "../../common/MainAppBar";
  import { useLocation, useNavigate } from "react-router-dom";
  import { useEffect, useState } from "react";
  import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
  import CategoryIcon from "@mui/icons-material/Category";
  import { saveAs } from "file-saver";
  export default function ClubDetail() {
    // const { state } = useLocation();
    // const { club } = state;
    const navigate = useNavigate();
    const location = useLocation();
    const club = location?.state;
  
    console.log("여기", club);
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        function decodeBase64(base64String) {
          return Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));
        }
    
        const fileBase64 = club?.clubData?.file;
        if (fileBase64) {
          const fileBytes = decodeBase64(fileBase64);
          const fileBlob = new Blob([fileBytes], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          setFile(fileBlob);
        }
      }, [club?.clubData?.file]);

    const downloadFile = () => {
      if (file) {
        console.log("동작?", file);
        // saveAs(file, "clubJoin.hwp");
        const fileName = club?.clubData?.uploadFileName || "동아리 가입 신청서.hwp";
        saveAs(file, fileName);
      }
    };
  
    return (
      <Grid container direction={"row"} spacing={0.5}>
        <Grid item xs={12}>
          <ButtonAppBar />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 64px)",
          }}
        >
          <Box
            sx={{
              width: "80%",
            }}
          >
            <Grid container direction={"row"}>
              {/* <Grid
                item
                xs={6}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {image && (
                  <CardMedia
                    component="img"
                    alt="image"
                    image={image}
                    sx={{
                      border: "1px solid lightgray",
                      borderRadius: "5%",
                      width: "full",
                      height: "full",
                      mt: "10px",
                    }}
                  />
                )}
              </Grid> */}
              <Grid
                item
                xs={6}
                border={"1px solid lightgrey"}
                borderRadius={5}
                sx={{ mb: 2 }}
              >
                <CardContent>
                  <Typography variant="h5">
                    {club?.clubData?.clubName}
                  </Typography>
                  <Divider />
                  <Box display="flex" alignItems="center">
                    <CalendarMonthIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                    <Typography
                      variant="body1"
                      sx={{ verticalAlign: "middle", mr: 1 }}
                    >
                      {club?.club?.createdAt}
                    </Typography>
                    <CategoryIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                    <Typography>{club?.clubData?.type}</Typography>
                  </Box>
                </CardContent>
                <CardContent
                  sx={{
                    borderTop: "1px solid lightgrey",
                    height: "210px",
                    mt: 2,
                    mr: 2,
                    overflow: "auto",
                  }}
                  borderRadius={2}
                >
                  <Typography variant="h6">
                    {club?.clubData?.professorMajor}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={downloadFile}
                  >
                    {club?.clubData?.uploadFileName ? club?.clubData?.uploadFileName: "가입신청서"}
                  </Button>
                </CardContent>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
  }
  