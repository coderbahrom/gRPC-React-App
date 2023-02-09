import React from 'react';
import { useEffect, useState } from 'react';
import { client } from '../App';
import { CustomerReadRequest } from '../Profile/profile_pb';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Customers() {
  const [customer, setCustomer] = useState<any>([]);
  const request = new CustomerReadRequest();
  useEffect(() => {
    getCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function getCustomers() {
    request.setId('1675882763313711591');
    client.doCustomerRead(request, null, (err, ress) => {
      console.log('customers', ress.toObject());
      setCustomer(ress.toObject());
    });
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>User name</TableCell>
            <TableCell align='right'>Firstnanme</TableCell>
            <TableCell align='right'>Lastname</TableCell>
            <TableCell align='right'>Address</TableCell>
            <TableCell align='right'>Phone number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component='th' scope='row'>
              {customer.username}
            </TableCell>
            <TableCell align='right'> {customer.firstName}</TableCell>
            <TableCell align='right'> {customer.lastName}</TableCell>
            <TableCell align='right'> {customer.address}</TableCell>
            <TableCell align='right'>{customer.phoneNumber}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Customers;
