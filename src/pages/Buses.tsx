import React from 'react';
import { useEffect, useState } from 'react';
import { client } from '../App';
import { BusReadRequest } from '../Profile/profile_pb';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Buses() {
  const [buses, setBuses] = useState<any>([]);
  const request = new BusReadRequest();
  useEffect(() => {
    getBuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function getBuses() {
    client.doBusListRead(request, null, (err, ress) => {
      console.log('Buses', ress.toObject());
      setBuses(ress.toObject().resultsList);
    });
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='right'>Arrival Station</TableCell>
            <TableCell align='right'>Arrival Time</TableCell>
            <TableCell align='right'>DepartureStation</TableCell>
            <TableCell align='right'>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buses.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.arrivalStation}</TableCell>
              <TableCell align='right'>{row.arrivalTime}</TableCell>
              <TableCell align='right'>{row.departureStation}</TableCell>
              <TableCell align='right'>{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Buses;
