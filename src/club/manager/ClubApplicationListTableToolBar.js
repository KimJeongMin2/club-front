import { Box, Toolbar, Tooltip, Typography, Button, Modal, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { useState } from "react";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

export default function ClubApplicationListTableToolBar(props) {
  const { numSelected, handleApprove, handleReject } = props;
  const [open, setOpen] = useState(false);
  const [refusalReason, setRefusalReason] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRejectWithReason = () => {
    handleReject(refusalReason);
    handleClose();
  };

  return (
    <>
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
              <Button onClick={handleClickOpen}>
                거절
              </Button>
            </Tooltip>
          </>
        ) : (
         ""
        )}
      </Toolbar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            거절 사유 입력
          </Typography>
          <TextField
            id="modal-modal-description"
            label="사유"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={refusalReason}
            onChange={(e) => setRefusalReason(e.target.value)}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} sx={{ mr: 2 }}>취소</Button>
            <Button onClick={handleRejectWithReason} variant="contained" color="primary">거절</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

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
//             <Button onClick={handleApprove}>
//               승인
//             </Button>
//           </Tooltip>
//           <Tooltip title="Reject">
//             <Button onClick={handleReject}>
//               거절
//             </Button>
//           </Tooltip>
//         </>
//       ) : (
//        ""
//       )}
//     </Toolbar>
    
//   );
// }

ClubApplicationListTableToolBar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    handleApprove: PropTypes.func.isRequired,
    handleReject: PropTypes.func.isRequired,
  };
  