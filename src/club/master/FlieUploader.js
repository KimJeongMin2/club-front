import { Box } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function FileUploader({ club }) {

  const fileName = file?.name || club?.club?.attachment?.originalFileName;

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    // const response = await axios.post(
    //   "http://202.31.202.205:80/files",
    const response = await instance.post("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setFileId(response.data.data.id);
    return response.data;
  };
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);

      setFile(file);
      uploadFile(file)
        .then((data) => {
          console.log("업로드된 파일:", data);
        })
        .catch((error) => {
          console.error("파일 업로드 실패:", error);
        });
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
