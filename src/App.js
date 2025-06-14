import './App.css';
import './styles/colors.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import FloatingActionButton from './components/FloatingActionButton/FloatingActionButton';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <FloatingActionButton />
    </div>
  );
}

export default App;
