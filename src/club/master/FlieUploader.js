import { Box } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { fileIdState, fileState } from "../../recoil/state/noticeState";
import { useRecoilState } from "recoil";
import instance from "../../api/instance";
import { useLocation } from "react-router-dom";

export default function FileUploader({ club }) {
  const [file, setFile] = useRecoilState(fileState);
  const [fileId, setFileId] = useRecoilState(fileIdState);
  const location = useLocation();
  const notice = location.state?.recruitment;

  const fileName = file?.name || (notice?.recruitment?.storedFileName || club?.club?.attachment?.originalFileName || '');

  console.log("notice", notice);
  console.log("file 저장 됐니 뭐니", file)
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setFile(file);
    });
  }, [setFile]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    if (notice) {
      console.log("여기 실행 됐나")
      setFile(notice?.recruitment?.file);
    } else {
      setFile(null);
    }
  }, [notice, setFile]);


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


// export default function FileUploader({ club }) {
//   const [file, setFile] = useRecoilState(fileState);
//   const [fileId, setFileId] = useRecoilState(fileIdState);
//   const fileName = file?.name || club?.club?.attachment?.originalFileName;
//   const location = useLocation();
//   console.log("",location.state);

//   console.log("club", club)
  
//   console.log("fileName", fileName);
  
//   const onDrop = useCallback((acceptedFiles) => {
//     acceptedFiles.forEach((file) => {
//       setFile(file);
//     });
//   }, []);

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });
//   return (
//     <Box {...getRootProps()} border={"1px solid #dee2e6"}>
//       <input {...getInputProps()} />
//       {fileName ? (
//         <p style={{ textAlign: "center" }}>{fileName}</p>
//       ) : (
//         <p>여기에 파일을 드래그하거나 클릭해서 파일을 선택하세요.</p>
//       )}
//     </Box>
//   );
// }
