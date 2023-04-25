import { Routes, Route } from "react-router-dom";
import Upload from "./components/Upload";
import Result from "./components/Result";
import Download from "./components/Download";
import { useState } from "react";


const initialData = {
  title: "",
  fullName: "",
  dob: "",
  mno: ""
};
const App = () => {
  const [prediction, setPrediction] = useState({});
  const [user, setUser] = useState(initialData);

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const clearData = () => {
    setPrediction({});
    setUser(initialData);
  }

  return (
    <Routes>
      <Route exact path="/" element={<Upload setPrediction={setPrediction} />} />
      <Route path="/result" element={<Result prediction={prediction} user={user} handleChange={handleChange} />} />
      <Route path="/download" element={<Download user={user} prediction={prediction} clearData={clearData} />} />
    </Routes>
  );
}

export default App;
