import React from "react";
import logo from "./logo.svg";
import "./App.css";

const reactStyles = {
  position: "relative",
  left: '20px',
  width: '60%',
  height: '60%'
};

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App" style={reactStyles}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;