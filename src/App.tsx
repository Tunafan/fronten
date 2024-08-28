import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Events from "./routes/Events";
import Fields from "./routes/Fields";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/fields" element={<Fields />} />
      </Routes>
    </Router>
  );
};

export default App;
