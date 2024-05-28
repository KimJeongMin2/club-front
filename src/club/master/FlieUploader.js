import { Box } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { fileIdState, fileState } from "../../recoil/state/noticeState";
import { useRecoilState } from "recoil";
import instance from "../../api/instance";

export default function FileUploader({ club }) {
  const [file, setFile] = useRecoilState(fileState);
  const [fileId, setFileId] = useRecoilState(fileIdState);
  const fileName = file?.name || club?.club?.attachment?.originalFileName;

  console.log("fileName", fileName);
  
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setFile(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <Box {...getRootProps()} border={"1px solid #dee2e6"}>
      <input {...getInputProps()} />
      {fileName ? (
        <p style={{ textAlign: "center" }}>{fileName}</p>
      ) : (
        <p>여기에 파일을 드래그하거나 클릭해서 파일을 선택하세요.</p>
      )}
    </Box>
  );
}
