import { useState } from 'react';
import { Routes, Route ,BrowserRouter} from 'react-router-dom';
import Home from './pages/home';
import Appform from './pages/Appform';


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/applicationform" element={<Appform />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;