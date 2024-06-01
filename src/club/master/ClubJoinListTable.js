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
} from "@mui/material";

import { useLocation } from "react-router-dom";
import ClubJoinListTableToolBar from "./ClubJoinListTableToolBar";
import ClubListTableHeader from "./ClubListTableHeader";
import {
  clubJoinIdState,
  clubJoinListState,
} from "../../recoil/state/clubState";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import instance from "../../api/instance";

export default function ClubJoinListTable(props) {
  const location = useLocation();
  const [selected, setSelected] = useRecoilState(clubJoinIdState);
  const [clubJoinList, setClubJoinList] = useRecoilState(clubJoinListState);
  useEffect(() => {
    instance
      .get(`/join-club`)
      .then((response) => {
        setClubJoinList(response?.data);
        console.log("response?.data", response?.data);
      })
      .catch((error) => console.error(error));
  }, []);
  const isSelected = (id) => selected.indexOf(id) !== -1;

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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = clubJoinList.map((n) => n.id);
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
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "98%", margin: 2 }}>
        <ClubJoinListTableToolBar
          numSelected={selected.length}
          handleApprove={handleApprove}
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
                    <TableCell align="left">{row?.club?.clubId}</TableCell>
                    <TableCell align="left">{row?.title}</TableCell>
                    <TableCell align="left">{row?.member?.name}</TableCell>
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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: "5px",
            pb: "5px",
          }}
        >
          {/* <Pagination
              count={totalPages}
              variant="outlined"
              shape="rounded"
              page={page}
              onChange={(event, value) => setPage(value)}
            /> */}
        </Box>
      </Paper>
    </Box>
  );
}
