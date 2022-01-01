import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Login />} />;
        <Route path="/home" exact element={<Home />} />;
        <Route path="/about" exact element={<About />} />;
      </Routes>
    </div>
  );
}

export default App;
