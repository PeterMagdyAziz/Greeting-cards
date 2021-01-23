import './App.css';
import MyForm from './components/Form';
import Title from './components/Title';

function App() {

  document.title = "Greeting Cards";

  return (
    <div className="App">
      <Title/>
      <MyForm/>
    </div>
  );
}

export default App;
