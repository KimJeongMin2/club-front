import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material';
import { clubIdState } from '../../recoil/state/clubState';
import { useRecoilState } from 'recoil';

export default function ClubDialog({ open, handleClose, clubs, handleClubSelect }) {
  const [selectedClubId, setClubIdState] = useRecoilState(clubIdState);

  console.log("clclclc", selectedClubId[0])
  const handleCheckboxChange = (clubId) => {
    if (selectedClubId.includes(clubId)) {
      setClubIdState(selectedClubId.filter((id) => id !== clubId));
    } else {
      setClubIdState([...selectedClubId, clubId]);
    }
  };

  const handleSelectClub = () => {
    handleClubSelect(selectedClubId);
    handleClose();
  };

  return (
    <Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedClubId.length > 0
            ? `Selected Club IDs: ${selectedClubId}`
            : 'Select a Club'}
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Select</TableCell>
                  <TableCell>아이디</TableCell>
                  <TableCell>동아리명</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clubs.map((club) => (
                  <TableRow key={club.clubId}>
                    <TableCell>
                      <Checkbox
                        checked={selectedClubId.includes(club.clubId)}
                        onChange={() => handleCheckboxChange(club.clubId)}
                      />
                    </TableCell>
                    <TableCell>{club.clubId}</TableCell>
                    <TableCell>{club.clubName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSelectClub}>
            선택
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
