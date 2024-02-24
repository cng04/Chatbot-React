import './App.css';
import Chatbot from './components/Chatbot';
import Header from './components/Header';
import Upload from './components/Upload';

function App() {

  return (
    <>
    <Header />
    <div className="chatbot">
      {/* <Chatbot /> */}
      <Upload/>
    </div>
    </>
  );
}

export default App;
