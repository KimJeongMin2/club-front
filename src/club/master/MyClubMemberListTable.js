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
    clubJoinMemberState,
    memberRefuseReason,
  } from "../../recoil/state/clubState";
  import { useRecoilState } from "recoil";
  import { useEffect, useState } from "react";
  import instance from "../../api/instance";
  import { saveAs } from "file-saver";
import MyClubMemberListHeader from "./MyClubMemberListHeader";
import MyClubMemberToolBar from "./MyClubMemberToolBar";
  export default function MyClubMemberListTable(props) {
    const location = useLocation();
    const [selected, setSelected] = useRecoilState(clubJoinIdState);
    const [clubJoinList, setClubJoinList] = useRecoilState(clubJoinListState);
    const [file, setFile] = useState(null);
    const [rejectReason, setRejectReason] = useRecoilState(memberRefuseReason);
    
    const [myClubMember, setMyClubMemberList] = useRecoilState(clubJoinMemberState);
    useEffect(() => {
      const userId = 2; 
  
      instance.get(`/join-club/approved-members`, {
        headers: {
          'userId': userId, 
        },
      })
      .then((response) => {
        setMyClubMemberList(response?.data);
        console.log("response?.data", response?.data);
      })
      .catch((error) => console.error(error));
    }, []);
    console.log("selectedselected", selected)
    const isSelected = (id) => selected.indexOf(id) !== -1;
    console.log("isSelected", isSelected);
    console.log("clubJoinList?.file", clubJoinList);
  
    const handleSingleWithDraw = () => {
      console.log("selected", selected);
      if (window.confirm(`탈퇴 처리 하시겠습니까?`)) {
        selected.forEach((id) => {
          instance
            .put(`/join-club/${id}/withdraw`)
            .then((response) => {
              alert("탈퇴 처리 되었습니다.");
              console.log(response.data);
              window.location.reload();
            })
            .catch((error) => {
              alert("탈퇴처리에 실패하셨습니다.");
              console.log(error);
            });
        });
      } else {
        alert("취소합니다.");
      }
    };
  
    const handleMultipleWithDraw = () => {
      console.log("selected", selected);
      if (
        window.confirm(
          `선택한 회원 ${selected.length}명을 모두 탈퇴 처리 하시겠습니까?`
        )
      ) {
        instance
          .put(`/join-club/withdraw`, selected)
          .then((response) => {
            alert("탈퇴 처리 되었습니다.");
            console.log(response.data);
            window.location.reload();
          })
          .catch((error) => {
            alert("탈퇴처리에 실패하셨습니다.");
            console.log(error);
          });
      } else {
        alert("취소합니다.");
      }
    };
  
    const handleWithDraw = () => {
      if (selected.length === 1) {
        handleSingleWithDraw();
      } else if (selected.length > 1) {
        handleMultipleWithDraw();
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
  
    return (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "98%", margin: 2 }}>
          <MyClubMemberToolBar
            numSelected={selected.length}
            selected={selected}
            handleWithDraw={handleWithDraw}
            // fromDialog={props.fromDialog}
          />
          <TableContainer>
            <Table fullWidth aria-labelledby="tableTitle" size={"medium"}>
              <MyClubMemberListHeader
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={clubJoinList.length}
              />
              <TableBody>
                {myClubMember.map((row, index) => {
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
                      <TableCell align="left">{row?.member?.name}</TableCell>
                      <TableCell align="left">
                        {row?.status === "APPROVAL" ? "승인" : row?.status}
                      </TableCell>
                      <TableCell align="left">
                        {row?.memberStatus === "ACTIVITY" ? "활동중" : row?.status}
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
  