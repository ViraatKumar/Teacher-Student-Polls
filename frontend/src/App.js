import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Student } from "./pages/student/Student";
import { Teacher } from "./pages/Teacher/Teacher";
// import { Results } from "./pages/Results/PollingResults";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Teacher />} />
        {/* <Route path="/results" element={<Results />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
