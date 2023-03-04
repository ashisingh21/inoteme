import "./App.css";
import Home from "./Components/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainNavbar from "./Components/MainNavbar";
import NoteState from "./Contexts/notes/NoteState";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <MainNavbar></MainNavbar>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
            </Routes>
            <Routes>
              <Route exact path="/login" element={<Login />} />
            </Routes>
            <Routes>
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
