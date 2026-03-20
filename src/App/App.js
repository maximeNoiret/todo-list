import './App.css';
import logo from './logo.svg'
import Header from '../Header/Header';
import ToDo from '../ToDo/ToDo';
//import Footer from '../Footer';

function App() {
  return (
    <div className="App">
      <Header logo={logo} />
      <ToDo />
    </div>
  );
}

export default App;
