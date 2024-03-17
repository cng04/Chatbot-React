import './App.css';
import Chatbot from './components/Chatbot';
import Header from './components/Header';
import UploadAndSummarize from './components/UploadAndSummarize';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';

function App() {

  return (
    <>
    <BrowserRouter>
    {/* Header component will appear in all routes */}
      <Header />
      <Routes>
        <Route path="/" element={<Chatbot/>}/>
        <Route path="/upload" element={<UploadAndSummarize/>}/>
      </Routes>
      
    </BrowserRouter>
    </>
  );
}

export default App;
