import {
  Box,
  Checkbox,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";

import { useLocation } from "react-router-dom";
import ClubApplicationListTableToolBar from "./ClubApplicationListTableToolBar";
import ClubApplicationListTableHeader from "./ClubApplicationListTableHeader";
import {
  clubApplicationIdState,
  clubApplicationListState,
  clubRejectReasonState,
} from "../../recoil/state/clubState";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import instance from "../../api/instance";

export default function ClubApplicationListTable(props) {
  const location = useLocation();
  const [selected, setSelected] = useRecoilState(clubApplicationIdState);
  const [clubApplicationList, setClubApplicationList] = useRecoilState(clubApplicationListState);
  const [rejectReason, setRejectReason] = useRecoilState(clubRejectReasonState);

  useEffect(() => {
    instance
      .get(`/club/applicationClubList`)
      .then((response) => {
        console.log("response?.data", response?.data);
        setClubApplicationList(response?.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleSingleApprove = () => {
    console.log("selected", selected);
    if (window.confirm(`승인 하시겠습니까?`)) {
      selected.forEach((id) => {
        instance
          .put(`/club/${id}/approve`)
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

  const handleSingleReject = () => {
    console.log("selected", selected);
    if (window.confirm(`거절 하시겠습니까?`)) {
      selected.forEach((id) => {
        instance
          .put(`/club/${id}/reject`, { refusalReason: rejectReason[id] || 'No reason' }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
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

  const handleMultipleApprove = () => {
    console.log("selected", selected);
    if (
      window.confirm(
        `선택한 동아리 ${selected.length}개를 모두 승인하시겠습니까?`
      )
    ) {
      instance
        .put(`/club/approve`, selected)
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

  const handleMultipleReject = () => {
    console.log("selected", selected);

    if (window.confirm(`선택한 동아리 ${selected.length}개를 모두 거절하시겠습니까?`)) {
      const rejectionData = selected.map(id => ({
        clubId: id,
        refusalReason: rejectReason[id] || 'No reason'
      }));

      console.log("rejectionData", rejectionData)
      instance
        .put(`/club/reject`, rejectionData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
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

  const handleApprove = () => {
    if (selected.length === 1) {
      handleSingleApprove();
    } else if (selected.length > 1) {
      handleMultipleApprove();
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
      const newSelected = clubApplicationList.map((n) => n.clubId);
      setSelected(newSelected);
      console.log("All selected:", newSelected);
      return;
    }
    setSelected([]);
    console.log("All deselected");
  };

  const handleClick = (event, id) => {
    console.log("handleClick - id:", id);
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
    console.log("handleClick - selected:", newSelected);
  };

  const handleCheckboxChange = (event, id) => {
    event.stopPropagation();
    handleClick(event, id);
  };

  const handleRejectReasonChange = (id, reason) => {
    setRejectReason((prev) => ({
      ...prev,
      [id]: reason,
    }));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "98%", margin: 2 }}>
        <ClubApplicationListTableToolBar
          numSelected={selected.length}
          handleApprove={handleApprove}
          handleReject={handleReject}
        />
        <TableContainer>
          <Table fullWidth aria-labelledby="tableTitle" size={"medium"}>
            <ClubApplicationListTableHeader
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={clubApplicationList.length}
            />
            <TableBody>
              {clubApplicationList.map((row, index) => {
                const isItemSelected = isSelected(row?.clubId);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    key={row.clubId}
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={(event) => handleCheckboxChange(event, row.clubId)}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">{row?.type}</TableCell>
                    <TableCell align="left">{row?.clubName}</TableCell>
                    <TableCell align="left">{row?.applicantName}</TableCell>
                    <TableCell align="left">{row?.applicantDepartment}</TableCell>
                    <TableCell align="left">{row?.applicantId}</TableCell>
                    <TableCell align="left">{row?.applicantPhone}</TableCell>
                    <TableCell align="left">{row?.professorName}</TableCell>
                    <TableCell align="left">{row?.professorMajor}</TableCell>
                    <TableCell align="left">{row?.professorPhone}</TableCell>
                    <TableCell align="left">{row?.clubStatus}</TableCell>
                    {isItemSelected && (
                      <TableCell align="left">
                        <TextField
                          label="거절 사유"
                          value={rejectReason[row.clubId] || ''}
                          onChange={(e) => handleRejectReasonChange(row.clubId, e.target.value)}
                          fullWidth
                        />
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: "5px",
            pb: "5px",
          }}
        >
        </Box>
      </Paper>
    </Box>
  );
}
