import './App.css';
import './styles/colors.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import VideoPage from './pages/VideoPage/VideoPage';
import FloatingActionButton from './components/FloatingActionButton/FloatingActionButton';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
        </Routes>
        <FloatingActionButton />
        <Toaster
          position="bottom-center"
          toastOptions={{
            className: 'youtube-toast',
            style: {
              background: 'transparent',
              boxShadow: 'none',
              padding: '0',
              border: 'none',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
