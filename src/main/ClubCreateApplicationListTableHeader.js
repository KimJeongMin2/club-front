import {
    Box,
    Checkbox,
    TableCell,
    TableHead,
    TableRow,
  } from "@mui/material";
  import PropTypes from "prop-types";
  
  const headCells = [
    {
      id: "1",
      label: "동아리 종류",
    },
    {
      id: "2",
      label: "동아리 이름",
    },
    {
      id: "3",
      label: "신청자 이름",
    },
    {
      id: "4",
      label: "신청자 학과",
    },
    {
      id: "5",
      label: "신청자 학번",
    },
    {
      id: "6",
      label: "신청자 전화번호",
    },
    {
      id: "7",
      label: "담당교수 성함",
    },
    {
      id: "8",
      label: "담당교수 전공",
    },
    {
      id: "9",
      label: "담당교수 전화번호",
    },
    {
      id: "10",
      label: "상태",
    },
    {
      id: "11",
      label: "거절 사유",
    },
  ];
  
  export default function ClubCreateApplicationListTableHeader(props) {
    const { onSelectAllClick, numSelected, rowCount } = props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all",
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id} align={"left"} padding={"normal"}>
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  ClubCreateApplicationListTableHeader.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  