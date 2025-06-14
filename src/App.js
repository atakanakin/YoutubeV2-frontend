import './App.css';
import './styles/colors.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import FloatingActionButton from './components/FloatingActionButton/FloatingActionButton';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
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
  );
}

export default App;
