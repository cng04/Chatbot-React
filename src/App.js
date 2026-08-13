import './App.css';
import Chatbot from './components/Chatbot';
import Header from './components/Header';
import UploadAndSummarize from './components/UploadAndSummarize';
import DemoBanner from './components/DemoBanner';
import { isDemoMode } from './api';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  return (
    <>
    <BrowserRouter>
    {/* Header component will appear in all routes */}
      <Header />
      {/* Only renders when the build is running on fake responses */}
      <DemoBanner />
      <Routes>
        <Route path="/" element={<Chatbot/>}/>
        {/*
          Leave Upload out of Demo Mode
        */}
        {!isDemoMode() && <Route path="/upload" element={<UploadAndSummarize/>}/>}
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
      
    </BrowserRouter>
    </>
  );
}

export default App;
