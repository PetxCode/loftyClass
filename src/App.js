import { Header } from "./component/Header/Header";
import HomeScreen from "./component/home/HomeScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Tasked from "./component/home/Tasked";
// import Register from "./component/Register/Register";
import PrivateRoute from "./component/Register/PrivateRoute";
import ProjectHeader from "./Project1/ProjectHeader";
import Register from "./Project1/Register/Register";
import Settings from "./Project1/Register/Setting";
import Vendor from "./Project1/MainBody/Vendor";
import HomePage from "./Project1/HomePage";
function App() {
  return (
    <Router>
      <ProjectHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/vendor" element={<Vendor />} />

        {/* <PrivateRoute path="/" exact component={HomeScreen} />
        <Route path="/task" exact component={Tasked} />
        <Route path="/register" exact component={Register} /> */}
      </Routes>
    </Router>
  );
}

export default App;
