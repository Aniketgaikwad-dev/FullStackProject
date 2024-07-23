import "./App.css";
import MainLayout from "./components/container/MainLayout";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./components/pages/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/quiz" element={<MainLayout />}></Route>
      </Routes>
    </div>
  );
}

export default App;
