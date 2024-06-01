import { Box, Toolbar, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
export default function ClubJoinListTableToolBar(props) {
  const { numSelected, fromDialog } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          동아리 신청 목록
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Approve">
          <IconButton onClick={props.handleApprove}>
            <CheckBoxIcon />
          </IconButton>
        </Tooltip>
      ) : (
       ""
      )}
    </Toolbar>
  );
}
ClubJoinListTableToolBar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
