import React, { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { TableContacts } from './pages/Contacts';
import { Albums } from './pages/Albums';
import { Photos } from './pages/Photos';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = useCallback(() => {
    setIsLoading((oldIsLoading) => !oldIsLoading);
  });
  return (
    <>
      {isLoading && (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          color="secondary"
        />
      )}
      <Routes>
        <Route
          path="/"
          element={<TableContacts toggleLoading={toggleLoading} />}
        />
        <Route
          path="/albums/:id"
          element={<Albums toggleLoading={toggleLoading} />}
        />
        <Route
          path="/photos/:id"
          element={<Photos toggleLoading={toggleLoading} />}
        />
      </Routes>
    </>
  );
}

export default App;
