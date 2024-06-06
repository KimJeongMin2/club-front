import {
    Box,
    Checkbox,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
  } from "@mui/material";
  import PropTypes from "prop-types";
  const headCells = [
    {
      id: "1",
      label: "동아리명",
    },
    {
      id: "2",
      label: "회원명",
    },
    {
      id: "3",
      label: "상태",
    },
    {
        id: "",
        label: "멤버상태",
      },
  ];
  export default function MyClubMemberListHeader(props) {
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
                "aria-label": "select all desserts",
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
  MyClubMemberListHeader.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  