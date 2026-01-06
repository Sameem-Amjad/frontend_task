import React from 'react';
import AppRouter from '@/routes/index';
import { RouterProvider } from 'react-router-dom';
function App() {
  return (
    <div className="App font-sans text-gray-900">
      <RouterProvider router={AppRouter} />
    </div>
  );
}

export default App;