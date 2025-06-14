import './App.css';
import './styles/colors.css';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>YouTube V2</h1>
          <p>Testing things!</p>
        </div>
      </main>
    </div>
  );
}

export default App;
