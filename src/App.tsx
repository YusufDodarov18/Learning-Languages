import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Exercises from "./components/Exercises";

function App() {
  return (
    <div className="pt-10">
      <Header />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/exercises" element={<Exercises />} />
      </Routes>
    </div>
  );
}

export default App;
