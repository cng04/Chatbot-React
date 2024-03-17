import './App.css';
import Chatbot from './components/Chatbot';
import Header from './components/Header';
import Upload from './components/Upload';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';

function App() {

  return (
    <>
    <BrowserRouter>
    {/* Header component will appear in all routes */}
      <Header />
      <Routes>
        <Route path="/" element={<Chatbot/>}/>
        <Route path="/upload" element={<Upload/>}/>
      </Routes>
      
    </BrowserRouter>
    </>
  );
}

export default App;
