import {
  Box,
  Button,
  Checkbox,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import { useLocation } from "react-router-dom";
import ClubJoinListTableToolBar from "./ClubJoinListTableToolBar";
import ClubListTableHeader from "./ClubListTableHeader";
import {
  clubJoinIdState,
  clubJoinListState,
  memberRefuseReason,
} from "../../recoil/state/clubState";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import instance from "../../api/instance";
import { saveAs } from "file-saver";
import Cookies from 'js-cookie';
export default function ClubJoinListTable(props) {
  const location = useLocation();
  const [selected, setSelected] = useRecoilState(clubJoinIdState);
  const [clubJoinList, setClubJoinList] = useRecoilState(clubJoinListState);
  const [file, setFile] = useState(null);
  const [rejectReason, setRejectReason] = useRecoilState(memberRefuseReason);
  
  useEffect(() => {
    const uid = Cookies.get('userId'); 

    instance.get(`/join-club`, {
      headers: {
        'uid': uid, 
      },
    })
    .then((response) => {
      setClubJoinList(response?.data);
      console.log("response?.data", response?.data);
    })
    .catch((error) => console.error(error));
  }, []);
  console.log("selectedselected", selected)
  const isSelected = (id) => selected.indexOf(id) !== -1;
  console.log("isSelected", isSelected);
  console.log("clubJoinList?.file", clubJoinList);

  const handleSingleApprove = () => {
    console.log("selected", selected);
    if (window.confirm(`승인 하시겠습니까?`)) {
      selected.forEach((id) => {
        instance
          .put(`/join-club/${id}/approve`)
          .then((response) => {
            alert("승인처리 되었습니다.");
            console.log(response.data);
            window.location.reload();
          })
          .catch((error) => {
            alert("승인처리에 실패하셨습니다.");
            console.log(error);
          });
      });
    } else {
      alert("취소합니다.");
    }
  };

  const handleMultipleApprove = () => {
    console.log("selected", selected);
    if (
      window.confirm(
        `선택한 회원 ${selected.length}명을 모두 승인하시겠습니까?`
      )
    ) {
      instance
        .put(`/join-club/approve`, selected)
        .then((response) => {
          alert("승인처리 되었습니다.");
          console.log(response.data);
          window.location.reload();
        })
        .catch((error) => {
          alert("승인에 실패하셨습니다.");
          console.log(error);
        });
    } else {
      alert("취소합니다.");
    }
  };

  const handleApprove = () => {
    if (selected.length === 1) {
      handleSingleApprove();
    } else if (selected.length > 1) {
      handleMultipleApprove();
    }
  };

  const handleSingleReject = () => {
    console.log("selected", selected);
    if (window.confirm(`거절 하시겠습니까?`)) {
      selected.forEach((id) => {
        console.log(" rejectReason[id]",  rejectReason[id])
        const reason = rejectReason[id] || 'No reason provided';
        console.log("reason", reason)
        instance
          .put(`/join-club/${id}/reject`, { refusalReason: reason })
          .then((response) => {
            alert("거절처리 되었습니다.");
            console.log(response.data);
            window.location.reload();
          })
          .catch((error) => {
            alert("거절처리에 실패하셨습니다.");
            console.log(error);
          });
      });
    } else {
      alert("취소합니다.");
    }
  };
  
  const handleMultipleReject = () => {
    console.log("selected", selected);
  
    if (window.confirm(`선택한 회원 ${selected.length}명을 모두 거절하시겠습니까?`)) {
      const rejectionData = selected.map(id => ({
        clubJoinId: id,
        refusalReason: rejectReason[id] || 'No reason provided'
      }));
  
      console.log("rejectionData", rejectionData)
      instance
        .put(`/join-club/reject`, rejectionData)
        .then((response) => {
          alert("거절처리 되었습니다.");
          console.log(response.data);
          window.location.reload();
        })
        .catch((error) => {
          alert("거절에 실패하셨습니다.");
          console.log(error);
        });
    } else {
      alert("취소합니다.");
    }
  };


  const handleReject = () => {
    if (selected.length === 1) {
      handleSingleReject();
    } else if (selected.length > 1) {
      handleMultipleReject();
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = clubJoinList.map((n) =>  n.clubJoinId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  useEffect(() => {
    function decodeBase64(base64String) {
      return Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));
    }

    if (clubJoinList && clubJoinList.length > 0) {
      console.log("clubJoinList", clubJoinList)
      const processedFiles = clubJoinList
        .map((clubJoin) => {
          const fileBase64 = clubJoin.file;
          if (fileBase64) {
            const fileBytes = decodeBase64(fileBase64);
            const fileBlob = new Blob([fileBytes], {
              //type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
               type: "application/hwp"
            });
            return {
              blob: fileBlob,
              fileName:
                `${clubJoin.uploadFileName}` ||
                `동아리 가입 신청서_${clubJoin.clubJoinId}.hwp`,
            };
          }
          return null;
        })
        .filter((file) => file !== null);
      setFile(processedFiles);
    }
  }, [clubJoinList]);

  const downloadFile = (uploadFileName) => {
    const selectedFile = file.find((f) => f.fileName.includes(uploadFileName));

    if (selectedFile) {
      console.log("선택된 파일 다운로드:", selectedFile);
      saveAs(selectedFile.blob, selectedFile.fileName);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "98%", margin: 2 }}>
        <ClubJoinListTableToolBar
          numSelected={selected.length}
          selected={selected}
          handleApprove={handleApprove}
          handleReject={handleReject}
          setRejectReason={setRejectReason}
          // fromDialog={props.fromDialog}
        />
        <TableContainer>
          <Table fullWidth aria-labelledby="tableTitle" size={"medium"}>
            <ClubListTableHeader
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={clubJoinList.length}
            />
            <TableBody>
              {clubJoinList.map((row, index) => {
                const isItemSelected = isSelected(row?.clubJoinId);
                console.log("isItemSelected여기", isItemSelected)
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    onClick={(event) => handleClick(event, row?.clubJoinId)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    hover
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">{row?.club?.clubName}</TableCell>
                    <TableCell align="left">{row?.title}</TableCell>
                    <TableCell align="left">{row?.member?.name}</TableCell>
                    <TableCell align="left">{row?.member?.studentId}</TableCell>
                    <TableCell align="left">{row?.member?.department}</TableCell>
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        color="text"
                        onClick={(event) => {
                          event.stopPropagation(); 
                          downloadFile(row?.uploadFileName); 
                        }}
                      >
                       {row?.uploadFileName? (row?.uploadFileName) : "파일 다운로드" }
                      </Button>
                    </TableCell>
                    <TableCell align="left">{row?.createdAt}</TableCell>
                    <TableCell align="left">
                      {row?.status === "GO_OVER" ? "승인대기" : row?.status}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
