import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function Page({ children }) {
  const theme = useContext(ThemeContext);

  return (
    <div>
      <h3>Page component using theme: {theme.name}</h3>
      {children}
    </div>
  );
}

function Form({ children }) {
  return (
    <form>
      <legend>Form</legend>
      {children}
      <button type="submit">Submit</button>
    </form>
  );
}

function Input({ label, id, value }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={label} type="text" value={value} />
    </div>
  );
}

export default App;
