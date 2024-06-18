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
  import ClubCreateApplicationListTableHeader from "./ClubCreateApplicationListTableHeader";
  import {
    clubMyApplicationIdState,
    clubMyApplicationListState,
    clubRejectReasonState,
  } from "../recoil/state/clubState";
  import { useRecoilState } from "recoil";
  import { useEffect } from "react";
  import instance from "../api/instance";
  import Cookies from 'js-cookie';

  
  export default function ClubCreateApplicationListTable(props) {
    const location = useLocation();
    const [selected, setSelected] = useRecoilState(clubMyApplicationIdState);
    const [clubMyApplicationList, setClubMyApplicationList] = useRecoilState(clubMyApplicationListState);
    const [rejectReason, setRejectReason] = useRecoilState(clubRejectReasonState);
  
    const userId = Cookies.get('userId');


    useEffect(() => {
      instance
        .get(`/club/applicationClubList/${userId}`)
        .then((response) => {
          console.log("response?.data", response?.data);
          setClubMyApplicationList(response?.data);
        })
        .catch((error) => console.error(error));
    }, []);
  
    const isSelected = (id) => selected.indexOf(id) !== -1;
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = clubMyApplicationList.map((n) => n.clubId);
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

  
    return (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "98%", margin: 2 }}>
          <TableContainer>
            <Table fullWidth aria-labelledby="tableTitle" size={"medium"}>
              <ClubCreateApplicationListTableHeader
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={clubMyApplicationList.length}
              />
              <TableBody>
                {clubMyApplicationList.map((row, index) => {
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
                      <TableCell align="left">{row?.refuseReason}</TableCell>
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
  