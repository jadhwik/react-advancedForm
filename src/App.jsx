import { useState } from "react";
import DataForm from "./Components/DataForm";
import DataDisplay from "./Components/dataDisplay";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  const [formData, setFormdata] = useState(null);
  console.log("form data is", formData);
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <Router>
          <Routes>
            <Route path="/" element={<DataForm setFormdata={setFormdata} />} />
            <Route
              path="/data-display"
              element={<DataDisplay formData={formData} />}
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
