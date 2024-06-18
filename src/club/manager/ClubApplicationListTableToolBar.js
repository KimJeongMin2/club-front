import { Box, Toolbar, Tooltip, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";

export default function ClubApplicationListTableToolBar(props) {
  const { numSelected, handleApprove, handleReject } = props;

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
        <>
          <Tooltip title="Approve">
            <Button onClick={handleApprove}>
              승인
            </Button>
          </Tooltip>
          <Tooltip title="Reject">
            <Button onClick={handleReject}>
              거절
            </Button>
          </Tooltip>
        </>
      ) : (
       ""
      )}
    </Toolbar>
  );
}

ClubApplicationListTableToolBar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleApprove: PropTypes.func.isRequired,
  handleReject: PropTypes.func.isRequired,
};
