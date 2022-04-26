import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanel from "./container/AdminPanel";
import Login from "./container/Login";
import Register from "./container/Register";

const App = () => {
  const title = "Admin Panel";

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<AdminPanel title={title} />} />
          <Route path="/login" element={<Login title={title} />} />
          <Route path="/signup" element={<Register title={title} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
