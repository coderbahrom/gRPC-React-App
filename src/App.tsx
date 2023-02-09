import React from 'react';
import './App.css';
import { useEffect } from 'react';
import { RhanovServiceClient } from './Profile/ProfileServiceClientPb';
import { BusReadRequest } from './Profile/profile_pb';
import { Outlet } from 'react-router-dom';

import ButtonAppBar from './components/navbar';
const request = new BusReadRequest();
export const client = new RhanovServiceClient('http://localhost:8080');

function App() {
  useEffect(() => {
    getAll();
    // console.log('Buses', client.doBusListRead);
  }, []);
  function getAll() {
    client.doBusListRead(request, null, (err, ress) => {
      console.log('Results', ress);
    });
  }
  return (
    <div className='App'>
      <ButtonAppBar />
      <Outlet />
    </div>
  );
}

export default App;
