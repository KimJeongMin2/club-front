import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { saveAs } from "file-saver";

export default function DownLoadFile() {
  const file = {
    originalFileName: "동아리 가입 신청서.hwp",
    fileUrl: "club-front\public\hwp\test.hwp"
  };

  const handleDownload = (file) => {
    fetch(file.fileUrl, {
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    })
      .then((resp) => resp.blob())
      .then((blob) => {
        saveAs(blob, file.originalFileName);
      })
      .catch(() => alert("파일을 다운로드하는 데 실패했습니다."));
  };

  return (
    <Button
      sx={{
        color: "black",
        width: "100%",
        textAlign: "left",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        boxSizing: "border-box",
        mt: 1,
        pl: 1
      }}
      startIcon={<AttachFileIcon />}
      onClick={() => handleDownload(file)}
    >
      {file.originalFileName}
    </Button>
  );
}