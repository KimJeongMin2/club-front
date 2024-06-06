import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import { memberRefuseReason } from "../../recoil/state/clubState";
import { useRecoilState } from "recoil";

export default function MyClubMemberToolBar(props) {
  const { numSelected, selected, handleWithDraw } = props;
  const [open, setOpen] = useState(false);
  //const [rejectReasons, setRejectReasons] = useState({});
  const [rejectReason, setRejectReason] = useRecoilState(memberRefuseReason);

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
          나의 동아리 부원 목록
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="withdraw">
            <IconButton onClick={handleWithDraw}>
              탈퇴 <CheckBoxIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        ""
      )}
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>거절 사유</DialogTitle>
        <DialogContent>
          <DialogContentText>
            선택된 각 항목에 대해 거절 사유를 입력해주세요.
          </DialogContentText>
          {selected.map((id) => (
            <TextField
              key={id}
              autoFocus
              margin="dense"
              id={`reason-${id}`}
              label={`거절 사유 (ID: ${id})`}
              type="text"
              fullWidth
              variant="standard"
              value={rejectReason[id] || ''}
              onChange={(e) => handleReasonChange(id, e.target.value)}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
        
        </DialogActions>
      </Dialog> */}
    </Toolbar>
  );
}

MyClubMemberToolBar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  handleApprove: PropTypes.func.isRequired,
  handleReject: PropTypes.func.isRequired,
};
