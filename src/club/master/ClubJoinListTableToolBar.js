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

export default function ClubJoinListTableToolBar(props) {
  const { numSelected, selected, handleApprove, handleReject } = props;
  const [open, setOpen] = useState(false);
  //const [rejectReasons, setRejectReasons] = useState({});
  const [rejectReason, setRejectReason] = useRecoilState(memberRefuseReason);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRejectWithReason = () => {
    setRejectReason(rejectReason);
    handleReject(rejectReason);
    handleClose();
  };

  const handleReasonChange = (id, reason) => {
    setRejectReason(prev => ({ ...prev, [id]: reason }));
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
        <>
          <Tooltip title="Approve">
            <IconButton onClick={handleApprove}>
              <CheckBoxIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reject">
            <IconButton onClick={handleClickOpen}>
              <CancelIcon /> 
            </IconButton>
          </Tooltip>
        </>
      ) : (
        ""
      )}
      <Dialog open={open} onClose={handleClose}>
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
          <Button onClick={handleRejectWithReason}>거절하기</Button>
        </DialogActions>
      </Dialog>
    </Toolbar>
  );
}

ClubJoinListTableToolBar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  handleApprove: PropTypes.func.isRequired,
  handleReject: PropTypes.func.isRequired,
};

// import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Toolbar, Tooltip, Typography, useRadioGroup } from "@mui/material";
// import PropTypes from "prop-types";
// import { alpha } from "@mui/material/styles";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import IconButton from "@mui/material/IconButton";
// import { useState } from "react";
// import CancelIcon from '@mui/icons-material/Cancel';
// import { memberRefuseReason } from "../../recoil/state/clubState";
// import { useRecoilState } from "recoil";

// export default function ClubJoinListTableToolBar(props) {
//   const { numSelected, fromDialog, handleApprove, handleReject } = props;
//   const [open, setOpen] = useState(false);
//   const [rejectReason, setRejectReason] = useRecoilState(memberRefuseReason);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleRejectWithReason = () => {
//     setRejectReason(rejectReason);
//     handleReject();
//     handleClose();
//   };
//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(
//               theme.palette.primary.main,
//               theme.palette.action.activatedOpacity
//             ),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           동아리 신청 목록
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <>
//           <Tooltip title="Approve">
//             <IconButton onClick={handleApprove}>
//               <CheckBoxIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Reject">
//             <IconButton onClick={handleClickOpen}>
//               <CancelIcon /> 
//             </IconButton>
//           </Tooltip>
//         </>
//       ) : (
//         ""
//       )}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>거절 사유</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             거절 사유를 입력해주세요.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="reason"
//             label="거절 사유"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={rejectReason}
//             onChange={(e) => setRejectReason(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>취소</Button>
//           <Button onClick={handleRejectWithReason}>거절하기</Button>
//         </DialogActions>
//       </Dialog>
//     </Toolbar>
//   );
// }

// ClubJoinListTableToolBar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   handleApprove: PropTypes.func.isRequired, 
//   handleReject: PropTypes.func.isRequired, 
// };
