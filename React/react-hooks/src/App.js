import logo from './logo.svg';
import './App.css';
import Header from './componentes/Header';
import { Characters } from './componentes/Characters';
import { CounterPadre } from './componentes/CounterApp/CounterPadre';

function App() {
  return (
    <div className="App">
      <CounterPadre/>
      <Header/>
      <Characters/>
    </div>
  );
}

export default App;
