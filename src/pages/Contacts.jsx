import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  tableCellClasses
} from '@mui/material';
import Collections from '@mui/icons-material/Collections';
import { Link } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    //     backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export const TableContacts = ({ toggleLoading }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function init() {
      toggleLoading();
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );

      if (response.ok) {
        const usersData = await response.json();
        setUsers(usersData);
      } else {
        alert('Ошибка HTTP: ' + response.status);
      }
      toggleLoading();
    }
    init();
  }, []);
  return (
    <Box>
      <h2 align="center">Users list</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ backgroundColor: '#960018' }}>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">User Name</StyledTableCell>
              <StyledTableCell align="center">Email address</StyledTableCell>
              <StyledTableCell align="center">Albums</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(({ id, name, username, email }) => (
              <StyledTableRow key={id}>
                <StyledTableCell align="center">{id}</StyledTableCell>
                <StyledTableCell align="center">{name}</StyledTableCell>
                <StyledTableCell align="center">{username}</StyledTableCell>
                <StyledTableCell align="center">{email}</StyledTableCell>
                <StyledTableCell align="center">
                  <Link to={`/albums/${id}`}>
                    <Collections sx={{ color: '#960018' }} />
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
